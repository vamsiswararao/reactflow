import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const CustomTwoNode = ({ data }) => {
  let port1;
  let port2;

  switch (data.app_id) {
    case '88cfb29b-a325-4345-9824-6246a694e167':
      port1 = "Success";
      port2 = "Fail";
      break;
    case '9c8fed32-3d1e-4b6d-a14f-fcd499b19199':
      port1 = "Reply";
      port2 = "No Reply";
      break;
    case '335683bc-0b72-49b2-b352-b5e5cfbf406e':
      port1 = "Success";
      port2 = "Fail";
      break;
    case 'daacc396-3bd5-47f7-bff7-7a7e89c5d1a0':
      port1 = "Holiday";
      port2 = "Not Holiday";
      break;
    case 'd7972781-9077-4e8c-840d-b61468f03cf7':
      port1 = "Valid";
      port2 = "Invalid";
      break;
    case '2c5adf49-5992-46cc-8c3c-c68132fcdede':
      port1 = "Working";
      port2 = "Not Working";
      break;
    case 'fd8183dc-d520-4a45-bfc1-a15ced4f6098':
      port1 = "Success";
      port2 = "Fail";
      break;
    case "ab99faa9-ab2c-4981-8a89-be188efdf061":
        port1 = "InList";
        port2 = "NotinList";
        break;
    default:
      port1 = "";
      port2 = "";
      break;
  }

  return (
    <div
      style={{
        border: "2px solid #0000ff",
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
        // style={{ left: '65px', borderRadius: 0, height: '12px', width: '28px', border: 'none', background: "#0000ff" }}
      />
      <div>{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id={port1.toLowerCase().replace(/ /g, '')}     
        style={{ left: 30, borderRadius: 0,bottom:-6, height: '15px', width: '40px', border: 'none', background: "#139e13" }}
      >
        <div style={{ fontSize: '9px', marginBottom: '2px', color: '#fff' }}>{port1}</div>
      </Handle>
      <Handle
        type="source"
        position={Position.Bottom}
        id={port2.toLowerCase().replace(/ /g, '')}     
        style={{ left: 105, bottom:-6, borderRadius: 0, height: '15px', width: '60px', border: 'none', background: "#ff0000" }}
      >
        
        <div style={{ fontSize: '9px', marginBottom: '2px', color: '#fff' }}>{port2}</div>
      </Handle>
    </div>
  );
};

export default CustomTwoNode;
