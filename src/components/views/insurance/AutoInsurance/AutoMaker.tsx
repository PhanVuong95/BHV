import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Select, Text } from "zmp-ui";
import { ECategory, EInsuranceSource } from "../../../../enums/insurance";
import { ICategoryResponse, ICreateAutoInsuranceParams } from "../../../../interfaces/insurance";
import { getInsuranceCategory } from "../../../../services/insurance";
import { debounce } from "lodash";
import { composeValidator, isEmpty } from "../../../../helpers/validator";
import CustomInput from "../../../common/CustomInput";
import CustomSelectV3 from "../../../select/CustomSelectV3";

const { Option } = Select;

const AutoMakerForm = ({
  insuranceData,
  setInsuranceData = () => { },
  activeValidate,
}: {
  insuranceData: ICreateAutoInsuranceParams;
  setInsuranceData?: React.Dispatch<
    React.SetStateAction<ICreateAutoInsuranceParams>
  >;
  activeValidate: boolean;
}) => {
  const [visible, setvisible] = useState(false);

  const [micAutoMakers, setmicAutoMakers] = useState<ICategoryResponse[]>([]);
  const [pviAutoMakers, setpviAutoMakers] = useState<ICategoryResponse[]>([]);
  const [micAutoLabels, setmicAutoLabels] = useState<ICategoryResponse[]>([]);
  const [pviAutoLabels, setpviAutoLabels] = useState<ICategoryResponse[]>([]);
  const [searchOptions, setsearchOptions] = useState<ICategoryResponse[]>([]);


  const [vbiAutoMakers, setvbiAutoMakers] = useState<ICategoryResponse[]>([]);
  const [vbiAutoLabel, setvbiAutoLabel] = useState<ICategoryResponse[]>([]);
  const [bshAutoMakers, setbshAutoMakers] = useState<ICategoryResponse[]>([]);
  const [bshAutoLabel, setbshAutoLabel] = useState<ICategoryResponse[]>([]);

  useEffect(() => {
    getInsuranceCategory(ECategory.HIEUXEAUTO, {
      source: EInsuranceSource.MIC,
    }).then((res) => setmicAutoMakers(res));

    getInsuranceCategory(ECategory.HIEUXEAUTO, {
      source: EInsuranceSource.PVI,
    }).then((res) => setpviAutoMakers(res));
    getInsuranceCategory(ECategory.DONGXE, {
      source: EInsuranceSource.PVI,
    }).then((res) => setpviAutoLabels(res));

    getInsuranceCategory(ECategory.HIEUXEAUTO, {
      source: EInsuranceSource.VBI,
    }).then((res) => setvbiAutoMakers(res));
    getInsuranceCategory(ECategory.HIEUXEAUTO, {
      source: EInsuranceSource.BSH,
    }).then((res) => setbshAutoMakers(res));    
  }, []);

  useEffect(() => {
    getInsuranceCategory(ECategory.DONGXE, {
      source: EInsuranceSource.MIC,
      selectedValue: insuranceData?.MIC?.automaker,
    }).then((res) => setmicAutoLabels(res));
  }, [insuranceData.MIC.automaker]);

  useEffect(() => {
    getInsuranceCategory(ECategory.DONGXE, {
      source: EInsuranceSource.VBI,
      selectedValue: insuranceData?.VBI?.automaker,
    }).then((res) => setvbiAutoLabel(res));
  }, [insuranceData.VBI.automaker]);

  useEffect(() => {
    getInsuranceCategory(ECategory.DONGXE, {
      source: EInsuranceSource.BSH,
      selectedValue: insuranceData?.BSH?.automaker,
    }).then((res) => setbshAutoLabel(res));
  }, [insuranceData.BSH.automaker]);

  const autoMakers = useMemo(
    () => ({
      [EInsuranceSource.MIC]: micAutoMakers,
      [EInsuranceSource.PVI]: pviAutoMakers,
      [EInsuranceSource.VBI]: vbiAutoMakers,
      [EInsuranceSource.BSH]: bshAutoMakers,
    }),
    [micAutoMakers, pviAutoMakers, vbiAutoMakers, bshAutoMakers]
  );
  const autoLabels = useMemo(
    () => ({
      [EInsuranceSource.MIC]: micAutoLabels,
      [EInsuranceSource.PVI]: pviAutoLabels,
      [EInsuranceSource.VBI]: vbiAutoLabel,
      [EInsuranceSource.BSH]: bshAutoLabel,
    }),
    [micAutoLabels, pviAutoLabels, vbiAutoLabel, bshAutoLabel]
  );
  const handleSearch = useCallback(
    debounce((e, options) => {
      const value = e.target.value;

      // text
      const matchResult = options.filter((item) =>
        item.Text.toLowerCase().includes(value.toLowerCase())
      );

      setsearchOptions(matchResult.slice(0, 50));
    }, 500),
    []
  );

  return (
    <>

      <div style={{ marginTop: 12 }}>
        <CustomSelectV3
          disabled={!insuranceData.userIntent}
          value={insuranceData[insuranceData.source].automaker || ""}
          onChange={(value) => {
            setInsuranceData((insurance) => ({
              ...insurance,
              [insuranceData.source]: {
                ...insuranceData[insuranceData.source],
                automaker: value?.Value,
              },
            }));
            setsearchOptions([]);
            setvisible(false);
          }}
          errorText={
            composeValidator(
              [isEmpty],
              activeValidate,
              insuranceData[insuranceData.source].automaker
            ).message
          }
          label='Hãng xe'
          options={searchOptions.length ? searchOptions : autoMakers[insuranceData.source]}
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <CustomSelectV3
          disabled={!insuranceData?.userIntent}
          value={insuranceData[insuranceData.source]?.label || ""}
          onChange={(value) => {
            setInsuranceData((insurance) => ({
              ...insurance,
              [insuranceData.source]: {
                ...insuranceData[insuranceData.source],
                label: value?.Value,
              },
            }));
            setsearchOptions([]);
            setvisible(false);
          }}
          label='Hiệu xe'
          options={searchOptions.length ? searchOptions : autoLabels[insuranceData.source]}
          errorText={
            composeValidator(
              [isEmpty],
              activeValidate,
              insuranceData[insuranceData.source].label
            ).message
          }
        />
      </div>
    </>
  );
};
export default AutoMakerForm