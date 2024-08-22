import React, { useState } from "react";
import "./index.css";
import { Form, Input } from "antd";

const FloatLabel = props => {
  const [focus, setFocus] = useState(false);
  const { label, value, name, form, rules = [], disabled = false, type = 'text', onChange } = props;
  const labelClass = focus || (value && value.length !== 0) ? "label label-float" : "label";
  return (
    <div
      className="float-label"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      <Form.Item
        getValueProps={(i) => ({ value: (i?.trimStart()) })}
        style={{
          width: "100%",
        }}
        name={name}
        rules={rules}
      >
        <Input
          type={type}
          disabled={disabled}
          onChange={(e) => {
            if (onChange) {
              onChange(e)
            }
          }}
          id={`${form.getFieldError(name).length > 0 ? 'custom-input-height-56-valid' : 'custom-input-height-56'}`} className="height-56-px pdt-16" />
      </Form.Item>
      <label className={labelClass}>{label}</label>
    </div>
  );
};

export default FloatLabel;
