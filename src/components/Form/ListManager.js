import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

import { useEffect, useState } from "react";
import "./Listmanager.css";

const apiUrl = process.env.REACT_APP_API_URL;

const ListManagers = ({
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  copyNode,
  node,
  flow_id,
  save,
}) => {
  const [formData, setFormData] = useState({
    lml: "66b9dee3ef1ca",
    app_id: node.data.app_id,
    // "5c93b0a9b0810",
    flow_id: flow_id,
    inst_id: node.id,
    nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
    list_id: "",
    action_typ: "1",
  });

  const [listData, setListData] = useState({
    lml: "66b9dee3ef1ca",
    app_id: node.data.app_id,
    // "5c93b0a9b0810",
    flow_id: flow_id,
    inst_id: node.id,
    nme_list: "",
    des_list: "",
  });
  const [listOptions, setListOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchAnnouncementData = async () => {
      try {
        const announcementResponse = await fetch(
          `${apiUrl}/app_get_data_lmanage`,
          {
            method: "POST", // Specify the PUT method
            headers: {
              "Content-Type": "application/json", // Ensure the content type is JSON
            },
            body: JSON.stringify({
              lml: "66b9dee3ef1ca",
              flow_id: "66c708df247df", // Use the provided flow_id
              app_id: node.data.app_id, // Use the provided app_id
              inst_id: node.id, // Use the provided inst_id
            }),
          }
        );
        const announcementData = await announcementResponse.json();
        //console.log(announcementData.resp.app_data)
        const managerData = announcementData.resp.app_data;
        if (!announcementResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        setFormData((prevData) => ({
          lml: "66b9dee3ef1ca",
          app_id: node.data.app_id,
          // "5c93b0a9b0810",
          flow_id: flow_id,
          inst_id: node.id,
          nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
          list_id: managerData.lstuni,
          action_typ: managerData.typ || "1",
        }));

        // Fetch audio options with the same data
        const audioResponse = await fetch(`${apiUrl}/app_get_lists_lmanage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lml: "66b9dee3ef1ca",
            flow_id: flow_id,
            app_id: node.data.app_id,
            inst_id: node.id,
          }),
        });

        if (!audioResponse.ok) {
          throw new Error("Failed to fetch audio options");
        }

        const audioData = await audioResponse.json();
        setListOptions(audioData.resp.aud_data || []);
        //console.log(audioData.resp.aud_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAnnouncementData();
  }, [flow_id, nodeLabel, node]);

  const validateForm = () => {
    console.log(formData.list_id);
    const newErrors = {};
    if (!formData.nm) newErrors.name = "Name is required";
    if (!formData.list_id) newErrors.list_id = "list selection is required";
    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setErrors({});
      try {
        const response = await fetch(`${apiUrl}/app_set_data_lmanage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error("Failed to save data");
        }

        console.log("Form Data Saved:", formData);
        save(nodeLabel); // Call the save handler from props
      } catch (error) {
        console.error("Error saving data:", error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  const handlePlusClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "nm") {
      handleLabelChange(e); // Call the prop function to update nodeLabel in parent component
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleListSave = async () => {
    //const formErrors = validateForm();
    //if (Object.keys(formErrors).length === 0) {
    setErrors({});
    try {
      const response = await fetch(`${apiUrl}/app_add_list_lmanage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listData),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      console.log("Form Data Saved:", listData);
      setListOptions((prevOptions) => [
        ...prevOptions,
        { cluni: listData.new_list_id, clnm: listData.nme_list },
      ]);

    } catch (error) {
      console.error("Error saving data:", error);
    }
    // } else {
    //   setErrors(formErrors);
    // }
  };

  const handleListChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setListData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
            name="nm"
            value={formData.nm}
            onChange={handleInputChange}
          />
          <label>
            List:<span className="star">*</span>
          </label>
          <div style={{ display: "flex" }}>
            <select
              className="input-select"
              name="list_id"
              value={formData.list_id}
              onChange={handleInputChange}
            >
              <option value="">Select the audio</option>
              {listOptions.map((list, index) => (
                <option key={index} value={list.cluni}>
                  {list.clnm}
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
          {errors.list_id && <p className="error">{errors.list_id}</p>}

          <select
            className="input-select"
            name="action_typ"
            value={formData.action_typ}
            onChange={handleInputChange}
          >
            <option value="1">add</option>
            <option value="0">Delete</option>
          </select>
        </form>
        <hr className="bottom-hr" />
        <button onClick={handleSave} className="save-btn">
          Save
        </button>
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
            <div>
              <label>
                name:<span className="star">*</span>
              </label>
              <input type="text" name="nme_list" placeholder="Enter new name" onChange={handleListChange}/>
              <label>Description:</label>
              <textarea
                type="text"
                placeholder="Enter description"
                rows="5"
                cols="40"
                name="des_list"
                onChange={handleListChange}
              />
              <div style={{ display: "flex" }}>
                <button onClick={handleListSave} className="add-popup-btn">
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListManagers;
