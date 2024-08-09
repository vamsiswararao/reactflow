import React from "react";
import {
  getBezierPath,
  getEdgeCenter,
  getMarkerEnd,
} from "react-flow-renderer";

const foreignObjectSize = 40;

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  arrowHeadType,
  markerEndId,
  onEdgeClick,
  color = "black", // Add default color
}) {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  //const { connectionHandleId } = useStore();

  return (
    <>
      <path
        id={id}
        style={style}
        stroke={color} // Use the color prop here
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      
      <foreignObject
        width={foreignObjectSize + 10}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2 + 8}
        y={edgeCenterY - foreignObjectSize / 2 + 8}
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div>
          <button
            className="edgebutton"
            onClick={() => onEdgeClick(id)}
          >
            X
          </button>
        </div>
      </foreignObject>
    </>
  );
}

export default CustomEdge;
