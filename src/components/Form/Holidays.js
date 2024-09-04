import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

const apiUrl = process.env.REACT_APP_API_URL;

// Utility functions for formatting and parsing dates
const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};

const parseDate = (formattedDate) => {
  const [day, month, year] = formattedDate.split("-");
  return `${year}-${month}-${day}`;
};

// Utility function for API calls
const fetchData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

const Holiday = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode,
  flow_id,
}) => {
  const [formData, setFormData] = useState({
    lml: "66c7088544596",
    app_id: node.data.app_id,
    flow_id: flow_id,
    inst_id: node.id,
    nm: nodeLabel || "",
    hdays: [],
    des: "",
  });

  const [errors, setErrors] = useState({});
  const [dates, setDates] = useState([{ date: "", description: "" }]);

  useEffect(() => {
    const fetchAnnouncementData = async () => {
      try {
        const holidayData = await fetchData(`${apiUrl}/app_get_data_holidays`, {
          lml: "66c7088544596",
          flow_id: flow_id,
          app_id: node.data.app_id,
          inst_id: node.id,
        });

        if (holidayData.resp.error_code === "0") {
          const annData = holidayData.resp.app_data;
          setFormData({
            lml: "66c7088544596",
            app_id: node.data.app_id,
            flow_id: flow_id,
            inst_id: node.id,
            nm: nodeLabel || "",
            hdays: annData.hdays || [],
            des: annData.des || "",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAnnouncementData();
  }, [flow_id, nodeLabel, node]);

  useEffect(() => {
    if (formData.hdays.length > 0) {
      setDates(
        formData.hdays.map((hday) => ({
          date: hday.date,
          description: hday.hdays_nm,
        }))
      );
    }
  }, [formData.hdays]);

  const handleAddDate = () => {
    setDates([...dates, { date: "", description: "" }]);
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
    setFormData((prevData) => ({
      ...prevData,
      hdays: newDates,
    }));
  };

  const handleRemoveDate = (index) => {
    setDates(dates.filter((_, i) => i !== index));
  };

  const handleDescriptionChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      des: e.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nm) newErrors.name = "Name is required";
    if (dates.some((date) => !date.date || !date.description)) {
      newErrors.dates = "All dates and descriptions must be filled out.";
    }
    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      setErrors({});
      try {
        const response = await fetchData(`${apiUrl}/app_set_data_holidays`, formData);
        console.log(response)
        console.log("Form Data Saved:", formData);
        save(nodeLabel);
      } catch (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          server: "Failed to save data. Please try again later.",
        }));
      }
    } else {
      setErrors(formErrors);
    }
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
          <label>
            Name:<span className="star">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter the Name"
            value={nodeLabel}
            onChange={handleLabelChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
          <div>
            {dates.map((date, index) => (
              <div key={index} className="date-container">
                <label style={{ marginRight: "5px", width: "40px" }}>
                  Date :
                </label>
                <input
                  type="date"
                  name="date"
                  style={{ width: "140px", fontSize: "12px" }}
                  value={date.date ? parseDate(date.date) : ""}
                  onChange={(e) => handleDateChange(index, e)}
                />

                <label style={{ marginLeft: "30px", width: "45px" }}>
                  Name :
                </label>
                <input
                  style={{ width: "80px", marginLeft: "6px" }}
                  type="text"
                  name="description"
                  value={date.description}
                  onChange={(e) => handleDateChange(index, e)}
                />
                {index === 0 && (
                  <button
                    type="button"
                    onClick={handleAddDate}
                    className="add-date-btn"
                  >
                    Add
                  </button>
                )}
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveDate(index)}
                    style={{ background: "red" }}
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
            value={formData.des}
            onChange={handleDescriptionChange}
          />
          {errors.dates && <p className="error">{errors.dates}</p>}
        </form>
        <hr className="bottom-hr" />
        {errors.server && <p className="error">{errors.server}</p>}
        <button className="save-btn" onClick={handleSave} disabled={Object.keys(errors).length > 0}>
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

export default Holiday;
