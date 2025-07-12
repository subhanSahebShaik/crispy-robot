// /src/components/CustomNode.jsx
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import './CustomNode.css';

const CustomNode = ({ data }) => {
    return (
        <div className="custom-node" title={data.label}>
            <Handle type="target" position={Position.Left} />
            <div className="custom-label">{data.label}</div>
            <Handle type="source" position={Position.Right} />
        </div>
    );
};

export default CustomNode;
