import React from 'react';
import { Handle, Position } from 'react-flow-renderer';






const CustomThreeNode = ({ data }) => {
  let port1;
let port2;
let port3;

  switch (data.app_id) {
    case '9c8fed32-3d1e-4b6d-a14f-fcd499b19100':
      port1 = "No Agent";
      port2 = "Answer";
      port3 = "No Answer";
      break;
    case 'd41846e8-43f9-4c3e-b24a-29241e761f7d':
      port1 = "No DTMF";
      port2 = "Reply";
      port3 = "No Reply";
      break;
    
    
    default:
      port1 = "";
      port2 = "";
      port3 = "";
      break;
  }
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
        // style={{ bottom: 100,borderRadius:0,height:'15px', width:'60px',border:'none' ,background: "#0000ff"}}

      />
      <div>{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id={port1.toLowerCase().replace(/ /g, '')}     
        style={{ left: 45, borderRadius:0,height:'15px', width:'60px',border:'none' ,background: "#ccc"}}
      >
      <div style={{fontSize:'10px', fontWeight:'600', marginBottom:'2px',color:'#000'}}>{port1}</div>
      </Handle>
      <Handle
        type="source"
        position={Position.Bottom}
        id={port2.toLowerCase().replace(/ /g, '')}     
        style={{ left: 140, borderRadius:0,height:'15px', width:'60px',border:'none' ,background: "#139e13"}}
      >
      <div style={{fontSize:'10px', fontWeight:'600', marginBottom:'2px',color:'#fff'}}>{port2}</div>
      </Handle>
      <Handle
        type="source"
        position={Position.Bottom}
        id={port3.toLowerCase().replace(/ /g, '')}     
        style={{ left: 235, borderRadius:0,height:'15px', width:'60px',border:'none' ,background: "#ff0000"}}
      >
      <div style={{fontSize:'10px', fontWeight:'600', marginBottom:'2px',color:'#fff'}}>{port3}</div>
        </Handle>
    </div>
  );
};

export default CustomThreeNode;
