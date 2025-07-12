import os
import json
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, 'data', 'ingestionList.json')


def read_data():
    with open(DATA_PATH, 'r') as f:
        return json.load(f)


def write_data(data):
    with open(DATA_PATH, 'w') as f:
        json.dump(data, f, indent=2)


@require_http_methods(["GET"])
def load_data(request):
    try:
        data = read_data()
        return JsonResponse(data, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def create_node(request):
    try:
        payload = json.loads(request.body)
        node_name = payload.get('name')
        node_type = payload.get('type', None)

        if not node_name:
            return JsonResponse({'error': 'Node name is required'}, status=400)

        data = read_data()
        objects = data[0].get('objects', [])

        # Check if node exists
        for obj in objects:
            if obj.get('name') == node_name:
                if node_type:
                    obj['type'] = node_type
                    write_data(data)
                    return JsonResponse({'status': 'updated', 'node': obj})
                return JsonResponse({'status': 'exists', 'node': obj})

        # Create new node
        new_node = {'name': node_name}
        if node_type:
            new_node['type'] = node_type
        objects.append(new_node)

        write_data(data)
        return JsonResponse({'status': 'created', 'node': new_node})

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


@csrf_exempt
@require_http_methods(["POST"])
def create_relation(request):
    try:
        payload = json.loads(request.body)

        from_node = payload.get('from')
        to_node = payload.get('to')
        rel_type = payload.get('type')
        action = payload.get('action')

        if not all([from_node, to_node, rel_type]):
            return JsonResponse({'error': 'Missing required fields (from, to, type)'}, status=400)

        relation = {
            'from': from_node,
            'to': to_node,
            'type': rel_type,
            'action': action or ''
        }

        data = read_data()
        data[0]['relations'].append(relation)

        write_data(data)
        return JsonResponse({'status': 'created', 'relation': relation})

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


def generate_gherkin_from_file(request):
    if request.method != 'GET':
        return HttpResponseBadRequest("Only GET method allowed")

    try:
        with open(DATA_PATH, 'r') as f:
            data = json.load(f)[0]

        nodes = data.get("objects", [])
        relations = data.get("relations", [])

        # Build graph
        graph = {}
        for rel in relations:
            graph.setdefault(rel["from"], []).append(
                (rel["to"], rel["action"]))

        MAX_DEPTH = 3

        def dfs(current_path, depth, collected_paths):
            current_node = current_path[-1][0]
            if depth >= MAX_DEPTH or current_node not in graph:
                collected_paths.append(list(current_path))
                return
            for to_node, action in graph[current_node]:
                current_path.append((to_node, action))
                dfs(current_path, depth + 1, collected_paths)
                current_path.pop()

        scenarios = []

        for start_node in graph:
            for to_node, action in graph[start_node]:
                path = [(start_node,), (to_node, action)]
                all_paths = []
                dfs(path, 1, all_paths)

                for steps in all_paths:
                    scenario_lines = [
                        f"Scenario: User interaction flow starting from {start_node.replace('_', ' ')}"]
                    scenario_lines.append(
                        f"  Given the user is on the {start_node.replace('_', ' ')}")

                    actions = []
                    expectations = []

                    for step in steps[1:]:  # skip the first context node
                        if len(step) == 2:
                            target, act = step
                            readable_target = target.replace('_', ' ')
                            if act == 'click_on':
                                actions.append(f"clicks on {readable_target}")
                            elif act == 'expects':
                                expectations.append(
                                    f"expects {readable_target}")

                    # Write When/And for actions
                    for i, act in enumerate(actions):
                        keyword = "When" if i == 0 else "And"
                        scenario_lines.append(f"  {keyword} the user {act}")

                    # Write Then/And for expectations
                    for i, expect in enumerate(expectations):
                        keyword = "Then" if i == 0 else "And"
                        scenario_lines.append(f"  {keyword} the user {expect}")

                    scenarios.append("\n".join(scenario_lines))

        return JsonResponse({"gherkin": scenarios}, safe=False)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
