import React, { PropsWithChildren, useState } from "react";
import { Input, Select } from "zmp-ui";
import { SelectProps } from "zmp-ui/select";
import CustomInput from "./CustomInput";
import './Modal.css'; // Import your CSS file for styling and animation

type Props = { onSearch?: (val: string) => void };

const CustomSelect = ({
  onSearch,
  ...props
}: PropsWithChildren<SelectProps & Props>) => {
  const [visibility, setvisibility] = useState(false);

  return (
    <Select
      {...props}
      onVisibilityChange={(val) => {
        setvisibility(val);
      }}
      onChange={(...args) => {
        setvisibility(false);
        props?.onChange?.(...args);
      }}
      label={
        ((visibility && onSearch && (
          <CustomInput
            placeholder="Tìm kiếm"
            className="text-xs w-2/3 h-10"
            onChange={(e) => {
              onSearch(e.target.value);
            }}
          />
        )) as any) || props.label
      }
    />
  );
};

export default CustomSelect;
