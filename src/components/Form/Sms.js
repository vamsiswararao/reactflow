import React, { useEffect, useMemo, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
const apiUrl = process.env.REACT_APP_API_URL;


const SmsFrom = ({ node, nodeLabel, handleLabelChange, deleteNode, removeForm, save, copyNode, flow_id }) => {
  
  const [route, setRoute] = useState("");
  const [Sender, setSender] = useState([]);

  const [SenderIdOptions, setSenderIdOptions] = useState([]);
  const [templateOptions, setTemplateOptions] = useState([]);
  const [message, setMessage] = useState("");
  

  const [formData, setFormData] = useState({
    lml: "66b9dee3ef1ca",
    app_id: node.data.app_id,
    // "5c93b0a9b0810",
    flow_id: flow_id,
    inst_id: node.id,
    nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
    sender_id:'',
    send_to:'',
    msg:'',
    des: "",
  });
  //const [SenderIdOptions, setSenderIdOptions] = useState([]);
  const [SenderToOptions, setSenderToOptions] = useState([]);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    const fetchAnnouncementData= async () => {
      try {
        const announcementResponse = await fetch(`${apiUrl}/app_get_data_sms`,
           {
           method: "POST", // Specify the PUT method
          headers: {
            "Content-Type": "application/json", // Ensure the content type is JSON
          },
          body: JSON.stringify({
            lml: "66b9dee3ef1ca",
            flow_id: "66c708df247df", // Use the provided flow_id
            app_id: node.data.app_id, // Use the provided app_id
            inst_id: node.id, // Use the provided inst_id
          }),
        }
        );
        const announcementData = await announcementResponse.json();
        //console.log(announcementData.resp.app_data)
        const annData= announcementData.resp.app_data
        if (!announcementResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        console.log(annData)
  
        setFormData((prevData) => ({
          
           lml: "66b9dee3ef1ca",
          app_id: node.data.app_id,
          flow_id: flow_id,
          inst_id: node.id,
          nm: nodeLabel || "",
          route:annData.route_uniq,
          sender_id: annData.sendid,
          send_to: annData.send_to,
          template: annData.template_uniq,          
          msg: annData.Messages, 
          des: annData.des,
        }));

                // Fetch audio options with the same data
                const senderIdResponse = await fetch(`${apiUrl}/app_get_routes_sms`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    lml:"66b9dee3ef1ca",
                    flow_id: flow_id,
                    app_id: node.data.app_id,
                    inst_id: node.id,
                  }),
                });
        
                if (!senderIdResponse.ok) {
                  throw new Error("Failed to fetch audio options");
                }
        
                const finalIdData = await senderIdResponse.json();
                setSenderIdOptions(finalIdData.resp.aud_data || []);
                console.log(finalIdData.resp);
                const senderToResponse = await fetch(`${apiUrl}/app_get_mobiles_sms`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    lml:"66b9dee3ef1ca",
                    flow_id: flow_id,
                    app_id: node.data.app_id,
                    inst_id: node.id,
                  }),
                });
        
                if (!senderToResponse.ok) {
                  throw new Error("Failed to fetch audio options");
                }
        
                const finalToData = await senderToResponse.json();
                setSenderToOptions(finalToData.resp.aud_data || []);
                console.log(finalToData.resp);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    
  
    fetchAnnouncementData();
    fetchSender(formData.route)
  }, [flow_id, nodeLabel, node]);
  

  const maxLength = 160;

  const credits = useMemo(() => Math.ceil(message.length / maxLength), [message.length]);

  const getMessageType = () => {
    // Define your logic for message type
    if (message.length > 100) return 'Urgent';
    return 'Normal';
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nm) newErrors.nodeLabel = "Name is required";
    if (!formData.sender_id) newErrors.selectedValue = "Sender ID is required";
    if (!formData.send_to) newErrors.toValue = "TO selection is required";
    if (!formData.msg) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setErrors({})
      try {
        const response = await fetch(`${apiUrl}/app_set_data_sms`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error("Failed to save data");
        }

        console.log("Form Data Saved:", formData);
        save(nodeLabel); // Call the save handler from props
      } catch (error) {
        console.error("Error saving data:", error);
      }
    } else {
      setErrors(formErrors);
    }
  };



  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    switch (name) {
        case "nm":
            handleLabelChange(e);
            break;
        case "route":
            await fetchSender(value);
            break;
        case "sender_id":
            await fetchTemplates(value);
            break;
        case "template":
            await fetchTemplateDetails(value);
            break;
        case "msg":
              setMessage(value);
            break;
        default:
            break;
    }

    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};

const fetchSender = async(value) => {
  //setRoute(e.target.value);
  console.log(value)
  const senderIdResponse = await fetch(`${apiUrl}/app_get_sids_sms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lml:"66b9dee3ef1ca",
      flow_id: flow_id,
      app_id: node.data.app_id,
      inst_id: node.id,
      route:value,
    }),
  });

  if (!senderIdResponse.ok) {
    throw new Error("Failed to fetch audio options");
  }

  const finalIdData = await senderIdResponse.json();
  setSenderIdOptions(finalIdData.resp.aud_data || []);
  setRoute(value)
  console.log(finalIdData)  
};

const fetchTemplates = async (sendToValue) => {
  console.log(sendToValue)
    try {
        const response = await fetch(`${apiUrl}/app_get_templates_sms`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                lml: "66b9dee3ef1ca",
                flow_id: flow_id,
                app_id: node.data.app_id,
                inst_id: node.id,
                route: route,
                sendid: sendToValue,
            }),
        });

        if (!response.ok) throw new Error("Failed to fetch templates");

        const data = await response.json();
        setTemplateOptions(data.resp.aud_data || []); 
        console.log(data)       
    } catch (error) {
        console.error("Error fetching templates:", error);
    }
};

const fetchTemplateDetails = async (templateValue) => {
      const item = templateOptions.find((element) => element.tid === templateValue);
      console.log(item)
      setFormData((prevData) => ({
        ...prevData,
        msg: item.tmptxt,
    }));

};
  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: "center" }}>Sms</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <div className="form-container">
          <label>Name :<span className="star">*</span></label>
          <input
            type="text"
            placeholder="Enter the Name"
            value={nodeLabel}
            onChange={handleInputChange}
          />
          {errors.nodeLabel && <p className="error">{errors.nodeLabel}</p>}
            <label style={{ width: "85px", fontSize: '16px' }}>Route :<span className="star">*</span></label>
            <select
                className="input-select"
                name="route"
                value={formData.route}
                onChange={handleInputChange}
              >
                <option value="">Select...</option>
                {SenderIdOptions.map((sender, index) => (
                  <option key={index} value={sender.runi}>
                    {sender.rtnm}
                  </option>
                ))}
              </select>
            {errors.selectedValue && <p className="error">{errors.selectedValue}</p>}
            <label style={{ marginLeft: "5px", fontSize: '16px' }}>
              Sender Id:<span className="star">*</span>
            </label>
            <select
                className="input-select"
                name="sender_id"
                value={formData.sender_id}
                onChange={handleInputChange}
              >
                <option value="">Select...</option>
                {SenderIdOptions.map((to, index) => (
                  <option key={index} value={to.sdunq}>
                    {to.sidnm}
                  </option>
                ))}
              </select>
            {errors.toValue && <p className="error">{errors.toValue}</p>}
            <label style={{ width: "85px", fontSize: '16px' }}>Templates :<span className="star">*</span></label>
            <select
                className="input-select"
                name="template"
                value={formData.template}
                onChange={handleInputChange}
              >
                <option value="">Select...</option>
                {templateOptions.map((sender, index) => (
                  <option key={index} value={sender.tid}>
                    {sender.tnm}
                  </option>
                ))}
              </select>
            {errors.selectedValue && <p className="error">{errors.selectedValue}</p>}
            <label style={{ marginLeft: "5px", fontSize: '16px' }}>
              TO:<span className="star">*</span>
            </label>
            <select
                className="input-select"
                name="send_to"
                value={formData.send_to}
                onChange={handleInputChange}
              >
                <option value="">Select...</option>
                {SenderToOptions.map((to, index) => (
                  <option key={index} value={to.uni}>
                    {to.nm}
                  </option>
                ))}
              </select>
            {errors.toValue && <p className="error">{errors.toValue}</p>}
          <label style={{ marginTop: '10px' }}>Message :<span className="star">*</span></label>
          <textarea
            placeholder="Enter the message"
            rows="6"
            cols="40"
            name="msg"
            value={formData.msg}
            onChange={handleInputChange}
            maxLength={maxLength * 10}
          />
          {errors.message && <p className="error">{errors.message}</p>}
          <div style={{ display: 'flex' }}>
            <p>MsgType: {getMessageType()}</p>
            <p>Length: {message.length}</p>
            <p>Credits: {credits}</p>
            <p>Characters Left: {maxLength * credits - message.length}</p>
          </div>
          <label>Description :</label>
          <textarea
            placeholder="Enter the description"
            rows="6"
            cols="40"
            value={formData.des}
            onChange={handleInputChange}
          />
        </div>
        <hr className="bottom-hr" />
        <button onClick={handleSave} className="save-btn">Save</button>
        <button onClick={copyNode} className="copy-btn"><FaCopy style={{ height: '20px', width: '20px' }} /></button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: "20px", width: "20px" }} />
        </button>
      </div>
    </div>
  );
};

export default SmsFrom;
