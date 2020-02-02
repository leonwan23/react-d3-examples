import React from "react";

export default function Spinner({ radius, color, margin }) {
  const spinnerColor = color ? color : "#fff";
  const spinnerMargin = margin || "auto";
  const spinnerRadius = radius ? radius + "px" : "20px";
  return (
    <div
      className="spinner"
      style={{
        borderTopColor: spinnerColor,
        width: spinnerRadius,
        height: spinnerRadius,
        margin: spinnerMargin
      }}
    ></div>
  );
}
