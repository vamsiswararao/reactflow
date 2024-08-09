import React, { useState, useCallback, useMemo, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  MiniMap,
  Controls,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { useParams } from 'react-router-dom';

import { FaRegListAlt, FaSlack } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import { RiLockPasswordLine, RiStickyNoteAddFill } from "react-icons/ri";
import { FaTelegram , FaRepeat} from "react-icons/fa6";
import { MdOutlineSms, MdOutlineMailOutline } from "react-icons/md";
import { BsMicrosoftTeams } from "react-icons/bs";
import { CgVoicemailR } from "react-icons/cg";
import { SiZapier, SiGooglehangouts, SiBit } from "react-icons/si";
import { IoExtensionPuzzleSharp } from "react-icons/io5";
import { RxLapTimer } from "react-icons/rx";
import { HiPhoneMissedCall } from "react-icons/hi";
import { LiaDesktopSolid } from "react-icons/lia";
import { ImPhoneHangUp } from "react-icons/im";
import { MdPhoneMissed, MdHolidayVillage } from "react-icons/md";
import { TiTicket, TiSortNumericallyOutline } from "react-icons/ti";
import { FcCollect } from "react-icons/fc";
import { BiTransfer } from "react-icons/bi";



import CustomTwoNode from "./components/Nodes/CustomTwoNode";
import CustomThreeNode from "./components/Nodes/CustomThreeNode";
import CustomFourNode from "./components/Nodes/CustomFourNode";
import CustomNode from "./components/Nodes/CustomNode";
import CustomTwelveNode from "./components/Nodes/CustomTwelveNode";
import CustomEdge from "./components/CustomEdge";
import Announcement from "./components/Form/Announcement";
import CollectorFrom from "./components/Form/Collector";
import BitrixForm from "./components/Form/Bitrix";
import ConnectorFrom from "./components/Form/Connector";
import DynamicConnectorForm from "./components/Form/DynamicConnector";
import EmailFrom from "./components/Form/Email";
import ExtensionFrom from "./components/Form/Extension";
import FreshDeskFrom from "./components/Form/FreshDesk";
import FlowTransferForm from "./components/Form/FlowTransfer";
import HangUp from "./components/Form/Hangup";
import HangOut from "./components/Form/Hangout";
import Holiday from "./components/Form/Holidays";
import Ivrs from "./components/Form/Ivrs";
import ListManagers from "./components/Form/ListManager";
import MicrosoftTeam from "./components/Form/MicrosoftTeam";
import MissedCalls from "./components/Form/MissedCall";
import MissedCallCallerTunes from "./components/Form/MissedCallCallertune";
import OsTickets from "./components/Form/OsTicket";
import Passwords from "./components/Form/Password";
import SmsFrom from "./components/Form/Sms";
import SlackForm from "./components/Form/Slack";
import StickyAgentForm from "./components/Form/StickyAgent";
import TelegramForm from "./components/Form/Telegram";
import TimingsFrom from "./components/Form/Timings";
import VoicemailForm from "./components/Form/Voicemail";
import ZapierForm from "./components/Form/Zapier";
import WhoCallingFrom from "./components/Form/WhosCalling";
import WebhookForm from "./components/Form/Webhook";
import RepeatedCallForm from "./components/Form/RepeatedCallFrom";

const initialNodes = [];
const initialEdges = [];

const fixedNodeIds = {
  Announcement: "90712abd-697e-4841-832c-31229526dfa0",
  Bitrix: "07e1aad7-29d9-448d-abd2-2dc5703fbad2",
  Collectors: "88cfb29b-a325-4345-9824-6246a694e167",
  Connector: "9c8fed32-3d1e-4b6d-a14f-fcd499b19199",
  DynamicConnector: "9c8fed32-3d1e-4b6d-a14f-fcd499b19100",
  Email: "9aea22f7-a11e-400e-a935-eb814a1e9aa5",
  Extension: "335683bc-0b72-49b2-b352-b5e5cfbf406e",
  FreshDesk: "378f553e-f776-4827-b64a-81f8a7179fed",
  FlowTransfer: "b2fac29a-34ac-4370-a177-5e38f627e080",
  Hangout: "ff700fce-b1c3-444d-9570-ad68774431f3",
  Hangup: "01330d73-c93e-4098-8e2c-b436ec66f172",
  Holidays: "daacc396-3bd5-47f7-bff7-7a7e89c5d1a0",
  IVRS: "59fa7eec-edcf-49c4-9d3b-c883cdef3e43",
  ListManager: "13486de8-262c-4020-bfd8-75d8fff896da",
  MicrosoftTeam: "b72a2cee-ea03-4d48-a0e0-1ab59275ea27",
  MissedCall: "a770bcf5-8da2-4674-9a27-7a7b1f1bfe2b",
  MissedCallCallertune: "3c551d3b-1828-4097-a3bc-f276bd9e6302",
  OSTicket: "5fb3dff1-1a98-4cc0-bc73-982924b90ee7",
  Password: "d7972781-9077-4e8c-840d-b61468f03cf7",
  RepeatedCall: "ccfa929d-75cc-4103-bebd-0a2e2f68ffc7",
  SMS: "59f004f6-a2a9-4496-9985-575d6ac4867e",
  Slack: "32fed744-61dc-4052-a04d-0ef1cbe84044",
  StickyAgent: "d41846e8-43f9-4c3e-b24a-29241e761f7d",
  Telegram: "a6199b6a-5079-4e72-8592-ac9b144ea19e",
  Timings: "2c5adf49-5992-46cc-8c3c-c68132fcdede",
  VoiceMail: "089ea10d-a3bf-4dec-b345-c3f738f5b623",
  Webhook: "fd8183dc-d520-4a45-bfc1-a15ced4f6098",
  WhosCalling: "ab99faa9-ab2c-4981-8a89-be188efdf061",
  Zapier: "593b207e-5e3d-49ff-abad-4f79c15f3df1",
};

const apiUrl = process.env.REACT_APP_API_URL;


const FlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [descriptions, setDescriptions] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  //const [name, setName] = useState(null);

  const [nodeLabel, setNodeLabel] = useState("");
  const [nodeCounters, setNodeCounters] = useState({});
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const flow_id="66addcaec9beb"
  
  useEffect(() => {
    const fetchFlowData = async () => {
      try {
        const response = await fetch(`${apiUrl}/flow_data_get_data?flow_id=${flow_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer YOUR_API_TOKEN' // If your API requires authorization
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        //const data={"flow_data":{"id":"faf18cb1-f101-4234-82eb-5e3bec904a1a","flow_name":'ReactFlow',"flows":{"nodes":[{"id":"8379ebac-0492-451a-9260-85e03c919dd1","type":"default","data":{"label":"Announcement","app_id":"90712abd-697e-4841-832c-31229526dfa0","IvrsPorts":[true,true,true,true,true,true,true,true,true,true]},"position":{"x":211,"y":22},"width":150,"height":38,"selected":false,"positionAbsolute":{"x":211,"y":22},"dragging":false},{"id":"5bd82aa5-19ce-477d-a14b-b336b67c64a0","type":"twoCustom","data":{"label":"Collector","app_id":"88cfb29b-a325-4345-9824-6246a694e167","IvrsPorts":[true,true,true,true,true,true,true,true,true,true]},"position":{"x":100,"y":100},"width":143,"height":45},{"id":"3683c782-e229-4123-8a99-4d8ee9b6f530","type":"twoCustom","data":{"label":"Extension","app_id":"335683bc-0b72-49b2-b352-b5e5cfbf406e","IvrsPorts":[true,true,true,true,true,true,true,true,true,true]},"position":{"x":346,"y":108},"width":143,"height":45,"selected":true,"positionAbsolute":{"x":346,"y":108},"dragging":false}],"edges":[{"source":"8379ebac-0492-451a-9260-85e03c919dd1","sourceHandle":null,"target":"5bd82aa5-19ce-477d-a14b-b336b67c64a0","targetHandle":null,"type":"customEdge","id":"reactflow__edge-8379ebac-0492-451a-9260-85e03c919dd1-5bd82aa5-19ce-477d-a14b-b336b67c64a0"},{"source":"8379ebac-0492-451a-9260-85e03c919dd1","sourceHandle":null,"target":"3683c782-e229-4123-8a99-4d8ee9b6f530","targetHandle":null,"type":"customEdge","id":"reactflow__edge-8379ebac-0492-451a-9260-85e03c919dd1-3683c782-e229-4123-8a99-4d8ee9b6f530"}]}}}        
        //console.log('Flow data retrieved successfully:', data.resp.flow_data);
        //console.log('Flow data retrieved successfully:', data.resp.flow_data.id);

        // Update state with the retrieved flow data
        setNodes(data.resp.flow_data.flows.nodes || []);
        setEdges(data.resp.flow_data.flows.edges || []);
        //setName(data.flow_data.flow_name)
        const nodeLength=(data.resp.flow_data.flows.nodes.length)
        if(nodeLength>0){
        const position= (data.resp.flow_data.flows.nodes[nodeLength-1].position)
        setPosition({ x: position.x+50 || 50, y: position.y+100 || 50 })
        }
      } catch (error) {
        console.error('Failed to retrieve flow data:', error);
      }
    };

    // Call fetchFlowData when flowId changes or on component mount
    fetchFlowData();

  }, [setNodes,setEdges]); // useEffect dependency on setNodes and setEdges



  //node change new position values for nodes 
  const handleNodeChange = (changes) => {
    changes.forEach((change) => {
      if (change.type === "position" && change.position) {
        const { position } = change;
        setPosition((pos) => ({ x: position.x, y: position.y + 100 }));
      }
    });
  };


  // initialize the edges type 
  const edgeTypes = useMemo(
    () => ({
      customEdge: (props) => <CustomEdge onEdgeClick={edgeClick} {...props} />,
    }),
    []
  );


    // initialize the nodes type 
  const nodeTypes = useMemo(
    () => ({
      twoCustom: CustomTwoNode,
      threeCustom: CustomThreeNode,
      fourCustom: CustomFourNode,
      fiveCustom: CustomNode,
      twelveCustom: (props) => (
        <CustomTwelveNode  {...props} />
      ),
    }),
    []
  );


// create a custom node 
  const createNode = (type, name, app_id, style) => {
    const count = nodeCounters[name] || 0;
    const number = count > 8 ? count + 1 : `0${count + 1}`;
    const newLabel = count === 0 ? name : `${name}_${number}`;
    
    const newNode = {
      id: uuidv4(),
      type: type,
      data: { label: newLabel, app_id , IvrsPorts:Array(10).fill(true)},
      position: { x: position.x, y: position.y },
      style: style,

    };
    setNodes((nds) => nds.concat(newNode));
    setNodeCounters((prevCounter) => ({
      ...prevCounter,
      [name]: count + 1,
    }));
    setPosition((pos) => ({ x: pos.x + 100, y: pos.y + 100 }));
    addDescription(`Added ${app_id}`);
  };

  const announcement = () =>
    createNode("default", "Announcement", fixedNodeIds.Announcement);
  const Bitrix = () => createNode("default", "Bitrix", fixedNodeIds.Bitrix);
  const Collector = () =>
    createNode("twoCustom", "Collector", fixedNodeIds.Collectors);
  const Connector = () =>
    createNode("twoCustom", "Connector", fixedNodeIds.Connector);
  const DynamicConnector = () =>
    createNode("threeCustom", "Dynamic Connector", fixedNodeIds.DynamicConnector);
  const Email = () => createNode("default", "Email", fixedNodeIds.Email);
  const Extension = () =>
    createNode("twoCustom", "Extension", fixedNodeIds.Extension);
  const FreshDesk = () =>
    createNode("default", "FreshDesk", fixedNodeIds.FreshDesk);
  const FlowTransfer = () => createNode("default", "FlowTransfer", fixedNodeIds.FlowTransfer);
  const Hangout = () => createNode("default", "HangOut", fixedNodeIds.Hangout);
  const Hangup = () => createNode("output", "HangUp", fixedNodeIds.Hangup);
  const Holidays = () =>
    createNode("twoCustom", "Holidays", fixedNodeIds.Holidays);
  const Ivr = () => createNode("twelveCustom", "IVRS", fixedNodeIds.IVRS);
  const ListManager = () =>
    createNode("default", "ListManager", fixedNodeIds.ListManager);
  const Microsoft = () =>
    createNode("default", "Microsoft Team", fixedNodeIds.MicrosoftTeam);
  const MissedCall = () =>
    createNode("default", "Missed Call", fixedNodeIds.MissedCall);
  const MissedCallCallerTune = () =>
    createNode(
      "default",
      "Missed Call Callertune",
      fixedNodeIds.MissedCallCallertune
    );
  const OsTicket = () =>
    createNode("default", "OS Ticket", fixedNodeIds.OSTicket);
  const Password = () =>
    createNode("twoCustom", "Password", fixedNodeIds.Password);
  const RepeatedCall = () =>
    createNode("twoCustom", "Repeated Call", fixedNodeIds.RepeatedCall);
  const Sms = () => createNode("default", "SMS", fixedNodeIds.Sms);
  const Slacks = () => createNode("default", "Slack", fixedNodeIds.Slack);
  const StickyAgent = () =>
    createNode("threeCustom", "Sticky Agent", fixedNodeIds.StickyAgent);
  const Telegram = () =>
    createNode("default", "Telegram", fixedNodeIds.Telegram);
  const Timings = () =>
    createNode("twoCustom", "Timings", fixedNodeIds.Timings);
  const VoiceMail = () =>
    createNode("default", "Voice Mail", fixedNodeIds.VoiceMail);
  const Webhook = () =>
    createNode("twoCustom", "Webhook", fixedNodeIds.Webhook);
  const WhosCalling = () =>
    createNode("twoCustom", "Who`s Calling", fixedNodeIds.WhosCalling);
  const Zapier = () => createNode("default", "Zapier", fixedNodeIds.Zapier);
  //const Zapier= () => createNode("fiveCustom", "Zapier",fixedNodeIds.Zapier);

  const edgeClick = (id) => {
    alert(`remove ${id}`);
    setEdges((eds) => eds.filter((edge) => edge.id !== id));
    addDescription(`Removed edge from ${id}`);
  };


// nodes and edges are connected to each other 
  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge({ ...params, type: "customEdge" }, eds));
      addDescription(`Added edge from ${params.source} to ${params.target}`);
    },
    [setEdges]
  );

  
//remove nodes and edges from the flow data 
  const removeNode = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            edge.source !== selectedNode.id && edge.target !== selectedNode.id
        )
      );
      // if(fixedNodeIds.IVRS){
      //   setVisiblePorts(Array(10).fill(false))
      // }
      // const label=selectedNode.data.label;
      // const name=label.replace(/[@\d]/g, "");
      //  const count= nodeCounters[name] || 0;
      // if(count>0){
      //   setNodeCounters((prevCounter)=>({
      //     ...prevCounter,
      //     [name]:count-1,
      //   }))
      // }
      addDescription(`Removed node ${selectedNode.id}`);

      setPosition((pos) => ({ x: pos.x - 50, y: pos.y - 50 }));
      setSelectedNode("");
    }
  };

  const addDescription = (description) => {
    setDescriptions((des) => des.concat(description));
  };

  // select the node
  const handleNodeClick = (event, node) => {
    setSelectedNode(node);
    setNodeLabel(node.data.label);
  };


  // change the selected node label 
  const handleLabelChange = (event) => {
    if (selectedNode) {
      setNodeLabel(event.target.value);
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, label: event.target.value } }
            : node
        )
      );
      //addDescription(
      // `Updated label for node ${selectedNode.id} to "${nodeLabel}"`
      // );
    }
    // else {
    //   addDescription(`Failed to update label: Empty label`);
    // }
  };

  // const updateNodeLabel = () => {
  //   if (selectedNode && nodeLabel.trim() !== "") {
  //     setNodes((nds) =>
  //       nds.map((node) =>
  //         node.id === selectedNode.id
  //           ? { ...node, data: { ...node.data, label: nodeLabel } }
  //           : node
  //       )
  //     );
  //     setSelectedNode(null);
  //     addDescription(
  //       `Updated label for node ${selectedNode.id} to "${nodeLabel}"`
  //     );
  //   } else {
  //     addDescription(`Failed to update label: Empty label`);
  //   }
  // };

  // const PublishFlow=()=>{
  //   const flow={
  //     nodes,
  //     edges,
  //   }
  //   localStorage.setItem("flow", JSON.stringify(flow));
  //   addDescription("Saved flow state");
  // }

  //remove the selected node  
  const removeForm = () => {
    setSelectedNode("");
  };

  //save the node data to the flow  
  const save = (data) => {
    setSelectedNode("");
    toast(`${data} data saved.`);
  };

  // save the flow data to the flow
  const publishFlow = async () => {
    const flowData = {
     flow_data: {id:"66addcaec9beb",
      flows: {
        nodes,
        edges,
      }}
    };
    try {
      // Replace the URL with your actual API endpoint
      const response = await fetch(`${apiUrl}/flow_data_update`, {
        method: 'POST', // Use 'PUT' or 'PATCH' if you're updating an existing flow
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_TOKEN' // If your API requires authorization
        },
        body: JSON.stringify(flowData)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Flow saved successfully:', data,flowData);
      toast(`Flow data saved.`)
      addDescription("Saved flow state");
    } catch (error) {
      console.error('Failed to save flow:', error);
      addDescription("Failed to save flow state");
    }
  };
  

  // const restoreFlow = () => {
  //   const flow = JSON.parse(localStorage.getItem("flow"));
  //   if (flow) {
  //     setNodes(flow.nodes || []);
  //     setEdges(flow.edges || []);
  //     addDescription("Restored flow state");
  //     console.log(flow.visiblePorts);
  //   } else {
  //     setNodes([]);
  //     setEdges([]);
  //     addDescription("No saved flow state found");
  //   }
  // };


  //code nodes form 
  const copyNode = () => {
    if (!selectedNode) return;
    const app_id = selectedNode.data.app_id;
    const selectLabel = selectedNode.data.label.replace(/[_\d]/g, "");
    const count = nodeCounters[selectLabel] || 0;
    const number = count > 8 ? count + 1 : `0${count + 1}`;
    const newLabel =
      count === 0 ? selectedNode.data.label : `${selectLabel}_${number}`;
    const newNode = {
      ...selectedNode,
      id: uuidv4(),
      data: { label: newLabel, app_id,IvrsPorts:Array(10).fill(true) },
      position: {
        x: position.x + 100,
        y: position.y + 100,
      },
    };

    setNodes((nds) => nds.concat(newNode));
    setNodeCounters((prevCounter) => ({
      ...prevCounter,
      [selectLabel]: count + 1,
    }));
    setSelectedNode(newNode);
    setPosition((pos) => ({ x: pos.x + 100, y: pos.y + 100 }));
    setNodeLabel(newNode.data.label);
  };


  //forms 
  const renderForm = () => {
    if (selectedNode) {
      const formProps = {
        node: selectedNode,
        nodeLabel: nodeLabel,
        handleLabelChange: handleLabelChange,
        // updateNodeLabel: updateNodeLabel,
        deleteNode: removeNode,
        removeForm: removeForm,
        save: save,
        copyNode: copyNode,
        flow_id:flow_id

      };
      switch (selectedNode.data.app_id) {
        case fixedNodeIds.Announcement:
          return <Announcement {...formProps} />;
        case fixedNodeIds.Bitrix:
          return <BitrixForm {...formProps} />;
        case fixedNodeIds.Collectors:
          return <CollectorFrom {...formProps} />;
        case fixedNodeIds.Connector:
          return <ConnectorFrom {...formProps} />;
        case fixedNodeIds.DynamicConnector:
          return <DynamicConnectorForm {...formProps} />;
        case fixedNodeIds.Email:
          return <EmailFrom {...formProps} />;
        case fixedNodeIds.Extension:
          return <ExtensionFrom {...formProps} />;
        case fixedNodeIds.FreshDesk:
          return <FreshDeskFrom {...formProps} />;
        case fixedNodeIds.FlowTransfer:
            return <FlowTransferForm {...formProps} />;
        case fixedNodeIds.Hangout:
          return <HangOut {...formProps} />;
        case fixedNodeIds.Hangup:
          return <HangUp {...formProps} />;
        case fixedNodeIds.Holidays:
          return <Holiday {...formProps} />;

        case fixedNodeIds.IVRS:
          return (
            <Ivrs
              {...formProps}
              handleCheckboxChange={handleCheckboxChange}
              saveNodeData={saveNodeData}
            />
          );
        case fixedNodeIds.ListManager:
          return <ListManagers {...formProps} />;
        case fixedNodeIds.MicrosoftTeam:
          return <MicrosoftTeam {...formProps} />;
        case fixedNodeIds.MissedCall:
          return <MissedCalls {...formProps} />;
        case fixedNodeIds.MissedCallCallertune:
          return <MissedCallCallerTunes {...formProps} />;
        case fixedNodeIds.OSTicket:
          return <OsTickets {...formProps} />;
        case fixedNodeIds.Password:
          return <Passwords {...formProps} />;
        case fixedNodeIds.RepeatedCall:
          return <RepeatedCallForm {...formProps} />;
        case fixedNodeIds.Sms:
          return <SmsFrom {...formProps} />;
        case fixedNodeIds.Slack:
          return <SlackForm {...formProps} />;
        case fixedNodeIds.StickyAgent:
          return <StickyAgentForm {...formProps} />;
        case fixedNodeIds.Telegram:
          return <TelegramForm {...formProps} />;
        case fixedNodeIds.Timings:
          return <TimingsFrom {...formProps} />;
        case fixedNodeIds.VoiceMail:
          return <VoicemailForm {...formProps} />;
        case fixedNodeIds.Zapier:
          return <ZapierForm {...formProps} />;
        case fixedNodeIds.WhosCalling:
          return <WhoCallingFrom {...formProps} />;
        case fixedNodeIds.Webhook:
          return <WebhookForm {...formProps} />;
        default:
          return null;
      }
    }
    return (
      <div
        style={{
          width: "350x",
          height: "100%",
          background: "#ddd",
        }}
      >
        <div className="description-button-wrapper">
          <button>Nodes</button>
          <div className="description-lists">
            <h3>Nodes</h3>
            <ul>
              {nodes.map((node) => (
                <li key={node.id}>
                  {node.id}: {node.data.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="description-button-wrapper">
          <button>Edges</button>
          <div className="description-lists">
            <h3>Edges</h3>
            <ul>
              {edges.map((edge) => (
                <li key={edge.id}>
                  {edge.id}: {edge.source} - {edge.target}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="btn-container">
          <button onClick={announcement}>
            <span>
              <GrAnnounce />
            </span>
            Announcement
          </button>
          <button onClick={Bitrix}>
            <span>
              <SiBit />
            </span>
            Bitrix
          </button>
          <button onClick={Collector}>
            <span>
              <FcCollect />
            </span>
            Collector
          </button>
          <button onClick={Connector}>
            <img
              src="https://static.thenounproject.com/png/67422-200.png"
              alt="connector"
              style={{ height: "20px", width: "20px", marginRight: "12px" }}
            />
            Connector
          </button>
          <button onClick={DynamicConnector}>
            <img
              src="https://static.thenounproject.com/png/67422-200.png"
              alt="connector"
              style={{ height: "20px", width: "20px", marginRight: "12px" }}
            />
            Dynamic Connector
          </button>
          <button onClick={Email}>
            <span>
              <MdOutlineMailOutline />
            </span>
            Email
          </button>
          <button onClick={Extension}>
            <span>
              <IoExtensionPuzzleSharp />
            </span>
            Extension
          </button>
          <button onClick={FlowTransfer}>
            <span>
            <BiTransfer />
            </span>
            Flow Transfer
          </button>
          <button onClick={FreshDesk}>
            <span>
              <LiaDesktopSolid />
            </span>
            Fresh Desk
          </button>
          <button onClick={Hangout}>
            <span>
              <SiGooglehangouts />
            </span>
            Hangout
          </button>
          <button onClick={Hangup}>
            <span>
              <ImPhoneHangUp />
            </span>
            Hangup
          </button>
          <button onClick={Holidays}>
            <span>
              <MdHolidayVillage />
            </span>
            Holidays
          </button>
          <button onClick={Ivr}>
            <img
              src="https://th.bing.com/th/id/OIP.JACaNwp98_DCDsktQ86ZJAHaHa?w=512&h=512&rs=1&pid=ImgDetMain"
              alt="connector"
              style={{ height: "15px", width: "15px", marginRight: "18px" }}
            />
            IVRS
          </button>
          <button onClick={ListManager}>
            <span>
              <FaRegListAlt />
            </span>
            List Manager
          </button>
          <button onClick={Microsoft}>
            <span>
              <BsMicrosoftTeams />
            </span>
            Microsoft Team
          </button>
          <button onClick={MissedCall}>
            <span>
              <MdPhoneMissed />
            </span>
            Missed Call
          </button>
          <button onClick={MissedCallCallerTune}>
            <span>
              <HiPhoneMissedCall />
            </span>
            Missed Call Caller tune
          </button>
          <button onClick={OsTicket}>
            <span>
              <TiTicket />
            </span>
            Os Ticket
          </button>
          <button onClick={Password}>
            <span>
              <RiLockPasswordLine />
            </span>
            Password
          </button>
          <button onClick={RepeatedCall}>
            <span>
            <FaRepeat />
            </span>
            Repeated call
          </button>
          <button onClick={Sms}>
            <span>
              <MdOutlineSms />
            </span>
            SMS
          </button>
          <button onClick={Slacks}>
            <span>
              <FaSlack />
            </span>
            Slack
          </button>
          <button onClick={StickyAgent}>
            <span>
              <RiStickyNoteAddFill />
            </span>
            Sticky Agent
          </button>
          <button onClick={Telegram}>
            <span>
              <FaTelegram />
            </span>
            Telegram
          </button>
          <button onClick={Timings}>
            <span>
              <RxLapTimer />
            </span>
            Timings
          </button>
          <button onClick={VoiceMail}>
            <span>
              <CgVoicemailR />
            </span>
            Voice Mail
          </button>
          <button onClick={Webhook}>
            <span>
              <SiZapier />
            </span>
            Webhook
          </button>
          <button onClick={WhosCalling}>
            <span>
              <TiSortNumericallyOutline />
            </span>
            Who's Calling
          </button>
          <button onClick={Zapier}>
            <span>
              <SiZapier />
            </span>
            Zapier
          </button>
        </div>
      </div>
    );
  };

  const saveNodeData = (nodeData) => {
    console.log(nodeData);
  };



// Ivrs checkboxes
  const handleCheckboxChange = (update) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode?.id
          ? {
              ...node,
              data: {
                ...node.data,
                IvrsPorts: update
              },
            }
          : node
      )
    );
  };

  return (
    <div style={{height:'100%'}}>
    {/* {name ?( */}
      <div style={{ height: "100vh", width: "100%", display: "flex" }}>
      <ReactFlowProvider>
        <div className="left-container">
          <div className="header-btn">
            <h3 style={{marginRight:'150px',marginBottom:'25px',marginLeft:'10px'}}>Name</h3>
            <div className="description-button-wrapper">
              <button className="flow-btn">
                <span className="num">
                  {descriptions.length !== 0 ? descriptions.length : ""}
                </span>
                Changes to Flow
              </button>
              <div className="description-lists">
                <h3>Descriptions</h3>
                <ul>
                  {descriptions.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>
            </div>
            {/* <button onClick={saveFlow} className="publish-btn">
              Save
            </button>
            <button onClick={restoreFlow} className="publish-btn">
              Restore
            </button> */}
            <button onClick={publishFlow} className="publish-btn">Publish</button>
          </div>
          <ReactFlow
            style={{ flex: 1 }}
            nodes={nodes}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodesChange={(changes) => {
              handleNodeChange(changes);
              onNodesChange(changes);
            }}
            onNodeClick={handleNodeClick}
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        <div style={{height:'100%', width: "30%", paddingRight: "20px" }}>{renderForm()}</div>
      </ReactFlowProvider>
      <ToastContainer />
      </div>
     {/* ):(<div style={{display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center'}}>invalid id</div>)} */}
    </div>
  );
};

export default FlowChart;