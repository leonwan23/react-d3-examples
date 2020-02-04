import React, { useState } from "react";
import { scaleLinear } from "d3";

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

export function scaleRadial() {
  function square(x) {
    return x * x;
  }

  var linear = scaleLinear();

  function scale(x) {
    return Math.sqrt(linear(x));
  }

  scale.domain = function(_) {
    return arguments.length ? (linear.domain(_), scale) : linear.domain();
  };

  scale.nice = function(count) {
    return linear.nice(count), scale;
  };

  scale.range = function(_) {
    return arguments.length
      ? (linear.range(_.map(square)), scale)
      : linear.range().map(Math.sqrt);
  };

  scale.ticks = linear.ticks;
  scale.tickFormat = linear.tickFormat;

  return scale;
}
