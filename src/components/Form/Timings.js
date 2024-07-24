import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

const TimingsForm = ({
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode
}) => {
  const [daysOpenStatus, setDaysOpenStatus] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });

  const [formData, setFormData] = useState({
    name: nodeLabel,
    description: "",
    timings: {},
  });

  const timeOptions = Array.from({ length: 48 }, (_, index) => {
    const hours = String(Math.floor(index / 2)).padStart(2, '0');
    const minutes = index % 2 === 0 ? '00' : '30';
    const time = `${hours}:${minutes}`;
    return (
      <option key={time} value={time}>
        {time}
      </option>
    );
  });

  const handleDayChange = (day, isOpen) => {
    setDaysOpenStatus({
      ...daysOpenStatus,
      [day]: isOpen,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    const isValid = formData.name.trim() !== ""
    
    if (!isValid) {
      alert("Please fill in all required fields.");
      return;
    }

    // Collect time data for each day
    const timings = {};
    Object.keys(daysOpenStatus).forEach((day) => {
      if (daysOpenStatus[day]) {
        const from = document.getElementById(`${day}-from`).value;
        const to = document.getElementById(`${day}-to`).value;
        timings[day] = { from, to };
      }
    });

    // Update form data
    setFormData({
      ...formData,
      timings,
    });

    console.log("Form Data:", formData);
    save()
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <h3 style={{ textAlign: "center" }}>Timings</h3>
        <hr />
        <div className="form-container">
          <label>
            Name:<span className="star">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter the Name"
            value={nodeLabel}
            onChange={handleLabelChange}
          />
          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
            <div key={day}>
              <div className="radio">
                <label style={{ width: '60px' }}>{day}:</label>
                <input
                  type="radio"
                  name={`${day.toLowerCase()}-status`}
                  value="yes"
                  checked={daysOpenStatus[day]}
                  onChange={() => handleDayChange(day, true)}
                />
                <span>Open</span>
                <input
                  type="radio"
                  name={`${day.toLowerCase()}-status`}
                  value="no"
                  checked={!daysOpenStatus[day]}
                  onChange={() => handleDayChange(day, false)}
                />
                <span>Close</span>
              </div>
              {daysOpenStatus[day] && (
                <div className="radio">
                  <label>From:</label>
                  <select id={`${day}-from`} style={{ width: "80px",height:'25px',fontSize:'16px' }} required>
                    {timeOptions}
                  </select>
                  <label>To:</label>
                  <select id={`${day}-to`} style={{ width: "80px",height:"25px",fontSize:'16px'}}>
                    {timeOptions}
                  </select>
                </div>
              )}
            </div>
          ))}
          <label style={{ marginTop: "10px" }}>Description:</label>
          <textarea
            name="description"
            placeholder="Enter the description"
            rows="6"
            cols="40"
            value={formData.description}
            onChange={handleChange}
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

export default TimingsForm;
