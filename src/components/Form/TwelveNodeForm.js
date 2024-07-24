import { RiDeleteBin6Line } from "react-icons/ri";

const TwelveNodeForm=({ nodeLabel, handleLabelChange, updateNodeLabel,handleCheckboxChange,visiblePorts,deleteNode })=>{
  
 
  return (
          <div className="form-container">
          <h3>Twelve Node Form</h3>
          <div className="form">
            <h3>Edit Node Label</h3>
            <div className="node-container">
              <input type="text" value={nodeLabel} onChange={handleLabelChange} />
              <button className="node-btn" onClick={updateNodeLabel}>
                Update Node
              </button>
            </div>
            <hr/>
            <div >
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} style={{display:'flex', marginLeft:'10px'}} >
            <label>node{index + 1} :</label>
            <input style={{margin:'7px'}}
              type="checkbox" checked={visiblePorts[index]}
              onChange={() => handleCheckboxChange(index)} 
            />
          </div>
        ))}
      </div>
            <hr className="bottom-hr" />
            <button className="save-btn">Save</button>
            <button onClick={deleteNode} className="delete-btn"><RiDeleteBin6Line style={{height:'20px', width:'20px'}} />
            </button>
          </div>
        </div>
          );
}

export default TwelveNodeForm