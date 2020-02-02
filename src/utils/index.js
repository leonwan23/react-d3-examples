import React, { useState } from "react";

export function useInput({ type, placeholder, className, initialState = "" }) {
  const [value, setValue] = useState(initialState);
  const input = (
    <input
      type={type || "text"}
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={e => {
        setValue(e.target.value);
      }}
    />
  );
  return [value, input];
}
