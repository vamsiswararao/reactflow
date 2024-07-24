import React, { useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';

const CustomNode = ({ data }) => {
  const [ports, setPorts] = useState([0]); // Start with one port

  const addPort = () => {
    setPorts(prevPorts => [...prevPorts, prevPorts.length]);
  };

  return (
    <div
      style={{
        padding: "10px",
        background: "#fff",
        width: "200px",
        textAlign: "center",
        border: "2px solid #00ff00",
        borderRadius: "5px",
        position: 'relative'
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        id="a"
      />
      <div>{data.label}</div>

      {ports.map(index => (
        <div key={index} style={{ position: 'relative', display: 'inline-block', marginBottom: '5px' }}>
          <Handle
            type="source"
            position={Position.Bottom}
            id={`port-${index}`}
            style={{ left: 10 + 30 * index, bottom:-35, background: "#00ff00" }}
          />
          <span
            style={{
              position: 'absolute',
              left: 1* index,
              bottom: -30,
              background: 'rgba(0, 255, 0, 0.5)',
              padding: '2px 5px',
              color: '#fff',
              fontSize: '12px'
            }}
          >
            {index}
          </span>
        </div>
      ))}
      <button
        onClick={addPort}
        style={{ position: 'absolute', right: 0, background: 'red', border: '1px dotted red', borderRadius: '10px', color: '#fff' }}
      >
        New
      </button>
    </div>
  );
};

export default CustomNode;
