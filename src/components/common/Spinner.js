import React from "react";

export default function Spinner({ radius, color }) {
  const spinnerColor = color ? color : "#fff";
  const width = radius || "20px";
  const height = radius || "20px";
  return (
    <div
      className="spinner"
      style={{ borderTopColor: spinnerColor, width, height }}
    ></div>
  );
}
