import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
//import './styles.css';

const apiUrl = process.env.REACT_APP_API_URL;

const TimingsForm = ({
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode,
  lml,
  flow_id,
  node
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
    lml: lml,
    app_id: node.data.app_id,
    flow_id: flow_id,
    inst_id: node.id,
    nm: nodeLabel,
    des: "",
    timings: {},
  });

  useEffect(() => {
    const fetchAnnouncementData = async () => {
      try {
        const response = await fetch(`${apiUrl}/app_get_data_timings`, {
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

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        if (data.resp.error_code === "0") {
          const annData = data.resp.app_data;

          // Update the state with the fetched timings data
          setFormData((prevData) => ({
            ...prevData,
            timings: annData.chek || {},
            des: annData.des || "",
          }));

          // Update daysOpenStatus based on fetched timings
          const newDaysOpenStatus = {};
          Object.keys(daysOpenStatus).forEach((day) => {
            newDaysOpenStatus[day] = annData.chek && annData.chek[day] ? true : false;
          });
          setDaysOpenStatus(newDaysOpenStatus);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAnnouncementData();
  }, [flow_id, nodeLabel, node, lml,daysOpenStatus]);

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

  const handleSave = async () => {
    const timings = {};
    Object.keys(daysOpenStatus).forEach((day) => {
      if (daysOpenStatus[day]) {
        const from = document.getElementById(`${day}-from`).value;
        const to = document.getElementById(`${day}-to`).value;
        timings[day] = { from, to };
      }
    });

    const updatedFormData = {
      ...formData,
      timings,
    };
    setFormData(updatedFormData);

    try {
      const response = await fetch(`${apiUrl}/app_set_data_timings`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data saved successfully:", data);
        save(); // Call the save callback to trigger any additional save actions
      } else {
        console.error("Failed to save data:", response.statusText);
      }
    } catch (error) {
      console.error("Error while saving data:", error);
    }
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove />
        </button>
        <h3 className="form-title">Timings</h3>
        <hr />
        <div className="form-container">
          <label>
            Name:<span className="star">*</span>
          </label>
          <input
            type="text"
            name="nm"
            placeholder="Enter the Name"
            value={formData.nm || ''}
            onChange={handleLabelChange}
          />
          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
            <div key={day}>
              <div className="radio">
                <label>{day}:</label>
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
                <div className="time-radio">
                  <label>From time:</label>
                  <select id={`${day}-from`} className="time-select" defaultValue={formData.timings[day]?.from || ''} required>
                    {timeOptions}
                  </select>
                  <label>To time:</label>
                  <select id={`${day}-to`} className="time-select" defaultValue={formData.timings[day]?.to || ''}>
                    {timeOptions}
                  </select>
                </div>
              )}
            </div>
          ))}
          <label className="textarea-label">Description:</label>
          <textarea
            name="description"
            placeholder="Enter the description"
            rows="6"
            cols="40"
            value={formData.des || ''}
            onChange={handleChange}
          />
        </div>
        <hr className="bottom-hr" />
        <button onClick={handleSave} className="save-btn">Save</button>
        <button onClick={copyNode} className="copy-btn"><FaCopy /></button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
};

export default TimingsForm;
