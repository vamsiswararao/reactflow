import React, { useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';

const CustomNode = ({ data, onPortSelect }) => {
  const [ports, setPorts] = useState([{ id: 0, number: 0 }]); // Start with one port

  const addPort = () => {
    if (ports.length < 10) {
      const newPortId = ports.length;
      setPorts((prevPorts) => [...prevPorts, { id: newPortId, number: newPortId }]);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        padding: '10px',
        background: '#fff',
        width: '400px',
        textAlign: 'center',
        border: '2px solid #00ff00',
        borderRadius: '5px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ flex: 1 }}>
        <Handle type="target" position={Position.Top} id="target" />
        <div>{data.label}</div>
        {/* Static Handles */}
          <Handle
            type="source"
            position={Position.Bottom}
            id="invalid"
            style={{ left: 15,bottom:-15, background: '#ff0000',}}
          >
          <span
            style={{
              position: 'absolute',
              width: '30px',
              height: '12px',
              left: -10,
              bottom:6,
              background: 'rgba(255, 0, 0)',
              color: '#fff',
              fontSize: '9px'
            }}
          >
            invalid
          </span>
        </Handle>

          <Handle
            type="source"
            position={Position.Bottom}
            id="noInput"
            style={{ left: 60, bottom: -14, background: '#00ff00',  }}
          >
          <span
            style={{
              position: 'absolute',
              width: '45px',
              left: -18,
              bottom: 5,
              background: 'rgba(0, 255, 0)',
              color: '#fff',
              fontSize: '9px'
            }}
          >
            Noinput
          </span>
        </Handle>

        {/* Dynamic Ports */}
        {ports.map((port, index) => (
            <Handle
            key={port.id}
              type="source"
              position={Position.Bottom}
              id={`source-${port.id}`}
              style={{ left: 100 + 30 * index, bottom: -16, background: '#00ff00', }}
            >
            <span
              style={{
                zIndex: '9',
                width: '20px',
                left: 90 + 30 * index,
                bottom: -20,
                background: 'rgba(0, 255, 0, 0.5)',
                color: '#fff',
                fontSize: '9px'
              }}
            >
              
                {port.number}
            </span>
          </Handle>
        ))}

        <div
          style={{
            position: 'absolute',
            right: 5,
            bottom: -10,
            width: '42px',
            border: '1px dotted red',
            borderRadius: '20px',
            height: '20px',
            background: '#fff'
          }}
        >
          <button
            onClick={addPort}
            style={{
              position: 'absolute',
              right: 2,
              top: 1,
              background: 'red',
              border: 'none',
              borderRadius: '10px',
              color: '#fff'
            }}
          >
            New
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomNode;
