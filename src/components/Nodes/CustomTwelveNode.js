import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const DEFAULT_HANDLE_STYLE = {
  width: 20,
  height: 20,
  bottom: -12,
  border:'2px solid rgba(0, 0, 255,)'
};

const CustomTwelveNode = ({id, data, isConnectable }) => {
  const { IvrsPorts } = data;

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
      />
      <div>{data.label}</div>

      {IvrsPorts.map((isVisible, index) =>
        isVisible ? (
          <Handle
            key={`port-${index}`}
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectable}
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
        >
          <div style={{ fontSize: '10px', marginBottom: '2px', fontWeight: '600', color: '#fff' }}>no Input</div>
        </Handle>

      <Handle
        type="source"
        position={Position.Bottom}
        id="Input"
        style={{ left: 400, ...DEFAULT_HANDLE_STYLE, borderRadius: 0, width: '50px', background: "#139e13" }}
      >
        <div style={{ fontSize: '10px', marginBottom: '2px', fontWeight: '600', color: '#fff' }}>Invalid</div>
      </Handle>
    </div>
  );
};

export default CustomTwelveNode;
