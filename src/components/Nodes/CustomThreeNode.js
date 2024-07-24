import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const CustomThreeNode = ({ data }) => {
  return (
    <div
      style={{
        border: "2px solid #888",
        padding: "20px",
        borderRadius: "5px",
        background: "#fff",
        width: "230px",
        textAlign: "center",
      }}
    >
       <Handle
        type="target"
        position={Position.Top}
        id="a"
        // style={{ bottom: 100,borderRadius:0,height:'15px', width:'60px',border:'none' ,background: "#0000ff"}}

      />
      <div>{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ left: 45, borderRadius:0,height:'15px', width:'60px',border:'none' ,background: "#ccc"}}
      >
      <div style={{fontSize:'10px', fontWeight:'600', marginBottom:'2px',color:'#000'}}>No DTMF</div>
      </Handle>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{ left: 140, borderRadius:0,height:'15px', width:'60px',border:'none' ,background: "#139e13"}}
      >
      <div style={{fontSize:'10px', fontWeight:'600', marginBottom:'2px',color:'#fff'}}>Reply</div>
      </Handle>
      <Handle
        type="source"
        position={Position.Bottom}
        id="c"
        style={{ left: 235, borderRadius:0,height:'15px', width:'60px',border:'none' ,background: "#ff0000"}}
      >
      <div style={{fontSize:'10px', fontWeight:'600', marginBottom:'2px',color:'#fff'}}>No Reply</div>
        </Handle>
    </div>
  );
};

export default CustomThreeNode;
