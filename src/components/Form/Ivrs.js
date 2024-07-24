import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";


const Ivrs = ({
  nodeLabel,
  handleLabelChange,
  handleCheckboxChange,
  visiblePorts,
  deleteNode,
  removeForm,
  copyNode
}) => {
  return (
    <div className="form-one-container">
      <div className="form">
        <h3 style={{ textAlign: "center" }}>IVRS</h3>
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
            <label>ports</label>
            <div style={{display:'flex', width:'350px', flexWrap:'wrap'}}>

            {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} style={{ display: "flex", justifyContent:'center',alignItems:'center',marginRight:'6px' }}>
                <label>{index} </label>
                <input 
                  style={{ margin: "7px",width:'22px' }}
                  type="checkbox"
                  checked={visiblePorts[index]}
                  onChange={() => handleCheckboxChange(index)}
                  />
              </div>
            ))}
            </div>
          </div>
          <label>No of repeats:<span className="star">*</span></label>
          <input type="text" placeholder="Enter the no of repeats" />
            <label>Dial timeout (sec):<span className="star">*</span></label>
            <input type="text" placeholder="Enter the dial timeout" />
            <label>Repeat key:<span className="star">*</span></label>
            <div style={{display:'flex'}}>

            <select className="input-select">
              <option>Select... </option>
              {[...Array(10)]
                .map((_, i) => i + 1)
                .map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
            </select>
            </div>
            <div>
                <label>
                 Noinput audio:<span className="star">*</span>
                </label>
                <select className="input-select" name="selectedValue">
                  <option>Select the audio</option>
                  {[...Array(10)]
                    .map((_, i) => i + 1)
                    .map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label>
                 Invalid audio:<span className="star">*</span>
                </label>
                <select className="input-select" name="selectedValue">
                  <option>Select the audio</option>
                  {[...Array(10)]
                    .map((_, i) => i + 1)
                    .map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                </select>
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
        <button className="save-btn">Save</button>
        <button onClick={copyNode} className="copy-btn"><FaCopy style={{height:'20px',width:'20px'}} /></button>
        <button onClick={deleteNode} className="delete-btn">
          <RiDeleteBin6Line style={{ height: "20px", width: "20px" }} />
        </button>
      </div>
    </div>
  );
};

export default Ivrs;
