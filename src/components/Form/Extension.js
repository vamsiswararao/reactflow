import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";

const apiUrl = process.env.REACT_APP_API_URL;

const Extensions = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  copyNode,
  flow_id,
  save,
}) => {
  const [formData, setFormData] = useState({
    lml: "66b9dee3ef1ca",
    app_id: node.data.app_id,
    flow_id: flow_id,
    inst_id: node.id,
    nm: nodeLabel || "",
    audio: "",
    retries: "1",
    des: "",
  });
  const [audioOptions, setAudioOptions] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAnnouncementData = async () => {
      try {
        const response = await fetch(`${apiUrl}/app_get_data_extension`, {
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

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const extensionData = data.resp.app_data;
        setFormData((prevData) => ({
          ...prevData,
          nm: nodeLabel || "",
          audio: extensionData.audio,
          retries: extensionData.retries || "1",
          des: extensionData.des,
        }));

        // Fetch audio options
        const audioResponse = await fetch(`${apiUrl}/app_get_audios`, {
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
        setAudioOptions(audioData.resp.aud_data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAnnouncementData();
  }, [flow_id, nodeLabel, node.data.app_id, node.id]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nm) newErrors.nm = "Name is required";
    if (!formData.audio) newErrors.audio = "Audio selection is required";
    if (!formData.retries || formData.retries <= 0)
      newErrors.retries = "Retries must be greater than 0";

    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch(`${apiUrl}/app_set_data_extension`, {
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
        <h3 style={{ textAlign: "center" }}>Extension</h3>
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
          {errors.nm && <div className="error-msg">{errors.nm}</div>}

          <label>
            Audio:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            name="audio"
            value={formData.audio}
            onChange={handleInputChange}
          >
            <option value="">Select the audio</option>
            {audioOptions.map((audio, index) => (
              <option key={index} value={audio.auni}>
                {audio.anm}
              </option>
            ))}
          </select>
          {errors.audio && <div className="error-msg">{errors.audio}</div>}

          <label>
            Retries:<span className="star">*</span>
          </label>
          <select
            className="input-select"
            name="retries"
            value={formData.retries}
            onChange={handleInputChange}
          >
            {[...Array(2)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          {errors.retries && <div className="error-msg">{errors.retries}</div>}

          <label>Description:</label>
          <textarea
            type="text"
            placeholder="Enter the description"
            rows="6"
            cols="40"
            name="des"
            value={formData.des}
            onChange={handleInputChange}
          />
        </form>
        <hr className="bottom-hr" />
        <button className="save-btn" onClick={handleSave}>
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

export default Extensions;
