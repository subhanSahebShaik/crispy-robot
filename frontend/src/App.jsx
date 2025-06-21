import React, { useState } from 'react';
import Header from './components/Header';
import NodeForm from './components/NodeForm';
import RelationForm from './components/RelationForm';
import AssertionForm from './components/AssertionForm';

import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Box } from '@mui/material';
import theme from './theme';

function App() {
  const [formType, setFormType] = useState(null);
  const [nodes, setNodes] = useState([]);

  const handleSaveNode = (data) => {
    const newNode = {
      id: `${Date.now()}`,
      data: { label: `${data.name} (${data.type})` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((prev) => [...prev, newNode]);
    setFormType(null);
  };

  const renderForm = () => {
    switch (formType) {
      case 'node':
        return <NodeForm onSave={handleSaveNode} onClose={() => setFormType(null)} />;
      case 'relation':
        return <RelationForm onSave={(data) => console.log(data)} onClose={() => setFormType(null)} />;
      case 'assertion':
        return <AssertionForm onSave={(data) => console.log(data)} onClose={() => setFormType(null)} />;
      default:
        return null;
    }
  };

  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];
  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onSelect={setFormType} />

      <Box sx={{ display: 'flex', flex: 1, height: '100%' }}>
        <div style={{ width: '100%', height: '100%' }}>
          <ReactFlow
            nodes={initialNodes}
            edges={initialEdges}
          >
            <Controls />
            <Background bgColor={theme.palette.background.paper} />
          </ReactFlow>
        </div>

        {/* Right Side Panel */}
        {formType && (
          <Box
            sx={{
              width: '20%',
              height: '100%',
              backgroundColor: '#fff',
              borderLeft: '1px solid #ccc',
              boxShadow: '-4px 0 12px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              transform: 'translateX(0)',
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            {renderForm()}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default App;
