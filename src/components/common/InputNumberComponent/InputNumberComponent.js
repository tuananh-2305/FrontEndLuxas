import React from "react";
import { InputNumber } from "antd";
const InputNumberComponent = (props) => {
  const {
    min,
    max,
    defaultValue,
    onChange,
    height,
    width,
    border,
    name,
    value,
  } = props;
  return (
    <InputNumber
      style={{
        height: height,
        width: width,
        padding: "8px",
        border: border,
        fontSize: "16px",
        fontWeight: "bold",
      }}
      value={value}
      name={name}
      min={min}
      max={max}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};

export default InputNumberComponent;
