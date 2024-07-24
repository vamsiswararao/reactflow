import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const DEFAULT_HANDLE_STYLE = {
  width: 20,
  height: 20,
  bottom: -12,
  border:'2px solid rgba(0, 0, 255,)'

};

const CustomTwelveNode = ({ data, visiblePorts,handlePortClick }) => {
 

  return (
    <div
      style={{
        border: "2px solid #0000ff",
        padding: "30px",
        borderRadius: "5px",
        background: "#fff",
        width: "380px",
        textAlign: "center",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        // style={{ borderRadius: 0, right: '10px', top: -12, height: '18px', width: '80px', background: "#0000ff" }}
      />
      <div>{data.label}</div>

      {visiblePorts.map((isVisible, index) =>
        isVisible ? (
          <Handle
            key={index}
            type="source"
            position={Position.Bottom}
            id={`port-${index}`}
            style={{ left: 15 + 30 * index, ...DEFAULT_HANDLE_STYLE, borderRadius: 0, background: "#139e13" }}
          >
            <div style={{ fontSize: '12px', marginBottom: '2px', fontWeight: '800', color: '#fff' }}>{index}</div>
          </Handle>
        ) : null
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        id="NoInput"
        style={{ left: 30 + 38 * 8, ...DEFAULT_HANDLE_STYLE, borderRadius: 0, width: '50px', background: "#ff0000" }}
        // onClick={() => handlePortClick("NoInput")}
      >
        <div style={{ fontSize: '10px', marginBottom: '2px', fontWeight: '600', color: '#fff' }}>no Input</div>
      </Handle>

      <Handle
        type="source"
        position={Position.Bottom}
        id="Input"
        style={{ left: 400, ...DEFAULT_HANDLE_STYLE, borderRadius: 0, width: '50px', background: "#139e13" }}
        // onClick={() => handlePortClick("Invalid")}
      >
        <div style={{ fontSize: '10px', marginBottom: '2px', fontWeight: '600', color: '#fff' }}>Invalid</div>
      </Handle>

      
    </div>
  );
};



export default CustomTwelveNode;
