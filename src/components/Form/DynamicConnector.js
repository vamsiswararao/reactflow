import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
import { RiInformation2Fill } from "react-icons/ri";

const DynamicConnectorForm = ({
  node,
  nodeLabel,
  handleLabelChange,
  deleteNode,
  removeForm,
  save, // Function to handle saving form data
  copyNode,
  flow_id
}) => {
  const [connectType, setConnectType] = useState("");
  const [flowType, setFlowType] = useState("no"); // State for Flow Type radio button
  const [distributionType, setDistributionType] = useState("");
  const [missedCallTo, setMissedCallTo] = useState("");
  const [holdTune, setHoldTune] = useState("");
  const [ringTime, setRingTime] = useState("");
  const [maxCallTime, setMaxCallTime] = useState("");
  const [url, setUrl] = useState("");
  const [sticky, setSticky] = useState("yes"); // State for Sticky radio button
  const [recording, setRecording] = useState("yes"); // State for Recording radio button
  const [enableQueue, setEnableQueue] = useState("no"); // State for Enable Queue radio button
  const [queueType, setQueueType] = useState(""); // State for Queue Type dropdown
  const [queueTime, setQueueTime] = useState(""); // State for Queue Time input
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredDynamicUrl, setIsHoveredDynamicUrl] = useState(false);
  const [isHoveredStickiness, setIsHoveredStickness] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSaveClick = () => {
    // Basic validation example
    if (
      !nodeLabel ||
      !connectType ||
      !distributionType ||
      !missedCallTo ||
      !holdTune ||
      !sticky ||
      !recording ||
      !enableQueue
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Gather all form data into an object
    const formData = {
      app_id:node.data.app_id ,
    // "5c93b0a9b0810",
      flow_id: flow_id,
      inst_id:node.id,
      name:nodeLabel,
      connectType,
      distributionType,
      missedCallTo,
      holdTune,
      ringTime,
      maxCallTime,
      url,
      sticky,
      recording,
      enableQueue,
      queueType,
      queueTime,
      // Add other form fields as needed
    };
    console.log(formData);
    // Call the handleSave function from props to save the data
    save(formData); // Pass the formData object
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
            value={nodeLabel}
            onChange={handleLabelChange}
            required
          />
          <label style={{ maxWidth: "90px" }}>
            Flow Type:<span className="star">*</span>
          </label>
          <div className="flow-radio">
            <input
              type="radio"
              className="blue-radio"
              name="flowType"
              value="yes"
              checked={flowType === "yes"}
              onChange={(e) => setFlowType(e.target.value)}
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
              name="flowType"
              value="no"
              checked={flowType === "no"}
              onChange={(e) => setFlowType(e.target.value)}
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
          {flowType === "yes" ? (
            <>
              <label>
                Primary url:<span className="star">*</span>
              </label>
              <textarea
                type="number"
                placeholder="Enter the primary url"
                rows="6"
                cols="40"
              />
              <label>Fall back url:</label>
              <textarea
                type="number"
                placeholder="Enter the queue time"
                rows="6"
                cols="40"
              />
            </>
          ) : (
            <>
              <label style={{ marginTop: "10px", marginBottom: "5px" }}>
                Call connect type:<span className="star">*</span>
              </label>
              <select
                className="input-select"
                value={connectType}
                onChange={(e) => setConnectType(e.target.value)}
              >
                <option value="">Select the call connect type</option>
                <option value="Department">Department</option>
                <option value="Employee">Employee</option>
                <option value="Numbers List">Number list</option>
                <option value="Url">Url</option>
              </select>
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
                    <h3>Linear </h3> <span>- Calls get distributed in an assigned order</span>
                   </div>
                   <form>
                   <h3>Linear </h3> <span>- Calls get distributed in an assigned order</span>
                    <h3>Random </h3> <span>- Calls get distributed in an unorganized way</span>
                    <h3>Ring All </h3> <span>- Calls get distributed to the longest free agent</span>
                    <h3>Least Calls </h3> <span>- Calls get distributed to the least call answered the agent </span>
                    <h3>Talk Time-based </h3> <span>- Calls get distributed to the least talked (Call seconds) agent </span>
                    <h3>Least Active </h3> <span>- Calls get distributed to the longest free agent</span>
                    <h3>Round Robin </h3> <span>- Calls get distributed evenly across different agents. in other words,it sends calls down a predetermined list of receivers</span>
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
                value={distributionType}
                onChange={(e) => setDistributionType(e.target.value)}
                required
              >
                <option value="">Select the distribution type</option>
                {[...Array(10)]
                  .map((_, i) => i + 1)
                  .map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
              </select>
              <label style={{ marginTop: "10px", marginBottom: "5px" }}>
                Assign missedcall to:
              </label>
              <select
                className="input-select"
                value={missedCallTo}
                onChange={(e) => setMissedCallTo(e.target.value)}
              >
                <option value="">Select the assign missedCall</option>
                {[...Array(10)]
                  .map((_, i) => i + 1)
                  .map((i) => (
                    <option key={i} value={i}>
                      {i}
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
                  name="sticky"
                  value="yes"
                  checked={sticky === "yes"}
                  onChange={(e) => setSticky(e.target.value)}
                />
                <span>Yes</span>
                <input
                  type="radio"
                  className="blue-radio"
                  name="sticky"
                  value="no"
                  checked={sticky === "no"}
                  onChange={(e) => setSticky(e.target.value)}
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
                  value={missedCallTo}
                  onChange={(e) => setMissedCallTo(e.target.value)}
                >
                  <option value="">Always</option>
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
                  name="Recording"
                  value="yes"
                  checked={recording === "yes"}
                  onChange={(e) => setRecording(e.target.value)}
                />
                <span>Yes</span>
                <input
                  type="radio"
                  className="blue-radio"
                  name="Recording"
                  value="no"
                  checked={recording === "no"}
                  onChange={(e) => setRecording(e.target.value)}
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
                  name="Queue"
                  value="yes"
                  checked={enableQueue === "yes"}
                  onChange={(e) => setEnableQueue(e.target.value)}
                />
                <span>Yes</span>
                <input
                  type="radio"
                  className="blue-radio"
                  name="Queue"
                  value="no"
                  checked={enableQueue === "no"}
                  onChange={(e) => setEnableQueue(e.target.value)}
                />
                <span>No</span>
              </div>
              {enableQueue === "yes" && (
                <>
                  <label>
                    Queue Tune:<span className="star">*</span>
                  </label>
                  <select
                    className="input-select"
                    value={queueType}
                    onChange={(e) => setQueueType(e.target.value)}
                    required
                  >
                    <option value="">Select the queue tune</option>
                    {[...Array(10)]
                      .map((_, i) => i + 1)
                      .map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                  </select>
                  <label>Max time in Queue (sec):</label>
                  <input
                    type="number"
                    placeholder="Enter the queue time"
                    value={queueTime}
                    onChange={(e) => setQueueTime(e.target.value)}
                  />
                </>
              )}

              <label>
                Default hold tune:<span className="star">*</span>
              </label>
              <select
                className="input-select"
                value={holdTune}
                onChange={(e) => setHoldTune(e.target.value)}
              >
                <option value="">Select the default hold tune</option>
                {[...Array(10)]
                  .map((_, i) => i + 1)
                  .map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
              </select>
              <label>No. of retries :</label>
              <input
                type="number"
                placeholder="Enter the ring time"
                value={ringTime}
                onChange={(e) => setRingTime(e.target.value)}
              />
              <label>Ring time (sec):</label>
              <input
                type="number"
                placeholder="Enter the ring time"
                value={ringTime}
                onChange={(e) => setRingTime(e.target.value)}
              />
              <label>Max call time (sec):</label>
              <input
                type="number"
                placeholder="Enter the Max Call Time"
                value={maxCallTime}
                onChange={(e) => setMaxCallTime(e.target.value)}
              />
              <label>URL:</label>
              <input
                type="url"
                placeholder="Enter the url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </>
          )}
        </div>
        <hr className="bottom-hr" />
        <button className="save-btn" onClick={handleSaveClick}>
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
