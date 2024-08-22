import { pick } from "lodash";
import React from "react";

import { Box, DatePicker, Input, Select, Text, Checkbox } from "zmp-ui";
import { EGender } from "../../../../enums";

import {
  composeValidator,
  isEmailValid,
  isEmpty,
  isIdentityCardNumValid,
  isValidPhoneNumber,
} from "../../../../helpers/validator";
import {
  ICreateOverseaTravelInsuranceParams,
  IInsuranceFeeDetails,
} from "../../../../interfaces/insurance";
import { IVoucher } from "../../../../services/referrer";
import CustomButton from "../../../common/CustomButton";
import FlexBox from "../../../common/FlexBox";
import LayoutHeader from "../../../layouts/LayoutHeader";
import RegisterInsuranceStep from "../RegisterInsuranceStep";
import Footer from "../Footer";
import CustomInput from "../../../common/CustomInput";
import CustomValidatePhone from "../../../CustomValidatePhone";
import CustomValidateEmail from "../../../CustomValidateEmail";
import CustomValidateIdCard from "../CustomValidateIdCard";
import InfomationContact from "../../../common/Contact/InfomationContact";
import CustomSelectV3 from "../../../select/CustomSelectV3";
import CustomTitle from "../../../Title/CustomTitle";
import RegisterInsuranceStepV2 from "../AutoInsurance/RegisterInsuranceStepV2";
import CustomDatePickerV2 from "../../../common/DatePicker/CustomDatePickerV2";
import { DEFAULT_FORMAT_DATE } from "../AutoInsurance/AutoInsuranceFormFillDataStep";
import moment from "moment";

const { Option } = Select;

type Props = {
  insuranceData: ICreateOverseaTravelInsuranceParams;
  setInsuranceData?: React.Dispatch<
    React.SetStateAction<ICreateOverseaTravelInsuranceParams>
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
    setStep = () => { },
    feeDetails,
    loadingFeeDetails,
    availableVouchers,
    step,
    currentStep,
    setcurrentStep,
    activeValidate,
    setactiveValidate,
  } = props;

  return (
    <div key={`currentStep_${currentStep}`}>
      <RegisterInsuranceStepV2 step={1} />
      <LayoutHeader
        showBackIcon={true}
        title={<Text className="text-white">Bảo hiểm du lịch quốc tế</Text>}
        onBackClick={() => {
          setcurrentStep((step) => Math.max(0, step - 1) as any);
        }}
      />
      <Box className="p-4 bg-white">
        <CustomTitle
          title='Thông tin bảo hiểm'
        />
        <div className="mb-4"></div>
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
        <CustomValidateIdCard
          activeValidate={activeValidate}
          insuranceData={insuranceData}
          setInsuranceData={setInsuranceData}
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
      <div className="p-4 pt-0">
        <InfomationContact />
        <CustomValidatePhone
          activeValidate={activeValidate}
          insuranceData={insuranceData}
          setInsuranceData={setInsuranceData}
        />
        <CustomValidateEmail
          activeValidate={activeValidate}
          insuranceData={insuranceData}
          setInsuranceData={setInsuranceData}
        />
      </div>
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
            composeValidator([isValidPhoneNumber, isEmpty], true, insuranceData.phone)
              .status === "error"
          )
            return;
          if (
            composeValidator([isEmailValid, isEmpty], true, insuranceData.email)
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
