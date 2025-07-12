// /src/components/CustomEdge.jsx
import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getSimpleBezierPath } from '@xyflow/react';

const CustomEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    data,
    label,
}) => {
    const [edgePath, labelX, labelY] = getSimpleBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    const isChange = data?.type === 'changes';
    console.log(data);

    return (
        <>
            <BaseEdge
                path={edgePath}
                markerEnd={{
                    type: 'arrowclosed',
                    color: isChange ? '#FFA500' : '#0099FF',
                }}
                style={{
                    stroke: isChange ? '#FFA500' : '#0099FF',
                    strokeWidth: 2,
                    strokeDasharray: isChange ? '6 4' : '0',
                }}
            />
            {!isChange && label && (
                <EdgeLabelRenderer>
                    <div
                        style={{
                            position: 'absolute',
                            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                            fontSize: 12,
                            background: '#101010',
                            color: '#C0FFE0',
                            padding: '4px 6px',
                            borderRadius: 4,
                            boxShadow: '0 0 2px #00BFFF',
                            fontFamily: 'Space Mono',
                            pointerEvents: 'none',
                        }}
                    >
                        {label}
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
};

export default CustomEdge;
