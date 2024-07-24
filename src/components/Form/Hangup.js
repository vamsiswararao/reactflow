import { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { CiCircleRemove } from 'react-icons/ci';
import { FaCopy } from "react-icons/fa";


const HangUp = ({
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode
}) => {
  const [remarks, setRemarks] = useState('');

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation


    // Clear form errors if validation passes
    const formData = {
      nodeLabel,
      remarks,
    };

    console.log('Form data:', formData);
    save()
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: 'center' }}>HungUp</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: '30px', width: '30px' }} />
        </button>
        <hr />
        <form className="form-container" onSubmit={handleSubmit}>
          <label>
            Name:<span className="star">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter the Name"
            value={nodeLabel}
            onChange={handleLabelChange}
          />

          <label>Remarks:</label>
          <textarea
            placeholder="Enter the remarks"
            rows="6"
            cols="40"
            value={remarks}
            onChange={handleRemarksChange}
          />
        

          <hr className="bottom-hr" />
          <button type="submit" className="save-btn">
            Save
          </button>
        </form>
        <button onClick={copyNode} className="copy-btn"><FaCopy style={{height:'20px',width:'20px'}} /></button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: '20px', width: '20px' }} />
        </button>
      </div>
    </div>
  );
};

export default HangUp;
