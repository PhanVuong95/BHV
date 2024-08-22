import { pick } from "lodash";
import React from "react";

import { Box, DatePicker, Select, Text } from "zmp-ui";
import { EGender } from "../../../../enums";

import {
  composeValidator,
  isEmailValid,
  isEmpty,
  isIdentityCardNumValid,
} from "../../../../helpers/validator";
import {
  ICreateFireInsuranceParams,
  IInsuranceFeeDetails,
} from "../../../../interfaces/insurance";
import { IVoucher } from "../../../../services/referrer";
import LayoutHeader from "../../../layouts/LayoutHeader";
import RegisterInsuranceStep from "../RegisterInsuranceStep";
import Footer from "../Footer";
import CustomInput from "../../../common/CustomInput";
import RegisterInsuranceStepV2 from "../AutoInsurance/RegisterInsuranceStepV2";
import CustomSelectV3 from "../../../select/CustomSelectV3";
import CustomDatePickerV2 from "../../../common/DatePicker/CustomDatePickerV2";
import moment from "moment";
import { DEFAULT_FORMAT_DATE } from "../AutoInsurance/AutoInsuranceFormFillDataStep";

const { Option } = Select;

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

const FillBasicInfoStep = (props: Props) => {
  const {
    insuranceData,
    setInsuranceData = () => { },
    feeDetails,
    loadingFeeDetails,
    step,
    currentStep,
    setcurrentStep,
    activeValidate,
    setactiveValidate,
  } = props;

  return (
    <div className="pb-44" key={`currentStep_${currentStep}`}>
      <RegisterInsuranceStepV2 step={step as any} />
      <LayoutHeader
        showBackIcon={true}
        title={<Text className="text-white">Bảo hiểm cháy nổ</Text>}
        onBackClick={() => {
          setcurrentStep((step) => Math.max(0, step - 1) as any);
        }}
      />

      <Box className="p-4 bg-white">
        <Text.Title className="font-semibold text-lg leading-6 mb-4">
          Thông tin người mua bảo hiểm
        </Text.Title>
        <CustomInput
          label={(<Text className="text-sm"> Họ tên (*)</Text>) as any}
          type="text"
          placeholder="Nguyễn Văn A"
          className="text-base mt-2 block"
          required
          value={insuranceData.userName}
          onChange={(e) =>
            setInsuranceData((insurance) => ({
              ...insurance,
              userName: e.target.value,
            }))
          }
          errorText={
            composeValidator([isEmpty], activeValidate, insuranceData.userName)
              .message
          }
          status={
            composeValidator([isEmpty], activeValidate, insuranceData.userName)
              .status
          }
        />
        <CustomInput
          label={
            (<Text className="text-sm"> Địa chỉ thường trú (*)</Text>) as any
          }
          type="text"
          placeholder="Mễ Trì Hạ, Nam Từ Liêm, Hà Nội"
          className="text-base mt-2 block"
          required
          value={insuranceData.userAddress}
          onChange={(e) =>
            setInsuranceData((insurance) => ({
              ...insurance,
              userAddress: e.target.value,
            }))
          }
          errorText={
            composeValidator(
              [isEmpty],
              activeValidate,
              insuranceData.userAddress
            ).message
          }
          status={
            composeValidator(
              [isEmpty],
              activeValidate,
              insuranceData.userAddress
            ).status
          }
        />

        <CustomInput
          type="text"
          label={(<Text className="text-sm"> Số CMND/CCCD (*)</Text>) as any}
          placeholder="Số CMND/CCCD 9 hoặc 12 số"
          className="text-base  mt-2 block"
          required
          value={insuranceData.identityCardNum}
          onChange={(e) =>
            setInsuranceData((insurance) => ({
              ...insurance,
              identityCardNum: e.target.value.replace(/[^\d]/g, ""),
            }))
          }
          errorText={
            composeValidator(
              [isIdentityCardNumValid, isEmpty],
              activeValidate,
              insuranceData.identityCardNum
            ).message
          }
          status={
            composeValidator(
              [isIdentityCardNumValid, isEmpty],
              activeValidate,
              insuranceData.identityCardNum
            ).status
          }
        />

        <Box className="mt-2">
          <CustomSelectV3
            onChange={(value) =>
              setInsuranceData((insurance) => ({
                ...insurance,
                gender: value?.Value as EGender,
              }))
            }
            label='Giới tính'
            options={Object.values(EGender).map((itemMap) => {
              return {
                Value: itemMap,
                Text: itemMap === EGender.MALE ? 'Nam' : 'Nữ'
              }
            })}
            // errorText="Không được để trống"
            value={insuranceData.gender}
          />
        </Box>
        <Box className="mt-2">
          <CustomDatePickerV2
            onChange={(e, e1) => {
              const selectedDate = moment(e1, DEFAULT_FORMAT_DATE).toISOString();
              setInsuranceData((insurance) => ({
                ...insurance,
                birthday: selectedDate,
              }));
            }}
            label="Ngày sinh (*)"
            value={(insuranceData.birthday)}
          />
        </Box>
      </Box>
      <Footer
        loadingFeeDetails={loadingFeeDetails}
        feeDetails={feeDetails}
        handlePrev={() => {
          setcurrentStep((step) => Math.max(0, step - 1));
        }}
        handleNext={() => {
          setactiveValidate(true);
          setTimeout(() => setactiveValidate(false), 1000);

          if (
            composeValidator([isEmailValid], true, insuranceData.email)
              .status === "error"
          )
            return;
          if (
            composeValidator(
              [isIdentityCardNumValid],
              true,
              insuranceData.identityCardNum
            ).status === "error"
          )
            return;
          if (
            Object.values(
              pick(insuranceData, [
                "userAddress",
                "userName",
                "identityCardNum",
              ])
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

export default FillBasicInfoStep;
