import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const WebhookForm = ({
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  copyNode,
}) => {
  const [isToggled, setIsToggled] = useState(false);
  const [params, setParams] = useState([{ key: "", value: "" }]);
  const [headers, setHeaders] = useState([{ key: "", value: "" }]);
  const [selectedMethod, setSelectedMethod] = useState("Get");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleAddParam = () => {
    setParams([...params, { key: "", value: "" }]);
  };

  const handleParamChange = (index, e) => {
    const updatedParams = [...params];
    updatedParams[index][e.target.name] = e.target.value;
    setParams(updatedParams);
  };

  const handleRemoveParam = (index) => {
    const updatedParams = [...params];
    updatedParams.splice(index, 1);
    setParams(updatedParams);
  };

  const handleAddHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const handleHeaderChange = (index, e) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index][e.target.name] = e.target.value;
    setHeaders(updatedHeaders);
  };

  const handleRemoveHeader = (index) => {
    const updatedHeaders = [...headers];
    updatedHeaders.splice(index, 1);
    setHeaders(updatedHeaders);
  };

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  const handleSave = () => {
    const formData = {
      nodeLabel,
      url,
      selectedMethod,
      params,
      headers,
      description,
    };
    console.log(formData);
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
        {params.map((param, index) => (
          <div key={index} className="params">
            <label style={{ marginRight: '5px' }}>Key :</label>
            <input
              style={{ width: '75px', marginRight: '5px' }}
              type="text"
              name="key"
              value={param.key}
              onChange={(e) => handleParamChange(index, e)}
            />
            <label style={{ marginLeft: '10px', marginRight: '5px' }}>Value :</label>
            <input
              style={{ width: '75px', marginRight: '5px' }}
              type="text"
              name="value"
              value={param.value}
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
                  width: '20px'
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
                  width: '20px'
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
            <label style={{ marginRight: '5px' }}>Key :</label>
            <input
              style={{ width: '75px', marginRight: '5px' }}
              type="text"
              name="key"
              value={header.key}
              onChange={(e) => handleHeaderChange(index, e)}
            />
            <label style={{ marginLeft: '10px', marginRight: '5px' }}>Value :</label>
            <input
              style={{ width: '75px', marginRight: '5px' }}
              type="text"
              name="value"
              value={header.value}
              onChange={(e) => handleHeaderChange(index, e)}
            />
            {index === 0 ? (
              <button
                onClick={handleAddHeader}
                style={{
                  background: "Green",
                  marginTop: "8px",
                  marginRight: "5px",
                  height: '25px',
                  width: '20px'
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
                  width: '20px'
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
            value={nodeLabel}
            onChange={handleLabelChange}
          />
          <label>
            Url:<span className="star">*</span>
          </label>
          <textarea
            placeholder="write the url"
            rows="4"
            cols="40"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div style={{ display: "flex", width: "200px" }}>
            <label>
              Method:<span className="star">*</span>
            </label>
          </div>
          <div className="radio">
            <input
              type="radio"
              name="method"
              value="Get"
              checked={selectedMethod === "Get"}
              onChange={handleMethodChange}
            />
            <span>GET</span>
            <input
              type="radio"
              name="method"
              value="Post"
              checked={selectedMethod === "Post"}
              onChange={handleMethodChange}
            />
            <span>POST</span>
            <input
              type="radio"
              name="method"
              value="Json"
              checked={selectedMethod === "Json"}
              onChange={handleMethodChange}
            />
            <span>Json</span>
          </div>
          <div>
            {selectedMethod === "Json" && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ marginRight: "10px", marginLeft: "10px" }}>key-value</p>
                <div className="toggle-switch" onClick={handleToggle}>
                  <div className={`switch ${isToggled ? "toggled" : "non-toggled"}`}>
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

            {selectedMethod === "Json" ? (
              !isToggled ? (
                <Params />
              ) : (
                <>
                  <label>Json-text:</label>
                  <textarea placeholder="write the text" rows="4" cols="40" />
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
