import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";


const MicrosoftTeam = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,save,
  copyNode,
  flow_id
}) => {
  const [formData, setFormData] = useState({
    app_id:node.data.app_id ,
    // "5c93b0a9b0810",
    flow_id: flow_id,
    inst_id:node.id,
    name: nodeLabel || '',
    url: "",
    message: ""
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };



  const handleSave = () => {
    if (    !formData.name.trim()|| !formData.url.trim() || !formData.message.trim()
    ) {
      alert("Please fill in all fields.");
      return
    }
    console.log("Form Data:", formData);
    save(nodeLabel)
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: 'center' }}>Microsoft Team</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <div className="form-container">
          <label>Name:<span className="star">*</span></label>
          <input
            type="text"
            name="name"
            placeholder="Enter the Name"
            value={nodeLabel}
            onChange={handleLabelChange}
          />

          <label>Url:<span className="star">*</span></label>
          <textarea
            name="url"
            placeholder="write the url"
            rows="4"
            cols="40"
            value={formData.url}
            onChange={handleChange}
          />

          <label>Message:<span className="star">*</span></label>
          <textarea
            name="message"
            placeholder="write the message"
            rows="4"
            cols="40"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <hr className="bottom-hr" />
        <button onClick={handleSave} className="save-btn">Save</button>
        <button onClick={copyNode} className="copy-btn"><FaCopy style={{height:'20px',width:'20px'}} /></button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: '20px', width: '20px' }} />
        </button>
      </div>
    </div>
  );
};

export default MicrosoftTeam;
