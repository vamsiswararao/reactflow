import { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { CiCircleRemove } from 'react-icons/ci';
import { FaCopy } from "react-icons/fa";
const apiUrl = process.env.REACT_APP_API_URL;



const HangUp = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save,
  copyNode,
  flow_id
}) => {
  const [formData, setFormData] = useState({
    lml: "66c7088544596",
    app_id: node.data.app_id,
    flow_id: flow_id,
    inst_id: node.id,
    nm: nodeLabel || "",
    des: "",
  });

  const [errors, setErrors] = useState({});


  useEffect(() => {
    const fetchAnnouncementData = async () => {
      try {
        const response = await fetch(`${apiUrl}/app_get_data_hangup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lml: "66c7088544596",
            flow_id: flow_id,
            app_id: node.data.app_id,
            inst_id: node.id,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const HungUpData = data.resp.app_data;
        if(data.resp.error_code==="0"){

        setFormData((prevData) => ({
          ...prevData,
          nm: nodeLabel || "",
          des: HungUpData.des || "",
        }));
      }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAnnouncementData();
  }, [flow_id, nodeLabel, node.data.app_id, node.id]);


  const validateForm = () => {
    const newErrors = {};
    if (!formData.nm) newErrors.nm = "Name is required";
;

    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch(`${apiUrl}/app_set_data_hangup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to save data");
        }

        const data = await response.json();
        console.log(data)
        console.log(formData)
        save(nodeLabel); // Call the save handler from props
      } catch (error) {
        console.error("Error saving data:", error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    if (name === "nm") {
      handleLabelChange(e);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: 'center' }}>HungUp</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: '30px', width: '30px' }} />
        </button>
        <hr />
        <form className="form-container" >
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
          {errors.nm && <div className="error-msg">{errors.nm}</div>}

          <label>Remarks:</label>
          <textarea
            placeholder="Enter the remarks"
            rows="6"
            cols="40"
            name="des"
            value={formData.des}
            onChange={handleInputChange}
          />
        

        </form>
          <hr className="bottom-hr" />
          <button  className="save-btn" onClick={handleSave}>
            Save
          </button>
        <button onClick={copyNode} className="copy-btn"><FaCopy style={{height:'20px',width:'20px'}} /></button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: '20px', width: '20px' }} />
        </button>
      </div>
    </div>
  );
};

export default HangUp;
