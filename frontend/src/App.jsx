// /src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import RightPanel from './components/RightPanel';

import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Box } from '@mui/material';
import { getLayoutedElements } from './utils/layout';
import {
  fetchIngestionData,
  createNode,
  createRelation,
  fetchGherkinOutput,
} from './api/api';
import CustomNode from './components/CustomNode';
import CustomEdge from './components/CustomEdge';

function App() {
  const [rightPanelType, setRightPanelType] = useState(null);
  const [gherkinOutput, setGherkinOutput] = useState([]);

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [ingestionData, setIngestionData] = useState({ objects: [], relations: [] });

  const handleSaveNode = async (nodeData) => {
    try {
      await createNode(nodeData);

      const updatedObjects = [...ingestionData.objects, nodeData.name];
      const updatedData = { ...ingestionData, objects: updatedObjects };
      setIngestionData(updatedData);

      const newNode = {
        id: `node-${updatedObjects.length - 1}`,
        type: 'customNode',
        data: {
          label: nodeData.name,
          nodeType: nodeData.type || 'None',
        },
        position: { x: 0, y: 0 },
        sourcePosition: 'right',
        targetPosition: 'left',
      };

      const newNodes = [...nodes, newNode];
      const { nodes: layoutedNodes, edges: layoutedEdges } = await getLayoutedElements(newNodes, edges, 'LR');

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    } catch (err) {
      console.error('Error saving node:', err);
    }
  };

  const handleSaveRelation = async (relationData) => {
    try {
      await createRelation(relationData);

      const updatedRelations = [...ingestionData.relations, relationData];
      const updatedData = { ...ingestionData, relations: updatedRelations };
      setIngestionData(updatedData);

      const nodeMap = {};
      updatedData.objects.forEach((name, index) => {
        nodeMap[name] = `node-${index}`;
      });

      const newEdge = {
        id: `relation-${edges.length}`,
        source: nodeMap[relationData.from],
        target: nodeMap[relationData.to],
        label: relationData.type === 'holds' ? relationData.action : '',
        style:
          relationData.type === 'changes'
            ? { stroke: '#FF5555', strokeDasharray: '6 3', strokeWidth: 2 }
            : undefined,
        data: {
          type: relationData.type,
          action: relationData.action,
        },
      };

      const { nodes: layoutedNodes, edges: layoutedEdges } = await getLayoutedElements(
        nodes,
        [...edges, newEdge],
        'LR'
      );

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    } catch (err) {
      console.error('Error saving relation:', err);
    }
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const handleGherkinView = () => {
    fetchGherkinOutput()
      .then((response) => {
        setGherkinOutput(response.data.gherkin || []);
        setRightPanelType('gherkin');
      })
      .catch((err) => {
        console.error('Failed to fetch Gherkin', err);
      });
  };

  useEffect(() => {
    const fetchAndLayout = async () => {
      try {
        const response = await fetchIngestionData();
        const data = response.data[0];
        setIngestionData(data);

        const generateNodes = data.objects.map((obj, index) => ({
          id: `node-${index}`,
          type: 'customNode',
          data: { label: obj.name },
          position: { x: 0, y: 0 },
          sourcePosition: 'left',
          targetPosition: 'right',
        }));

        const nodeMap = {};
        data.objects.forEach((node, index) => {
          nodeMap[node.name] = `node-${index}`;
        });

        const generateEdges = data.relations.map((rel, index) => ({
          id: `relation-${index}`,
          source: nodeMap[rel.from],
          target: nodeMap[rel.to],
          label: `${rel.action} - ${rel.hypothesis}`,
          data: { type: rel.type, action: rel.action },
        }));

        const { nodes: layoutedNodes, edges: layoutedEdges } = await getLayoutedElements(
          generateNodes,
          generateEdges,
          'LR'
        );

        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
      } catch (err) {
        console.error('Failed to load data', err);
      }
    };

    fetchAndLayout();
  }, []);

  const handlePanelOpen = (type) => {
    setRightPanelType(type);
  };

  const handlePanelClose = () => {
    setRightPanelType(null);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onSelect={handlePanelOpen} onGherkinView={handleGherkinView} />

      <Box sx={{ display: 'flex', flex: 1, height: 'calc(100vh - 10%)' }}>
        <div style={{ width: '100%', height: '100%' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            nodeTypes={{ customNode: CustomNode }}
            edgeTypes={{ custom: CustomEdge }}
            fitView
          // defaultEdgeOptions={{ type: 'custom' }}
          >
            <Controls
              style={{
                borderRadius: '8px',
                color: '#000',
                padding: 4,
              }}
              showInteractive={false}
            />
            <Background variant="lines" gap={16} size={1} color="#222" />
          </ReactFlow>
        </div>

        {rightPanelType && (
          <RightPanel
            type={rightPanelType}
            onClose={handlePanelClose}
            onSave={
              rightPanelType === 'node'
                ? handleSaveNode
                : rightPanelType === 'relation'
                  ? handleSaveRelation
                  : null
            }
            availableNodes={ingestionData.objects}
            gherkinData={gherkinOutput}
          />
        )}
      </Box>
    </Box>
  );
}

export default App;
