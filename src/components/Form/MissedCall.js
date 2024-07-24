import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";



const MissedCall = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  copyNode
}) => {
  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{textAlign:'center'}}>Missed Call</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <div className="form-container">
          <label>Name:<span className="star">*</span></label>
          <input type="text" placeholder="Enter the name" value={nodeLabel}
            onChange={handleLabelChange}/>
        </div>
        <hr className="bottom-hr" />
        <button className="save-btn">Save</button>
        <button onClick={copyNode} className="copy-btn"><FaCopy style={{height:'20px',width:'20px'}} /></button>
        <button onClick={deleteNode} className="delete-btn"><RiDeleteBin6Line style={{height:'20px', width:'20px'}} />
            </button>
      </div>
    </div>
  );
};

export default MissedCall;
