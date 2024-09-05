import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
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
        const timeResponse = await fetch(`${apiUrl}/app_get_data_timings`, {
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
        const timeData = await timeResponse.json();
        if (!timeResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        if (timeData.resp.error_code === "0") {
          const tData = timeData.resp.app_data;
          console.log(tData)
          setFormData((prevData) => ({
            lml: lml,
            app_id: node.data.app_id,
            flow_id: flow_id,
            inst_id: node.id,
            nm: nodeLabel || "",
            timings:tData.chek ||'',
            des: tData.des || "",
          }));
          const newDaysOpenStatus = {};
          Object.keys(daysOpenStatus).forEach((day) => {
            newDaysOpenStatus[day] = tData.chek && tData.chek[day] ? true : false;
          });
          setDaysOpenStatus(newDaysOpenStatus);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAnnouncementData();
  }, [flow_id, nodeLabel, node,lml]);

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
    // const isValid = formData.nm.trim() !== "";

    // if (!isValid) {
    //   alert("Please fill in all required fields.");
    //   return;
    // }

    // Collect time data for each day
    const timings ={};
    Object.keys(daysOpenStatus).forEach((day) => {
      if (daysOpenStatus[day]) {
        const from = document.getElementById(`${day}-from`).value;
        const to = document.getElementById(`${day}-to`).value;
        timings[day] = { from, to };
      }
    });

    // Update form data
    const updatedFormData = {
      ...formData,
      timings,
    };
    setFormData(updatedFormData);

    console.log("Form Data:", updatedFormData);

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
        console.log(updatedFormData)
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
            name="nm"
            placeholder="Enter the Name"
            value={nodeLabel}
            onChange={handleLabelChange}
          />
          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
            <div key={day}>
              <div className="radio">
                <label style={{ minWidth: '90px' }}>{day}:</label>
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
                  <label style={{width:'160px',marginRight:'10px'}}>From time:</label>
                  <select id={`${day}-from`} style={{ marginLeft:'5px', width: "90px",height:'25px',fontSize:'16px' }}  defaultValue={formData.timings[day]?.from || ''} required>
                    {timeOptions}
                  </select>
                  <label style={{marginLeft:"20px",width:'100px'}}>To time:</label>
                  <select id={`${day}-to`} style={{ marginLeft:'5px',width: "90px",height:"25px",fontSize:'16px'}}  defaultValue={formData.timings[day]?.to || ''}>
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
