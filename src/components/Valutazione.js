import React from "react";

function Valutazione({ value, text, color }) {
  return (
    <div className="valutazione">
      <span>{text && text}</span>
      {[...Array(5)].map((el, index) => (
        <span key={index}>
          <i
            style={{ color }}
            className={
              value >= index + 1
                ? "fas fa-star"
                : value >= 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
      ))}
    </div>
  );
}

export default Valutazione;
