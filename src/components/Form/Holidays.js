import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";


const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};

const parseDate = (formattedDate) => {
  const [day, month, year] = formattedDate.split("-");
  return `${day}-${month}-${year}`;
};

const Holiday = ({ nodeLabel, handleLabelChange, deleteNode, removeForm,save,copyNode }) => {
  const [dates, setDates] = useState([{ date: "", description: "" }]);

  const handleAddDate = () => {
    const newDate = { date: "", description: "" };
    setDates([...dates, newDate]);
  };

  const handleDateChange = (index, event) => {
    const { name, value } = event.target;
    const newDates = [...dates];
    if (name === "date") {
      newDates[index][name] = formatDate(value);
    } else {
      newDates[index][name] = value;
    }
    setDates(newDates);
  };

  const handleRemoveDate = (index) => {
    const newDates = [...dates];
    newDates.splice(index, 1);
    setDates(newDates);
  };

  const handleSave = () => {
    const formData = {
      name: nodeLabel,
      dates: dates.map(date => ({
        date: parseDate(date.date),
        description: date.description
      })),
      description: document.querySelector('.form-container textarea').value
    };
    console.log("Form Data:", formData);
    save(nodeLabel)
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: "center" }}>Holidays</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <form className="form-container">
          <label>Name:<span className="star">*</span></label>
          <input
            type="text"
            placeholder="Enter the Name"
            value={nodeLabel}
            onChange={handleLabelChange}
          />
          <div>
            {dates.map((date, index) => (
              <div key={index} className="date-container">
                <label style={{marginRight:"5px",width:'40px'}}>Date :</label>
                <input type="text" placeholder="DD-MM-YYYY" style={{width:"80px",fontSize:'12px'}}
                value={date.date ? parseDate(date.date) : ""}
                />
                <input
                  type="date"
                  name="date"
                  style={{height:'26px',width:'18px'}}
                  value={date.date ? parseDate(date.date) : ""}
                  onChange={(e) => handleDateChange(index, e)}
                />

                <label style={{marginLeft:'30px',width:'45px'}}>Name :</label>
                <input
                style={{width:'80px',marginLeft:'10px'}}
                  type="text"
                  name="description"
                  value={date.description}
                  onChange={(e) => handleDateChange(index, e)}
                />
                {index === 0 && ( // Display only for the first date entry
                  <button
                    type="button"
                    onClick={handleAddDate}
                    className="add-date-btn"
                  >
                    Add
                  </button>
                )}
                {index > 0 && ( // Display remove button for additional entries
                  <button
                    type="button"
                    onClick={() => handleRemoveDate(index)}
                    style={{background:"red"}}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <label>Description:</label>
          <textarea
            type="text"
            placeholder="Enter the description"
            rows="6"
            cols="40"
          />
        </form>
        <hr className="bottom-hr" />
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button onClick={copyNode} className="copy-btn"><FaCopy style={{height:'20px',width:'20px'}} /></button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: "20px", width: "20px" }} />
        </button>
      </div>
    </div>
  );
};

export default Holiday;
