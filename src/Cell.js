import React from "react";

const Cell = props => {
  return (
    <div
      row={props.row}
      col={props.col}
      onClick={props.handleClick}
      className={`Cell ${props.isLit && "Cell--lit"}`}
    />
  );
};

export default Cell;
