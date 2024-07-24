import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const CustomFourNode = ({ data }) => {
  return (
    <div
      style={{
        border: "2px solid #00ff00",
        padding: "10px",
        borderRadius: "5px",
        background: "#fff",
        width: "120px",
        textAlign: "center",
      }}
    >
       <Handle
        type="target"
        position={Position.Top}
        id="a"
      />
      <div>{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ left: 10 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{ left: 50 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="c"
        style={{ left: 90 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="d"
        style={{ left: 130 }}
      />
    </div>
  );
};

export default CustomFourNode;
