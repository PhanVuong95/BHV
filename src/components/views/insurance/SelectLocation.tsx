import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";

import { Input, Select, Text } from "zmp-ui";
import { ECategory } from "../../../enums/insurance";
import { composeValidator, isEmpty } from "../../../helpers/validator";
import {
  ILocationResponse,
  IProvinceResponse,
  ISelectLocationParams,
} from "../../../interfaces/insurance";
import { getInsuranceCategory } from "../../../services/insurance";
import CustomInput from "../../common/CustomInput";

const { Option } = Select;

const SelectLocation = ({
  insuranceData,
  activeValidate,
  setInsuranceData,
  field,
  title,
  disabled,
}: {
  activeValidate: boolean;
  insuranceData: ISelectLocationParams;
  setInsuranceData: React.Dispatch<React.SetStateAction<ISelectLocationParams>>;
  field: keyof ISelectLocationParams;
  title: string;
  disabled: boolean;
}) => {
  const [visible, setvisible] = useState(false);
  const [provinces, setProvinces] = useState<IProvinceResponse[]>([]);
  const [options, setOptions] = useState<ILocationResponse[]>([]);
  const [locations, setLocations] = useState<ILocationResponse[]>([]);

  useEffect(() => {
    if (disabled) return;
    getInsuranceCategory<IProvinceResponse>(ECategory.PROVINCE).then((res) => {
      setOptions(res.map((province) => ({ ...province, districts: [] })));
      setProvinces(res);
    });
  }, [disabled]);

  useEffect(() => {
    switch (field) {
      case "district": {
        setOptions(
          provinces
            .find((province) => province.code == insuranceData.province)
            ?.districts.map((district) => ({ ...district, wards: [] })) || []
        );
        break;
      }
    }
  }, [field, provinces, insuranceData.province]);
  useEffect(() => {
    switch (field) {
      case "ward": {
        setOptions(
          provinces
            .find((province) => province.code == insuranceData.province)
            ?.districts.find(
              (district) => district.code == insuranceData.district
            )
            ?.wards.map((item) => ({ ...item, districts: [] })) || []
        );
        break;
      }
    }
  }, [field, provinces, insuranceData.district, insuranceData.province]);

  useEffect(() => {
    setLocations(options);
  }, [options]);

  const handleSearchLocation = useCallback(
    debounce((e) => {
      const value = e.target.value;

      // text
      const matchLocations = options.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );

      setLocations(matchLocations.slice(0, 50));
    }, 500),
    [options]
  );

  return (
    <Select
      disabled={!options.length}
      label={
        visible
          ? ((
              <CustomInput
                className="text-sm h-8 w-[60%] hide"
                placeholder={title}
                onChange={handleSearchLocation}
              />
            ) as any)
          : ((<Text>{title} (*)</Text>) as any)
      }
      onVisibilityChange={(val) => {
        if (val) setLocations(options);
        setvisible(val);
      }}
      closeOnSelect
      placeholder={title}
      value={insuranceData[field] as string}
      onChange={(value) => {
        setInsuranceData((insurance) => ({
          ...insurance,
          [field]: value,
          ...(field === "province" && {
            district: "",
            ward: "",
          }),
          ...(field === "district" && {
            ward: "",
          }),
          ...(field === "ward" && {
            locationCode: String(value),
          }),
        }));
        setvisible(false);
      }}
      className="text-base mt-2 block"
      errorText={
        composeValidator([isEmpty], activeValidate, insuranceData[field])
          .message
      }
      status={
        composeValidator([isEmpty], activeValidate, insuranceData[field]).status
      }
    >
      {locations.map((location) => (
        <Option value={location.code} title={location.name} />
      ))}
    </Select>
  );
};

export default SelectLocation;
