import React, { useState } from "react";
import useScrollIntoView from "../../hooks/useScrollIntoView";
import { InputProps } from "zmp-ui/input";
import { Input } from "antd";
import { CompoundedComponent } from "antd/es/float-button/interface";

const CustomInput = (props: InputProps) => {
  const { handleInputBlur, handleInputFocus, inputRef } = useScrollIntoView(
    props?.errorText
  );
  const [focus, setFocus] = useState(false);
  const { value = '', label = '', onChange }: any = props;
  const labelClass = focus || (value && value?.length !== 0) ? "label label-float" : "label";
  // console.log(props?.errorText);
  return (

    <div
      className="float-label"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      <Input
        onChange={(e) => { if (onChange) onChange(e) }}
        value={value}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        ref={inputRef}
        className="height-56-px pdt-16"
        {
          ...props as CompoundedComponent
        }
        placeholder=''
      />
      <label className={labelClass}>{label}</label>

      <div style={{ color: 'var(--primary-color-err)' }}>{props?.errorText}</div>
    </div>



  );
};

export default CustomInput;
