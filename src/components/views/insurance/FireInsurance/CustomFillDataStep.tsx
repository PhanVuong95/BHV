import { pick } from "lodash";
import React, { useEffect, useState } from "react";
import { Box, Input, Text, Checkbox } from "zmp-ui";
import { composeValidator, isEmpty } from "../../../../helpers/validator";
import {
  ICreateFireInsuranceParams,
  IInsuranceFeeDetails,
  IProvinceResponse,
} from "../../../../interfaces/insurance";
import { IVoucher } from "../../../../services/referrer";
import LayoutHeader from "../../../layouts/LayoutHeader";
import RegisterInsuranceStep from "../RegisterInsuranceStep";
import SelectLocation from "../SelectLocation";
import Footer from "../Footer";
import CustomInput from "../../../common/CustomInput";
import RegisterInsuranceStepV2 from "../AutoInsurance/RegisterInsuranceStepV2";
import { getInsuranceCategory } from "../../../../services/insurance";
import { ECategory } from "../../../../enums/insurance";
import CustomSelectV3 from "../../../select/CustomSelectV3";

type Props = {
  insuranceData: ICreateFireInsuranceParams;
  setInsuranceData?: React.Dispatch<
    React.SetStateAction<ICreateFireInsuranceParams>
  >;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  feeDetails: IInsuranceFeeDetails;
  loadingFeeDetails: boolean;
  availableVouchers: IVoucher[];
  step: number;
  currentStep: number;
  setcurrentStep: React.Dispatch<React.SetStateAction<number>>;
  activeValidate: boolean;
  setactiveValidate: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomFillDataStep = (props: Props) => {
  const [provinces, setProvinces] = useState<IProvinceResponse[]>([]);
  const [districts, setDistricts] = useState<IProvinceResponse[]>([]);
  const [wards, setWards] = useState<IProvinceResponse[]>([]);

  const {
    insuranceData,
    setInsuranceData = () => { },
    setcurrentStep,
    activeValidate,
    setactiveValidate,
    loadingFeeDetails,

    feeDetails,
  } = props;

  useEffect(() => {

    getInsuranceCategory<IProvinceResponse>(ECategory.PROVINCE).then((res: any) => {
      res = res.map((itemMap) => {
        return {
          ...itemMap,
          Text: itemMap?.name,
          Value: itemMap?.code
        }
      })
      setProvinces(res);
    });
    getInsuranceCategory(ECategory.HOME_PACKAGES, {
      source: EInsuranceSource.PVI,
    }).then((res) => setHomePackageCategory(res));
  }, []);
  return (
    <div className="pb-44">
      <LayoutHeader
        showBackIcon={true}
        title={<Text className="text-white">Bảo hiểm cháy nổ</Text>}
        onBackClick={() => {
          setcurrentStep((step) => Math.max(0, step - 1) as any);
        }}
      />
      <RegisterInsuranceStepV2 step={2} />
      <Box className="p-4 bg-white">
        <Text.Title className="font-semibold text-lg leading-6 pb-4">
          Thông tin nhà
        </Text.Title>

        <CustomSelectV3
          onChange={(value) => {
            setDistricts([])
            setWards([])
            setInsuranceData((insurance) => ({
              ...insurance,
              province: (value?.Value),
            }))
            const convertData = value?.districts?.map((itemMap) => {
              return {
                ...itemMap,
                Value: itemMap?.code,
                Text: itemMap?.name,
              }
            })
            setDistricts(convertData)
            setWards([])
          }}
          label='Tỉnh/ Thành phố'
          options={provinces}
          value={insuranceData?.province}
        />
        <CustomSelectV3
          onChange={(value) => {
            setInsuranceData((insurance) => ({
              ...insurance,
              district: (value?.Value),
            }))
            const convertData = value?.wards?.map((itemMap) => {
              return {
                ...itemMap,
                Value: itemMap?.code,
                Text: itemMap?.name,
              }
            })
            setWards(convertData)
          }}
          label='Quận/ Huyện'
          options={districts}
          value={insuranceData?.district}
        />
        <CustomSelectV3
          onChange={(value) => {
            setInsuranceData((insurance) => ({
              ...insurance,
              ward: (value?.Value),

            }))
          }}
          label="Phường/ Xã/ Thị trấn"
          options={wards}
          value={insuranceData?.ward}
        />
        <CustomInput
          label={
            (
              <Text className="text-sm"> Số nhà, số tầng, đường (*)</Text>
            ) as any
          }
          type="text"
          placeholder="Số nhà, số tầng,..."
          className="text-base mt-2 block"
          required
          value={insuranceData.address}
          onChange={(e) =>
            setInsuranceData((insurance) => ({
              ...insurance,
              address: e.target.value,
            }))
          }
          errorText={
            composeValidator([isEmpty], activeValidate, insuranceData.address)
              .message
          }
          status={
            composeValidator([isEmpty], activeValidate, insuranceData.address)
              .status
          }
        />
        <CustomInput
          label={(<Text className="text-sm">Năm xây dựng (*)</Text>) as any}
          type="text"
          placeholder="2022"
          className="text-base mt-2 block"
          required
          value={insuranceData.yearBuilt}
          onChange={(e) =>
            setInsuranceData((insurance) => ({
              ...insurance,
              yearBuilt: e.target.value.replace(/[^\d]/g, ""),
            }))
          }
          errorText={
            composeValidator([isEmpty], activeValidate, insuranceData.yearBuilt)
              .message
          }
          status={
            composeValidator([isEmpty], activeValidate, insuranceData.yearBuilt)
              .status
          }
        />
      </Box>
      <Footer
        loadingFeeDetails={loadingFeeDetails}
        feeDetails={feeDetails}
        handlePrev={() => {
          setcurrentStep((step) => Math.max(0, step - 1));
        }}
        handleNext={() => {
          setactiveValidate(true);
          setTimeout(() => setactiveValidate(false), 2000);

          if (
            Object.values(
              pick(insuranceData, [ "yearBuilt", "address"])
            ).every(
              (item) =>
                composeValidator([isEmpty], true, item).status === "success"
            )
          ) {
            setactiveValidate(false);
            setcurrentStep((step) => step + 1);
          }
        }}
      />
    </div>
  );
};

export default CustomFillDataStep;
