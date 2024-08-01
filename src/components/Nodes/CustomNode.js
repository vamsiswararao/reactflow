import React from 'react';
import { Handle } from 'reactflow';

// Custom node component
const CustomNode = ({ id, data, updatePortNumber, addPort, onEditPortClick }) => {
  const handleEditClick = (portIndex) => {
    onEditPortClick(id, portIndex, data.ports[portIndex]);
  };

  return (
    <div style={{ border: '1px solid black', width: '500px', padding: 10, height: 'auto', position: 'relative', display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <Handle
          type="target"
          position="top"
          id="1"
        />
        <div>{data.label} (ID: {id})</div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
          {data.ports.map((port, index) => (
            <div key={index} style={{ position: 'relative', marginRight: '10px' }}>
              <Handle
                type="source"
                position="bottom"
                id={`port-${id}-${index}`}
                style={{ background: '#555', position: 'absolute',
                  top: '20px', left: 30 + 38 * index, transform: 'translateX(-50%)' }}
              >
                <button
                  onClick={() => handleEditClick(index)}
                  style={{
                    position: 'absolute',
                    bottom: '5px',
                    left: -9
                  }}
                >
                  {port}
                </button>
              </Handle>
            </div>
          ))}
        </div>
        <button
          style={{
            position: 'absolute',
            top: '15px',
            right: 10,
            transform: 'translateY(100%)',
            borderRadius:'10px',
            background:'blue',
    border:'none',
    color:'#fff'
          }}
          onClick={() => addPort(id)}
        >
          New
        </button>
      </div>
    </div>
  );
};

export default CustomNode;
