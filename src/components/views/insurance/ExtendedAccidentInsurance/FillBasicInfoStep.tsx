import { pick } from "lodash";
import React from "react";
import { Box, DatePicker, Input, Select, Text } from "zmp-ui";
import { EGender } from "../../../../enums";
import {
  composeValidator,
  isEmailValid,
  isEmpty,
  isIdentityCardNumValid,
} from "../../../../helpers/validator";
import {
  ICreateExtendedAccidentInsuranceParams,
  IInsuranceFeeDetails,
} from "../../../../interfaces/insurance";
import { IVoucher } from "../../../../services/referrer";
import FlexBox from "../../../common/FlexBox";
import LayoutHeader from "../../../layouts/LayoutHeader";
import RegisterInsuranceStep from "../RegisterInsuranceStep";
import Footer from "../Footer";
import CustomInput from "../../../common/CustomInput";
import { useToasts } from "react-toast-notifications";
import CustomValidatePhone from "../../../CustomValidatePhone";
import CustomValidateEmail from "../../../CustomValidateEmail";
import CustomValidateIdCard from "../CustomValidateIdCard";
import RegisterInsuranceStepV2 from "../AutoInsurance/RegisterInsuranceStepV2";
import CustomSelectV3 from "../../../select/CustomSelectV3";
import CustomSelectGender from "../../../select/CustomSelectGender";
import InfomationContact from "../../../common/Contact/InfomationContact";
import CustomTitle from "../../../Title/CustomTitle";
import CustomDatePickerV2 from "../../../common/DatePicker/CustomDatePickerV2";
import moment from "moment";
import { DEFAULT_FORMAT_DATE } from "../AutoInsurance/AutoInsuranceFormFillDataStep";

const { Option } = Select;

type Props = {
  insuranceData: ICreateExtendedAccidentInsuranceParams;
  setInsuranceData?: React.Dispatch<
    React.SetStateAction<ICreateExtendedAccidentInsuranceParams>
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

  const { addToast } = useToasts();

  return (
    <div className="pb-44" key={`currentStep_${currentStep}`}>
      <RegisterInsuranceStepV2 step={step as any} />
      <LayoutHeader
        showBackIcon={true}
        title={<Text className="text-white">Bảo hiểm tai nạn mở rộng</Text>}
        onBackClick={() => {
          setcurrentStep((step) => Math.max(0, step - 1) as any);
        }}
      />

      <Box className="p-4 bg-white">
        <CustomTitle title='Thông tin người mua bảo hiểm' className="pb-4" />
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
          <CustomSelectGender
            setInsuranceData={setInsuranceData}
            insuranceData={insuranceData}
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
            composeValidator([isEmailValid, isEmpty], true, insuranceData.email)
              .status === "error"
          )
            return;
          // const emailValidator = composeValidator(
          //   [isEmpty, isEmailValid],
          //   true,
          //   insuranceData.email
          // );

          // if (emailValidator.status === "error")
          //   return addToast(emailValidator.message, {
          //     appearance: "error",
          //     autoDismiss: true,
          //   });

          const identifyCardNumValidator = composeValidator(
            [isIdentityCardNumValid],
            true,
            insuranceData.identityCardNum
          );
          if (identifyCardNumValidator.status === "error")
            return addToast(identifyCardNumValidator.message, {
              appearance: "error",
              autoDismiss: true,
            });

          for (const item of Object.values(
            pick(insuranceData, ["userAddress", "userName", "identityCardNum"])
          )) {
            const emptyValidator = composeValidator([isEmpty], true, item);

            if (emptyValidator.status === "error") {
              return addToast(item + " " + emptyValidator.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
          }
          setactiveValidate(false);
          setcurrentStep((step) => step + 1);
        }}
      />
    </div>
  );
};

export default FillBasicInfoStep;
