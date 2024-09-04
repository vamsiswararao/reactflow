import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
const apiUrl = process.env.REACT_APP_API_URL;


const WebhookForm = ({
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  copyNode,
  node,
  flow_id,
  save
}) => {
  const [formData, setFormData] = useState({
    lml: "66c7088544596",
    app_id: node.data.app_id,
    // "5c93b0a9b0810",
    flow_id: flow_id,
    inst_id: node.id,
    nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
    url: "",
    mthod: "Get",
    prams: [{ key: "", val: "" }],
    headers: [{ key: "", val: "" }],
    json_text: "",
    des: "",
  });
  const [errors, setErrors] = useState({});



  useEffect(() => {
    const fetchAnnouncementData= async () => {
      try {
        const webResponse = await fetch(`${apiUrl}/app_get_data_whook`,
           {
           method: "POST", // Specify the POST method
          headers: {
            "Content-Type": "application/json", // Ensure the content type is JSON
          },
          body: JSON.stringify({
            lml: "66c7088544596",
            flow_id: "66c708df247df", // Use the provided flow_id
            app_id: node.data.app_id, // Use the provided app_id
            inst_id: node.id, // Use the provided inst_id
          }),
        }
        );
        const webData = await webResponse.json();
        //console.log(announcementData.resp.app_data)
        const webFinalData= webData.resp.app_data
        console.log(webFinalData)
        if (!webResponse.ok) {
          throw new Error("Failed to fetch data");
        }


        if(webData.resp.error_code==="0"){
  
        setFormData((prevData) => ({
          
           lml: "66c7088544596",
          app_id: node.data.app_id,
          flow_id: flow_id,
          inst_id: node.id,
          nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
          url: webFinalData.url,
          mthod: webFinalData.url || "Get",
          prams: webFinalData.prams || [{ key: "", val: "" }],
          headers: webFinalData.headers || [{ key: "", val: "" }],
          json_text: webFinalData.json_text,
          des: webFinalData.des,// Example of dynamic data usage
        }));

      }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    
  
    fetchAnnouncementData();
  }, [flow_id, nodeLabel, node]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "nm") {
      handleLabelChange(e); // Call the prop function to update nodeLabel in parent component
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [isToggled, setIsToggled] = useState(false);
  const [prams, setParams] = useState([{ key: "", val: "" }]);
  const [headers, setHeaders] = useState([{ key: "", val: "" }]);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleAddParam = () => {
    setParams([...prams, { key: "", val: "" }]);
    setFormData({
      ...formData,
      params: [...formData.prams, { key: "", val: "" }],
    });
  };

  const handleParamChange = (index, e) => {
    const updatedParams = [...prams];
    updatedParams[index][e.target.name] = e.target.value;
    setParams(updatedParams);
    setFormData({ ...formData, prams: updatedParams });
  };

  const handleRemoveParam = (index) => {
    const updatedParams = [...prams];
    updatedParams.splice(index, 1);
    setParams(updatedParams);
    setFormData({ ...formData, headers: updatedParams });
  };

  const handleAddHeader = () => {
    setHeaders([...headers, { key: "", val: "" }]);
    setFormData({
      ...formData,
      headers: [...formData.headers, { key: "", val: "" }],
    });
  };

  const handleHeaderChange = (index, e) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index][e.target.name] = e.target.value;
    setHeaders(updatedHeaders);
    setFormData({ ...formData, headers: updatedHeaders });
  };

  const handleRemoveHeader = (index) => {
    const updatedHeaders = [...headers];
    updatedHeaders.splice(index, 1);
    setHeaders(updatedHeaders);
    setFormData({ ...formData, headers: updatedHeaders });
  };

  const validateForm = () => {
    console.log(formData.nm)
    const newErrors = {};
    if (!formData.nm) newErrors.name = "Name is required";
    if (!formData.url)
      newErrors.url = "url  is required";
    if (!formData.mthod)
      newErrors.mthod = "Mehod is required";
    return newErrors;
  };
  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setErrors({})
     console.log(formData)
      try {
        const response = await fetch(`${apiUrl}/app_set_data_whook`, {
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

  const Params = () => (
    <div>
      <div
        style={{
          background: "#000",
          color: "#fff",
          marginRight: "30px",
          textAlign: "center",
          padding: "5px",
        }}
      >
        Params
      </div>
      <div className="params-container">
        {prams.map((param, index) => (
          <div key={index} className="params">
            <label style={{ marginRight: "5px" }}>Key :</label>
            <input
              style={{ width: "75px", marginRight: "5px" }}
              type="text"
              name="key"
              value={param.key}
              onChange={(e) => handleParamChange(index, e)}
            />
            <label style={{ marginLeft: "10px", marginRight: "5px" }}>
              Value :
            </label>
            <input
              style={{ width: "75px", marginRight: "5px" }}
              type="text"
              name="val"
              value={param.val}
              onChange={(e) => handleParamChange(index, e)}
            />
            {index === 0 ? (
              <button
                onClick={handleAddParam}
                style={{
                  background: "Green",
                  marginTop: "8px",
                  marginRight: "5px",
                  height: "25px",
                  width: "20px",
                }}
              >
                +
              </button>
            ) : (
              <button
                onClick={() => handleRemoveParam(index)}
                style={{
                  background: "Red",
                  marginTop: "8px",
                  marginRight: "5px",
                  height: "25px",
                  width: "20px",
                }}
              >
                <RxCross2 />
              </button>
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          background: "#000",
          color: "#fff",
          marginRight: "30px",
          textAlign: "center",
          padding: "5px",
        }}
      >
        Headers
      </div>
      <div className="params-container">
        {headers.map((header, index) => (
          <div key={index} className="params">
            <label style={{ marginRight: "5px" }}>Key :</label>
            <input
              style={{ width: "75px", marginRight: "5px" }}
              type="text"
              name="key"
              value={header.key}
              onChange={(e) => handleHeaderChange(index, e)}
            />
            <label style={{ marginLeft: "10px", marginRight: "5px" }}>
              Value :
            </label>
            <input
              style={{ width: "75px", marginRight: "5px" }}
              type="text"
              name="val"
              value={header.val}
              onChange={(e) => handleHeaderChange(index, e)}
            />
            {index === 0 ? (
              <button
                onClick={handleAddHeader}
                style={{
                  background: "Green",
                  marginTop: "8px",
                  marginRight: "5px",
                  height: "25px",
                  width: "20px",
                }}
              >
                +
              </button>
            ) : (
              <button
                onClick={() => handleRemoveHeader(index)}
                style={{
                  background: "Red",
                  marginTop: "8px",
                  marginRight: "5px",
                  height: "25px",
                  width: "20px",
                }}
              >
                <RxCross2 />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: "center" }}>Webhook</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <div className="form-container">
          <label>
            Name:<span className="star">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter the Name"
            value={formData.nm}
            name="nm"
            onChange={handleInputChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
          <label>
            Url:<span className="star">*</span>
          </label>
          <textarea
            placeholder="write the url"
            rows="4"
            cols="40"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
          />
          {errors.url && <p className="error">{errors.url}</p>}
          <div style={{ display: "flex", width: "200px" }}>
            <label>
              Method:<span className="star">*</span>
            </label>
          </div>
          <div className="radio">
            <input
              type="radio"
              name="mthod"
              value="Get"
              checked={formData.mthod === "Get"}
              onChange={handleInputChange}
            />
            <span>GET</span>
            <input
              type="radio"
              name="mthod"
              value="Post"
              checked={formData.mthod === "Post"}
              onChange={handleInputChange}
            />
            <span>POST</span>
            <input
              type="radio"
              name="mthod"
              value="Json"
              checked={formData.mthod === "Json"}
              onChange={handleInputChange}
            />
            <span>Json</span>
          </div>
          {errors.mthod && <p className="error">{errors.mthod}</p>}
          <div>
            {formData.mthod === "Json" && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ marginRight: "10px", marginLeft: "10px" }}>
                  key-value
                </p>
                <div className="toggle-switch" onClick={handleToggle}>
                  <div
                    className={`switch ${
                      isToggled ? "toggled" : "non-toggled"
                    }`}
                  >
                    {isToggled ? (
                      <i className="icon-on"></i> // Icon when toggled on
                    ) : (
                      <i className="icon-off"></i> // Icon when toggled off
                    )}
                  </div>
                </div>
                <p style={{ marginLeft: "10px" }}>Text</p>
              </div>
            )}

            {formData.mthod === "Json" ? (
              !isToggled ? (
                <Params />
              ) : (
                <>
                  <label>Json-text:</label>
                  <textarea
                    placeholder="write the text"
                    value="json_text"
                    onChange={handleInputChange}
                    rows="4"
                    cols="40"
                  />
                </>
              )
            ) : (
              <Params />
            )}
            <div>
              <label>Description:</label>
              <textarea
                placeholder="write the description"
                rows="4"
                cols="40"
                name="des"
                value={formData.des}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <hr className="bottom-hr" />
        <button className="save-btn" onClick={handleSave}>
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

export default WebhookForm;
