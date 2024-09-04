import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

const BitrixForm = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode,
  flow_id
}) => {
  const [isToggled, setIsToggled] = useState(true);
  const [assignMiscellaneous, setAssignMiscellaneous] = useState([]);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    lml: "66c7088544596",
    app_id: node.data.app_id,
    flow_id: "66c708df247df",
    inst_id: node.id,
    nm: nodeLabel,
    url: "",
    additional_prm: "",
    crm_create: isToggled ? "yes" : "no",
    crm_entity_type: "",
    mislanis_to: "",
  });

  const apiUrl = process.env.REACT_APP_API_URL;

  const findIdByName = (array, name) => {
    const item = array.find((element) => element.empnm === name);
    return item ? item.empuni : null;
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/app_get_employees`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lml: "66c7088544596",
            flow_id,
            app_id: node.data.app_id,
            inst_id: node.id,
          }),
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch miscellaneous data");
        }

        const data = await response.json();
        setAssignMiscellaneous(data.resp.aud_data || []);
        console.log(data.resp.aud_data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (nodeLabel) {
      fetchData();
  
    }
  }, [nodeLabel, flow_id, node.data.app_id, apiUrl, node.id]);

  useEffect(() => {
    const fetchBitrixData = async () => {
      try {
        const response = await fetch(`${apiUrl}/app_get_data_bitrix`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lml: "66c7088544596",
            flow_id,
            app_id: node.data.app_id,
            inst_id: node.id,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch miscellaneous data");
        }

        const data = await response.json();
        const BitrixData= data.resp.app_data
       console.log(data)
        
       if(data.resp.error_code==="0"){
        setFormData((prevData) => ({
          
          lml: "66c7088544596",
         app_id: node.data.app_id,
         flow_id: flow_id,
         inst_id: node.id,
         nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
         url: BitrixData.url || "",
         additional_prm: BitrixData.prams,
         crm_create: BitrixData.crm_create,
         crm_entity_type: BitrixData.CRM_ENTITY_TYPE,
         mislanis_to: findIdByName(assignMiscellaneous, BitrixData.mislanis_to_name),
       }));

       }
        

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };


    if (nodeLabel) {
      fetchBitrixData()
    }
  }, [nodeLabel, flow_id, node.data.app_id, apiUrl, node.id,assignMiscellaneous]);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    setFormData((prevData) => ({
      ...prevData,
      crm_create: !isToggled ? "yes" : "no",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nm.trim()) newErrors.nm = "Name is required.";
    if (!formData.url.trim()) newErrors.url = "URL is required.";
    if (!formData.mislanis_to.trim()) newErrors.mislanis_to = "Assign miscellaneous is required.";
    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/app_set_data_bitrix`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const BitrixData = await response.json();
      console.log("Form Data Saved:", BitrixData);
      console.log(formData)
      save(nodeLabel);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "nm") {
      handleLabelChange(e);
    }
  };
  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: "center" }}>Bitrix</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <div className="form-container">
          <label htmlFor="nm">
            Name:<span className="star">*</span>
          </label>
          <input
            type="text"
            id="nm"
            name="nm"
            placeholder="Enter the Name"
            value={formData.nm}
            onChange={handleInputChange}
          />
          {errors.nm && <p className="error">{errors.nm}</p>}

          <label htmlFor="url">
            Url:<span className="star">*</span>
          </label>
          <textarea
            id="url"
            name="url"
            type="url"
            placeholder="Enter the url"
            value={formData.url}
            onChange={handleInputChange}
            rows="6"
            cols="40"
          />
          {errors.url && <p className="error">{errors.url}</p>}

          <label htmlFor="additional_prm">Additional parameters:</label>
          <textarea
            id="additional_prm"
            name="additional_prm"
            placeholder="Enter the additional parameters"
            value={formData.additional_prm}
            onChange={handleInputChange}
            rows="6"
            cols="40"
          />

          <div style={{ display: "flex", alignItems: "center" }}>
            <p>Create CRM:</p>
            <p style={{ marginRight: "10px", marginLeft: "10px" }}>No</p>

            <div className="toggle-switch" onClick={handleToggle}>
              <div
                className={`switch ${isToggled ? "toggled" : "non-toggled"}`}
              >
                {isToggled ? (
                  <i className="icon-on"></i> 
                ) : (
                  <i className="icon-off"></i> 
                )}
              </div>
            </div>
            <p style={{ marginLeft: "10px" }}>Yes</p>
          </div>

          <label htmlFor="crm_entity_type">CRM type:</label>
          <select
            id="crm_entity_type"
            className="input-select"
            name="crm_entity_type"
            value={formData.crm_entity_type}
            onChange={handleInputChange}
          >
            <option value="">Select the CRM type</option>
            <option value="Contact">Contact</option>
            <option value="Company">Company</option>
            <option value="Lead">Lead</option>
          </select>

          <label htmlFor="mislanis_to">
            Assign miscellaneous to:<span className="star">*</span>
          </label>
          <select
            id="mislanis_to"
            className="input-select"
            name="mislanis_to"
            value={formData.mislanis_to}
            onChange={handleInputChange}
          >
            <option value="">Select...</option>
            <option value="0">None</option>
            {assignMiscellaneous.map((mis, index) => (
              <option key={index} value={mis.empuni}>
                {mis.empnm}
              </option>
            ))}
          </select>
          {errors.mislanis_to && (
            <p className="error">{errors.mislanis_to}</p>
          )}
        </div>

        <hr className="bottom-hr" />
        <button className="delete-btn" onClick={() => deleteNode(node.id)}>
          <RiDeleteBin6Line style={{ height: "20px", width: "20px" }} />
        </button>
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
        <button className="copy-btn" onClick={() => copyNode(node)}>
          <FaCopy style={{ height: "20px", width: "20px" }} />
        </button>
      </div>
    </div>
  );
};

export default BitrixForm;
