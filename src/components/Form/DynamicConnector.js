import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
import { RiInformation2Fill } from "react-icons/ri";
const apiUrl = process.env.REACT_APP_API_URL;

const DynamicConnectorForm = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save, // Function to handle saving form data
  copyNode,
  flow_id,
}) => {
  const [formData, setFormData] = useState({
    lml: "66c7088544596",
    app_id: node.data.app_id,
    // "5c93b0a9b0810",
    flow_id: flow_id,
    inst_id: node.id,
    nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
    flow_typ: "1",
    connect_type: "",
    distribution_typ: "",
    mcall_to: "",
    stick: "1",
    stickiness: "0",
    record: "1",
    queue: "0",
    queue_tune: "",
    queue_max_time: "",
    hold_tune: "",
    retries: "3",
    ring_time: "",
    max_calltm: "",
    url: "",
    dyn_primary_url: "",
    dyn_fallback_url: "",
    numbers_list: "",
    numbers_prim_url: "",
    numbers_sec_url: "",
    dep_uniq: "",
    emp: "",
  });
  const [callConnectOptions, setCallConnectOptions] = useState([]);
  const [audioOptions, setAudioOptions] = useState([]);
  const [departmentsOptions, setDepartmentsOptions] = useState([]);
  const [empOptions, setEmpOptions] = useState([]);
  const [assignMiscellaneous, setAssignMiscellaneous] = useState([]);

  const [errors, setErrors] = useState({});

  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredDynamicUrl, setIsHoveredDynamicUrl] = useState(false);
  const [isHoveredStickiness, setIsHoveredStickness] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);



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
    const fetchAnnouncementData = async () => {
      try {
        const dynamicResponse = await fetch(
          `${apiUrl}/app_get_data_dconnector`,
          {
            method: "POST", // Specify the PUT method
            headers: {
              "Content-Type": "application/json", // Ensure the content type is JSON
            },
            body: JSON.stringify({
              lml: "66c7088544596",
              flow_id: "66c708df247df", // Use the provided flow_id
              app_id: node.data.app_id, // Use the provided app_id
              inst_id: node.id, // Use the provided inst_id
            }),
          }
        );
        const dynamicData = await dynamicResponse.json();
        console.log(dynamicData.resp.app_data);
        const dynamicFinalData = dynamicData.resp.app_data;
        if (!dynamicResponse.ok) {
          throw new Error("Failed to fetch data");
        }
        if(dynamicData.resp.error_code==="0"){
        setFormData((prevData) => ({
          lml: "66c7088544596",
          app_id: node.data.app_id,
          //   // "5c93b0a9b0810",
          flow_id: flow_id,
          inst_id: node.id,
          nm: nodeLabel || "", // Initialize with nodeLabel or an empty string
          flow_typ: dynamicFinalData.call_flow_type || "1",
          connect_type: dynamicFinalData.typ,
          dep_uniq: dynamicFinalData.dep_uniq,
          distribution_typ: dynamicFinalData.caltype,
          mcall_to: dynamicFinalData.mcall_to_uniq,
          stick: dynamicFinalData.stick || "1",
          stickiness: dynamicFinalData.sticky_timeout || "0",
          record: dynamicFinalData.record || "1",
          queue: dynamicFinalData.queue || "0",
          queue_tune: dynamicFinalData.queue_tune,
          queue_max_time: dynamicFinalData.queue_max_time,
          hold_tune: dynamicFinalData.hold_tune,
          retries: dynamicFinalData.retries_cnt || "3",
          ring_time: dynamicFinalData.ringtm,
          max_calltm: dynamicFinalData.calltm,
          url: dynamicFinalData.url,
          dyn_primary_url: dynamicFinalData.dyn_primary_url,
          dyn_fallback_url: dynamicFinalData.dyn_fallback_url,
          numbers_list: dynamicFinalData.numbers_list,
          numbers_prim_url: dynamicFinalData.numbers_prim_url,
          numbers_sec_url: dynamicFinalData.numbers_sec_url,
          emp: dynamicFinalData.emp,
        }));
      }

        // Fetch audio options with the same data
        const callResponse = await fetch(
          `${apiUrl}/app_get_distribution_types`,
          {
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
          }
        );

        if (!callResponse.ok) {
          throw new Error("Failed to fetch audio options");
        }

        const callData = await callResponse.json();
        setCallConnectOptions(callData.resp.aud_data || []);
        console.log(callData.resp.aud_data);
        const audioResponse = await fetch(`${apiUrl}/app_get_audios`, {
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

        if (!audioResponse.ok) {
          throw new Error("Failed to fetch audio options");
        }

        const audioData = await audioResponse.json();
        setAudioOptions(audioData.resp.aud_data || []);
        //console.log(audioData.resp.aud_data);

        const empResponse = await fetch(`${apiUrl}/app_get_employees`, {
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

        if (!audioResponse.ok) {
          throw new Error("Failed to fetch audio options");
        }

        const empData = await empResponse.json();
        setEmpOptions(empData.resp.aud_data || []);
        console.log(audioData.resp.aud_data);

        const departmentsResponse = await fetch(
          `${apiUrl}/app_get_departments`,
          {
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
          }
        );

        if (!departmentsResponse.ok) {
          throw new Error("Failed to fetch audio options");
        }

        const departmentsData = await departmentsResponse.json();
        setDepartmentsOptions(departmentsData.resp.aud_data || []);
        //console.log(departmentsData.resp.aud_data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAnnouncementData();
  }, [flow_id, nodeLabel, node]);

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

  const validateForm = () => {
    console.log(formData.nm);
    const newErrors = {};
    if (!formData.nm) newErrors.nm = "Name is required";
    // if (!formData.audio)
    //   newErrors.selectedValue = "Audio selection is required";
    // if (!formData.hold_audio)
    //   newErrors.hold_audio = "Repeat Count is required";
    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    console.log(formData);
    if (Object.keys(formErrors).length === 0) {
      setErrors({});
      try {
        const response = await fetch(`${apiUrl}/app_set_data_dconnector`, {
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

  const handleIconClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: "center" }}>Dynamic Connector</h3>
        <button onClick={removeForm} className="remove-btn">
          <CiCircleRemove style={{ height: "30px", width: "30px" }} />
        </button>
        <hr />
        <div className="form-container">
          <label>
            Name:<span className="star">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter the Name"
            value={formData.nm}
            onChange={handleInputChange}
            required
          />
          {errors.nm && <p className="error">{errors.nm}</p>}
          <label style={{ maxWidth: "90px" }}>
            Flow Type:<span className="star">*</span>
          </label>
          <div className="flow-radio">
            <input
              type="radio"
              className="blue-radio"
              name="flow_typ"
              value="2"
              checked={formData.flow_typ === "2"}
              onChange={handleInputChange}
            />
            <div
              style={{
                width: "180px",
                position: "relative",
              }}
              onMouseEnter={() => setIsHoveredDynamicUrl(true)}
              onMouseLeave={() => setIsHoveredDynamicUrl(false)}
            >
              <span>
                Dynamic URL <RiInformation2Fill />
              </span>
              {isHoveredDynamicUrl && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#f9f9f9",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    zIndex: 1,
                    width: "180px", // Adjust width as needed
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-6px",
                      left: "68%",
                      transform: "translateX(-50%)",
                      width: "0",
                      height: "0",
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      borderBottom: "10px solid #f9f9f9", // Same color as background
                    }}
                  ></div>
                  <div>Configure parameters dynamically by proving a url</div>
                </div>
              )}
            </div>
            <input
              type="radio"
              className="blue-radio"
              name="flow_typ"
              value="1"
              checked={formData.flow_typ === "1"}
              onChange={handleInputChange}
            />
            <div
              style={{
                width: "180px",
                position: "relative",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span>
                Call flow builder <RiInformation2Fill />
              </span>
              {isHovered && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "100",
                    right: "20",
                    width: "120px",
                    backgroundColor: "#f9f9f9",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-6px",
                      left: "90%",
                      transform: "translateX(-50%)",
                      width: "0",
                      height: "0",
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      borderBottom: "10px solid #f9f9f9", // Same color as background
                    }}
                  ></div>
                  manually Configure the call flow to connect to a number, group
                  of numbers, Department, phone number(s) returned by url
                </div>
              )}
            </div>
          </div>
          {formData.flow_typ === "2" ? (
            <>
              <label>
                Primary url:<span className="star">*</span>
              </label>
              <textarea
                type="number"
                placeholder="Enter the primary url"
                name="dyn_primary_url"
                rows="6"
                cols="40"
                value={formData.dyn_primary_url}
                onChange={handleInputChange}
              />
              <label>Fall back url:</label>
              <textarea
                name="dyn_fallback_url"
                type="number"
                placeholder="Enter the queue time"
                rows="6"
                cols="40"
                value={formData.dyn_fallback_url}
                onChange={handleInputChange}
              />
            </>
          ) : (
            <>
              <label style={{ marginTop: "10px", marginBottom: "5px" }}>
                Call connect type:<span className="star">*</span>
              </label>
              <select
                className="input-select"
                name="connect_type"
                value={formData.connect_type}
                onChange={handleInputChange}
              >
                <option value="">Select the call connect type</option>
                <option value="1">Department</option>
                <option value="2">Employee</option>
                <option value="3">Number list</option>
                <option value="4">Url</option>
              </select>
              {formData.connect_type === "1" && (
                <div>
                  <label style={{ marginTop: "10px", marginBottom: "5px" }}>
                    Department:<span className="star">*</span>
                  </label>
                  <select
                    className="input-select"
                    name="dep_uniq"
                    value={formData.dep_uniq}
                    onChange={handleInputChange}
                  >
                    <option value="">Select the department</option>
                    {departmentsOptions.map((dep, index) => (
                      <option key={index} value={dep.mu}>
                        {dep.dn}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {formData.connect_type === "2" && (
                <div>
                  <label style={{ marginTop: "10px", marginBottom: "5px" }}>
                    Employee:<span className="star">*</span>
                  </label>
                  <select
                    className="input-select"
                    name="emp"
                    value={formData.emp}
                    onChange={handleInputChange}
                  >
                    <option value="">Select...</option>
                    {empOptions.map((mis, index) => (
                      <option key={index} value={mis.empuni}>
                        {mis.empnm}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {formData.connect_type === "3" && (
                <div>
                  <label style={{ marginTop: "10px", marginBottom: "5px" }}>
                    Numbers:<span className="star">*</span>
                  </label>
                  <input
                    type="number"
                    className="input-text"
                    name="numbers_list"
                    value={formData.numbers_list}
                    onChange={handleInputChange}
                    nim="0"
                  />
                </div>
              )}

              {formData.connect_type === "4" && (
                <div>
                  <label style={{ marginTop: "10px", marginBottom: "5px" }}>
                    Primary URL:<span className="star">*</span>
                  </label>
                  <input
                    type="url"
                    className="input-text"
                    name="numbers_prim_url"
                    value={formData.numbers_prim_url}
                    onChange={handleInputChange}
                    placeholder="Enter a URL"
                  />
                  <label style={{ marginTop: "10px", marginBottom: "5px" }}>
                    Secondary URL:
                  </label>
                  <input
                    type="url"
                    className="input-text"
                    name="numbers_sec_url"
                    value={formData.numbers_sec_url}
                    onChange={handleInputChange}
                    placeholder="Enter a URL"
                  />
                </div>
              )}
              <label style={{ marginTop: "10px", marginBottom: "5px" }}>
                Call distribution type:<span className="star">*</span>{" "}
                <span onClick={handleIconClick}>
                  <RiInformation2Fill style={{ color: "blue" }} />
                </span>
                {isPopupOpen && (
                  <div className="popup-container">
                    <div className="popup">
                      <h3>Call Distribution Types</h3>
                      <div>
                        <h3>Linear </h3>{" "}
                        <span>
                          - Calls get distributed in an assigned order
                        </span>
                      </div>
                      <form>
                        <h3>Linear </h3>{" "}
                        <span>
                          - Calls get distributed in an assigned order
                        </span>
                        <h3>Random </h3>{" "}
                        <span>
                          - Calls get distributed in an unorganized way
                        </span>
                        <h3>Ring All </h3>{" "}
                        <span>
                          - Calls get distributed to the longest free agent
                        </span>
                        <h3>Least Calls </h3>{" "}
                        <span>
                          - Calls get distributed to the least call answered the
                          agent{" "}
                        </span>
                        <h3>Talk Time-based </h3>{" "}
                        <span>
                          - Calls get distributed to the least talked (Call
                          seconds) agent{" "}
                        </span>
                        <h3>Least Active </h3>{" "}
                        <span>
                          - Calls get distributed to the longest free agent
                        </span>
                        <h3>Round Robin </h3>{" "}
                        <span>
                          - Calls get distributed evenly across different
                          agents. in other words,it sends calls down a
                          predetermined list of receivers
                        </span>
                        <div style={{ display: "flex" }}>
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
              </label>
              <select
                className="input-select"
                name="distribution_typ"
                value={formData.distribution_typ}
                onChange={handleInputChange}
              >
                <option value="">Select the call distribution Type</option>
                {callConnectOptions.map((call, index) => (
                  <option key={index} value={call.caltypid}>
                    {call.caltypnm}
                  </option>
                ))}
              </select>
              <label style={{ marginTop: "10px", marginBottom: "5px" }}>
                Assign missedcall to:
              </label>
              <select
                className="input-select"
                name="mcall_to"
                value={formData.mcall_to}
                onChange={handleInputChange}
              >
                <option value="">Select... </option>
                <option value="123321">First Dialed</option>
                <option value="123444321">Last Dialed </option>
            {assignMiscellaneous.map((mis, index) => (
              <option key={index} value={mis.empuni}>
                {mis.empnm}
              </option>
            ))}
              </select>
              <div className="radio">
                <label style={{ maxWidth: "90px" }}>
                  Sticky:<span className="star">*</span>
                </label>
                <input
                  type="radio"
                  className="blue-radio"
                  name="stick"
                  value="1"
                  checked={formData.stick === "1"}
                  onChange={handleInputChange}
                />
                <span>Yes</span>
                <input
                  type="radio"
                  className="blue-radio"
                  name="stick"
                  value="0"
                  checked={formData.stick === "0"}
                  onChange={handleInputChange}
                />
                <span>No</span>
              </div>
              <div style={{ display: "flex" }}>
                <span>Stickiness:</span>
                <div
                  style={{
                    width: "5px",
                    position: "relative",
                  }}
                  onMouseEnter={() => setIsHoveredStickness(true)}
                  onMouseLeave={() => setIsHoveredStickness(false)}
                >
                  <span style={{ marginLeft: "5px" }}>
                    <RiInformation2Fill />
                  </span>
                  {isHoveredStickiness && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "100",
                        left: "60",
                        width: "250px",
                        backgroundColor: "#f9f9f9",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        zIndex: 1,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-6px",
                          left: "7%",
                          transform: "translateX(-50%)",
                          width: "0",
                          height: "0",
                          borderLeft: "10px solid transparent",
                          borderRight: "10px solid transparent",
                          borderBottom: "10px solid #f9f9f9", // Same color as background
                        }}
                      ></div>
                      Choose the stickiness check time(hours) for inbound calls
                      to connect to the last spoken agent.
                    </div>
                  )}
                </div>
                <select
                  style={{ width: "70px", marginLeft: "30px" }}
                  value={formData.stickiness}
                  name="stickiness"
                  onChange={handleInputChange}
                >
                  <option value="0">Always</option>
                  {[...Array(48)]
                    .map((_, i) => i + 1)
                    .map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                </select>
              </div>
              <div className="radio">
                <label style={{ maxWidth: "90px" }}>
                  Recording:<span className="star">*</span>
                </label>
                <input
                  type="radio"
                  className="blue-radio"
                  name="record"
                  value="1"
                  checked={formData.record === "1"}
                  onChange={handleInputChange}
                />
                <span>Yes</span>
                <input
                  type="radio"
                  className="blue-radio"
                  name="record"
                  value="0"
                  checked={formData.record === "0"}
                  onChange={handleInputChange}
                />
                <span>No</span>
              </div>
              <div className="radio">
                <label style={{ maxWidth: "90px" }}>
                  Enable Queue:<span className="star">*</span>
                </label>
                <input
                  type="radio"
                  className="blue-radio"
                  name="queue"
                  value="1"
                  checked={formData.queue === "1"}
                  onChange={handleInputChange}
                />
                <span>Yes</span>
                <input
                  type="radio"
                  className="blue-radio"
                  name="queue"
                  value="0"
                  checked={formData.queue === "0"}
                  onChange={handleInputChange}
                />
                <span>No</span>
              </div>
              {formData.queue === "1" && (
                <>
                  <label>
                    Queue Tune:<span className="star">*</span>
                  </label>
                  <select
                    className="input-select"
                    name="queue_tune"
                    value={formData.queue_tune}
                    onChange={handleInputChange}
                  >
                    <option value="">Select the Queue tune</option>
                    {audioOptions.map((audio, index) => (
                      <option key={index} value={audio.auni}>
                        {audio.anm}
                      </option>
                    ))}
                  </select>
                  <label>Max time in Queue (sec):</label>
                  <input
                    type="number"
                    placeholder="Enter the queue time"
                    value={formData.queue_max_time}
                    name="queue_max_time"
                    onChange={handleInputChange}
                    min="0"
                  />
                </>
              )}

              <label>
                Default hold tune:<span className="star">*</span>
              </label>
              <select
                className="input-select"
                name="hold_tune"
                value={formData.hold_tune}
                onChange={handleInputChange}
              >
                <option value="">Select the Hold tune</option>
                {audioOptions.map((audio, index) => (
                  <option key={index} value={audio.auni}>
                    {audio.anm}
                  </option>
                ))}
              </select>
              <label>No. of retries :</label>
              <input
                type="number"
                placeholder="Enter the ring time"
                value={formData.retries}
                name="retries"
                onChange={handleInputChange}
                min="0"
              />
              <label>Ring time (sec):</label>
              <input
                type="number"
                placeholder="Enter the ring time"
                name="ring_time"
                value={formData.ring_time}
                onChange={handleInputChange}
                min="0"
              />
              <label>Max call time (sec):</label>
              <input
                type="number"
                placeholder="Enter the Max Call Time"
                name="max_calltm"
                value={formData.max_calltm}
                onChange={handleInputChange}
                min="0"
              />
              <label>URL:</label>
              <input
                type="url"
                placeholder="Enter the url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
              />
            </>
          )}
        </div>
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

export default DynamicConnectorForm;
