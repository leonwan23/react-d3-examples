import React from "react";
import "./expenses.scss";

export default function MonthLabel({ selectMonth, selectedDate }) {
  return (
    <div id="month-label" className="arrow-wrapper">
      <div className="arrow arrow--left" onClick={() => selectMonth()}>
        <span>Prev</span>
      </div>
      <div className="block">
        <h2> {selectedDate} </h2>
      </div>
      <div className="arrow arrow--right" onClick={() => selectMonth(false)}>
        <span>Next</span>
      </div>
    </div>
  );
}
