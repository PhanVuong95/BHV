import React, { useState } from "react";
import "./index.css";
import { Form, Input } from "antd";

const FloatLabelV2 = props => {
    const [focus, setFocus] = useState(false);
    const { label = '', value = '', name = '', disabled = false, type = 'text', onChange } = props;
    const labelClass = focus || (value && value.length !== 0) ? "label label-float" : "label";
    return (
        <div
            className="float-label"
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
        >
            <Input
                name={name}
                type={type}
                disabled={disabled}
                onChange={(e) => {
                    if (onChange) {
                        onChange(e)
                    }
                }}
                className="height-56-px pdt-16" />
            <label className={labelClass}>{label}</label>
        </div>
    );
};
export default FloatLabelV2;
