import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

import { useState } from "react";
import "./Listmanager.css";

const ListManagers = ({
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  copyNode,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const handlePlusClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: "center" }}>ListManager</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <form className="form-container">
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
            List:<span className="star">*</span>
          </label>
          <div style={{ display: "flex" }}>
            <select className="input-select">
              <option>Select... </option>
              {[...Array(10)]
                .map((_, i) => i + 1)
                .map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
            </select>
            <button
              style={{
                background: "green",
                marginLeft: "5px",
                marginTop: "5px",
              }}
              onClick={handlePlusClick}
            >
              +
            </button>
          </div>
          <select className="input-select" id="listManager">
            <option value="add">add</option>
            <option value="delete">Delete</option>
          </select>

        </form>
        <hr className="bottom-hr" />
        <button className="save-btn">Save</button>
        <button onClick={copyNode} className="copy-btn">
          <FaCopy style={{ height: "20px", width: "20px" }} />
        </button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: "20px", width: "20px" }} />
        </button>
      </div>
      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <h3>Add New List Item</h3>
            <form>
              <label>name:<span className="star">*</span></label>
              <input type="text" placeholder="Enter new name" />
              <label>Description:</label>
              <textarea
                type="text"
                placeholder="Enter description"
                rows="5"
                cols="40"
              />
              <div style={{ display: "flex" }}>
                <button type="submit" className="add-popup-btn">
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="close-popup-btn"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListManagers;
