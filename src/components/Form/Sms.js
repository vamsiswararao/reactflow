import React, { useEffect, useMemo, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
const apiUrl = process.env.REACT_APP_API_URL;

const SmsFrom = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode,
  flow_id,
  lml
}) => {
  const [SenderIdOptions, setSenderIdOptions] = useState([]);
  const [templateOptions, setTemplateOptions] = useState([]);

  const [formData, setFormData] = useState({
    lml: "66b9dee3ef1ca",
    app_id: node.data.app_id,
    // "5c93b0a9b0810",
    flow_id: flow_id,
    inst_id: node.id,
    nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
    route: "",
    sender_id: "",
    template: "",
    send_to: "",
    unicode: false,
    msg: "",
    des: "",
  });
  const [routeOptions, setRouteOptions] = useState([]);
  const [toOptions, setToOptions] = useState([]);

  //const [SenderToOptions, setSenderToOptions] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        // Fetch audio options with the same data
        const routeResponse = await fetch(`${apiUrl}/app_get_routes_sms`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lml: "66c7088544596",
            flow_id: flow_id,
            app_id: node.data.app_id,
            inst_id: node.id,
          }),
        });

        if (!routeResponse.ok) {
          throw new Error("Failed to fetch audio options");
        }

        const finalIdData = await routeResponse.json();
        setRouteOptions(finalIdData.resp.aud_data || []);
        console.log(finalIdData.resp);
      } catch (error) {
        console.error("Error fetching options for select 1:", error);
      }
    };

    fetchRoute();
  }, [flow_id, node]);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        // Fetch audio options with the same data
        const routeResponse = await fetch(`${apiUrl}/app_get_mobiles_sms`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lml: lml,
            flow_id: flow_id,
            app_id: node.data.app_id,
            inst_id: node.id,
          }),
        });

        if (!routeResponse.ok) {
          throw new Error("Failed to fetch audio options");
        }

        const finalIdData = await routeResponse.json();
        setToOptions(finalIdData.resp.aud_data || []);
        console.log(finalIdData);
      } catch (error) {
        console.error("Error fetching options for select 1:", error);
      }
    };

    fetchRoute();
  }, [flow_id, node,lml]);

  useEffect(() => {
    const fetchAnnouncementData = async () => {
      try {
        const smsGetResponse = await fetch(`${apiUrl}/app_get_data_sms`, {
          method: "POST", // Specify the PUT method
          headers: {
            "Content-Type": "application/json", // Ensure the content type is JSON
          },
          body: JSON.stringify({
            lml: "66c7088544596",
            flow_id: "66c708df247df", // Use the provided flow_id
            app_id: node.data.app_id, // Use the provided app_id
            inst_id: node.id, // Use the provided inst_id
          }),
        });
        const smsGetData = await smsGetResponse.json();
        //console.log(announcementData.resp.app_data)
        const smsData = smsGetData.resp.app_data;
        if (!smsGetResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        console.log(smsData);
        if(smsGetData.resp.error_code==="0"){
        setFormData((prevData) => ({
          lml: "66b9dee3ef1ca",
          app_id: node.data.app_id,
          flow_id: flow_id,
          inst_id: node.id,
          nm: nodeLabel || "",
          route: smsData.route_uniq,
          sender_id: smsData.sendid,
          send_to: smsData.to,
          template: smsData.template_uniq,
          msg: smsData.Messages,
          des: smsData.des,
          unicode:smsData.unicode || false,

        }));
      }

        // const senderToResponse = await fetch(`${apiUrl}/app_get_mobiles_sms`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     lml: "66b9dee3ef1ca",
        //     flow_id: flow_id,
        //     app_id: node.data.app_id,
        //     inst_id: node.id,
        //   }),
        // });

        // if (!senderToResponse.ok) {
        //   throw new Error("Failed to fetch audio options");
        // }

        // const finalToData = await senderToResponse.json();
        // setSenderIdOptions(finalToData.resp.aud_data || []);
        // console.log(finalToData.resp);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAnnouncementData();
  }, [flow_id, nodeLabel, node]);

  useEffect(() => {
    if (formData.route) {
      const fetchSenderId = async () => {
        try {
          const senderIdResponse = await fetch(`${apiUrl}/app_get_sids_sms`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lml: "66c7088544596",
              flow_id: flow_id,
              app_id: node.data.app_id,
              inst_id: node.id,
              route: formData.route,
            }),
          });

          if (!senderIdResponse.ok) {
            throw new Error("Failed to fetch audio options");
          }

          const finalIdData = await senderIdResponse.json();
          setSenderIdOptions(finalIdData.resp.aud_data || []);
          // setRoute(value);
          console.log(finalIdData);
        } catch (error) {
          console.error("Error fetching options for select 2:", error);
        }
      };

      fetchSenderId();
    } else {
      //setOptions2([]);
      //setFormData((prevData) => ({ ...prevData, select2: '', select3: '' }));
      //setOptions3([]);
    }
  }, [formData.route, flow_id, node]);

  useEffect(() => {
    if (formData.sender_id) {
      const fetchTemplates = async () => {
        try {
          const response = await fetch(`${apiUrl}/app_get_templates_sms`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              lml: "66c7088544596",
              flow_id: flow_id,
              app_id: node.data.app_id,
              inst_id: node.id,
              route: formData.route,
              sendid: formData.sender_id,
            }),
          });

          if (!response.ok) throw new Error("Failed to fetch templates");
          console.log({
            lml: "66c7088544596",
            flow_id: flow_id,
            app_id: node.data.app_id,
            inst_id: node.id,
            route: formData.route,
            sendid: formData.sender_id,
          });
          const data = await response.json();
          setTemplateOptions(data.resp.aud_data || []);
          console.log(data);
        } catch (error) {
          console.error("Error fetching options for select 3:", error);
        }
      };

      fetchTemplates();
    } else {
      //setOptions3([]);
      //setFormData((prevData) => ({ ...prevData, select3: '' }));
    }
  }, [formData, flow_id, node]);

  const memoizedTemplateMessage = useMemo(() => {
    if (formData.template) {
      const item = templateOptions.find(
        (element) => element.tempid === formData.template
      );
      return item ? item.tmptxt : "";
    }
    return "";
  }, [formData.template, templateOptions]);

  // Update formData with memoizedTemplateMessage
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      msg: memoizedTemplateMessage,
    }));
  }, [memoizedTemplateMessage]);

  const maxLength = 160;

  const credits = useMemo(
    () => Math.ceil((formData.msg || "").length / maxLength),
    [formData]
  );

  const getMessageType = () => {
    // Define your logic for message type
    if ((formData.msg || "") > 100) return "Urgent";
    return "Normal";
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
      setErrors({});
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
    const { name, value, type, checked } = e.target;
    console.log(name, value,checked);
    if (name === "nm") {
      handleLabelChange(e); // Call the prop function to update nodeLabel in parent component
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked: value,
    }));
  };
console.log(formData.unicode)
  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: "center" }}>Sms</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <div className="form-container">
          <label>
            Name :<span className="star">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter the Name"
            value={nodeLabel}
            onChange={handleInputChange}
          />
          {errors.nodeLabel && <p className="error">{errors.nodeLabel}</p>}
          <label style={{ width: "85px", fontSize: "16px" }}>
            Route :<span className="star">*</span>
          </label>
          <select
            className="input-select"
            name="route"
            value={formData.route}
            onChange={handleInputChange}
          >
            <option value="">Select...</option>
            {routeOptions.map((sender, index) => (
              <option key={index} value={sender.runi}>
                {sender.rtnm}
              </option>
            ))}
          </select>
          {errors.selectedValue && (
            <p className="error">{errors.selectedValue}</p>
          )}
          <label style={{ marginLeft: "5px", fontSize: "16px" }}>
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
          <label style={{ width: "85px", fontSize: "16px" }}>
            Templates :<span className="star">*</span>
          </label>
          <select
            className="input-select"
            name="template"
            value={formData.template}
            onChange={handleInputChange}
          >
            <option value="">Select...</option>
            {templateOptions.map((sender, index) => (
              <option key={index} value={sender.tempid}>
                {sender.tnm}
              </option>
            ))}
          </select>
          {errors.selectedValue && (
            <p className="error">{errors.selectedValue}</p>
          )}
          <label style={{ marginLeft: "5px", fontSize: "16px" }}>
            TO:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            name="send_to"
            value={formData.send_to}
            onChange={handleInputChange}
          >
            <option value="">Select...</option>
            <option value="123">Caller</option>
            <option value="1234">agent Answered</option>
            <option value="12345">No Answered Agent</option>
            <option value="123456">All No Answered Agent</option>
            {toOptions.map((to, index) => (
              <option key={index} value={to.uni}>
                {to.nm}-{to.mob}
              </option>
            ))}
   
          </select>
          {errors.toValue && <p className="error">{errors.toValue}</p>}
          <div style={{display:"flex",alignItems:'center'}}>
            <p>unicode:</p>
            <input type="checkbox" name="unicode"  checked={formData.unicode} onChange={handleInputChange} />
          </div>
          <label style={{ marginTop: "10px" }}>
            Message :<span className="star">*</span>
          </label>
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
          <div style={{ display: "flex" }}>
            <p>MsgType: {getMessageType()}</p>
            <p>Length: {(formData.msg || "").length}</p>
            <p>Credits: {credits}</p>
            <p>
              Characters Left:
              {maxLength * credits - (formData.msg?.length || 0)}
            </p>
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
        <button onClick={handleSave} className="save-btn">
          Save
        </button>
        <button onClick={copyNode} className="copy-btn">
          <FaCopy style={{ height: "20px", width: "20px" }} />
        </button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: "20px", width: "20px" }} />
        </button>
      </div>
    </div>
  );
};

export default SmsFrom;
