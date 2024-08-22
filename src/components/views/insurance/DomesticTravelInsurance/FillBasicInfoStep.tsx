import { pick } from "lodash";
import React from "react";

import { Box, DatePicker, Select, Text } from "zmp-ui";
import { EGender } from "../../../../enums";

import {
  composeValidator,
  isEmailValid,
  isEmpty,
  isIdentityCardNumValid,
  isValidPhoneNumber,
} from "../../../../helpers/validator";
import {
  ICreateDomesticTravelInsuranceParams,
  IInsuranceFeeDetails,
} from "../../../../interfaces/insurance";
import { IVoucher } from "../../../../services/referrer";
import LayoutHeader from "../../../layouts/LayoutHeader";
import Footer from "../Footer";
import CustomInput from "../../../common/CustomInput";
import CustomValidatePhone from "../../../CustomValidatePhone";
import CustomValidateEmail from "../../../CustomValidateEmail";
import CustomValidateIdCard from "../CustomValidateIdCard";
import RegisterInsuranceStepV2 from "../AutoInsurance/RegisterInsuranceStepV2";
import CustomTitle from "../../../Title/CustomTitle";
import CustomSelectV3 from "../../../select/CustomSelectV3";
import InfomationContact from "../../../common/Contact/InfomationContact";
import CustomDatePickerV2 from "../../../common/DatePicker/CustomDatePickerV2";
import moment from "moment";
import { DEFAULT_FORMAT_DATE } from "../AutoInsurance/AutoInsuranceFormFillDataStep";

const { Option } = Select;

type Props = {
  insuranceData: ICreateDomesticTravelInsuranceParams;
  setInsuranceData?: React.Dispatch<
    React.SetStateAction<ICreateDomesticTravelInsuranceParams>
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
      {/* <RegisterInsuranceStep step={step as any} /> */}
      <LayoutHeader
        showBackIcon={true}
        title={<Text className="text-white">Bảo hiểm du lịch trong nước</Text>}
        onBackClick={() => {
          setcurrentStep((step) => Math.max(0, step - 1) as any);
        }}
      />
      <RegisterInsuranceStepV2 step={2} />
      <div style={{ padding: '12px 18px 0px 18px' }}>
        <CustomTitle
          title='Thông tin bảo hiểm'
        />
      </div>
      <Box className="p-4 bg-white">
        <CustomInput
          label={(<Text className="text-sm"> Tên người mua (*)</Text>) as any}
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

      <Box className="p-4 pt-0 pb-0">
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
