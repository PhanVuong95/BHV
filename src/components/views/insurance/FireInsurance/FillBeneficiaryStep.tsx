import React from "react";
import {
  ICreateFireInsuranceParams,
  IInsuranceFeeDetails,
} from "../../../../interfaces/insurance";
import { IVoucher } from "../../../../services/referrer";
import { Box, Checkbox, Input, Text } from "zmp-ui";
import RegisterInsuranceStep from "../RegisterInsuranceStep";
import LayoutHeader from "../../../layouts/LayoutHeader";
import {
  composeValidator,
  isEmailValid,
  isEmpty,
} from "../../../../helpers/validator";
import FlexBox from "../../../common/FlexBox";
import CustomButton from "../../../common/CustomButton";
import { pick } from "lodash";
import Footer from "../Footer";
import CustomInput from "../../../common/CustomInput";
import CustomValidatePhone from "../../../CustomValidatePhone";
import CustomValidateEmail from "../../../CustomValidateEmail";
import RegisterInsuranceStepV2 from "../AutoInsurance/RegisterInsuranceStepV2";
import InfomationContact from "../../../common/Contact/InfomationContact";

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

const FillBeneficiaryStep = (props: Props) => {
  const {
    insuranceData,
    setInsuranceData = () => { },
    setStep = () => { },
    currentStep,

    setcurrentStep,
    activeValidate,
    setactiveValidate,
    loadingFeeDetails,

    step,
    feeDetails,
  } = props;

  return (
    <div className="pb-44" key={`currentStep_${currentStep}`}>
      <RegisterInsuranceStepV2 step={2} />
      <LayoutHeader
        showBackIcon={true}
        title={<Text className="text-white">Bảo hiểm cháy nổ</Text>}
        onBackClick={() => {
          setcurrentStep((step) => Math.max(0, step - 1) as any);
        }}
      />
      <Box className="p-4 bg-white">
        <Text.Title className="font-semibold text-lg leading-6 pb-4">
          Thông tin người thụ hưởng
        </Text.Title>

        <CustomInput
          label={(<Text className="text-sm"> Họ tên</Text>) as any}
          type="text"
          placeholder="Nguyễn Văn A"
          className="text-base mt-2 block"
          required
          value={insuranceData.beneficiaryName}
          onChange={(e) =>
            setInsuranceData((insurance) => ({
              ...insurance,
              beneficiaryName: e.target.value,
            }))
          }
          errorText={
            composeValidator(
              [isEmpty],
              !!insuranceData.beneficiaryAddress && activeValidate,
              insuranceData.beneficiaryName
            ).message
          }
          status={
            composeValidator(
              [isEmpty],
              !!insuranceData.beneficiaryAddress && activeValidate,
              insuranceData.beneficiaryName
            ).status
          }
        />
        <CustomInput
          label={(<Text className="text-sm"> Địa chỉ thường trú</Text>) as any}
          type="text"
          placeholder="Mễ Trì Hạ, Nam Từ Liêm, Hà Nội"
          className="text-base mt-2 block"
          required
          value={insuranceData.beneficiaryAddress}
          onChange={(e) =>
            setInsuranceData((insurance) => ({
              ...insurance,
              beneficiaryAddress: e.target.value,
            }))
          }
          errorText={
            composeValidator(
              [isEmpty],
              !!insuranceData.beneficiaryName && activeValidate,
              insuranceData.beneficiaryAddress
            ).message
          }
          status={
            composeValidator(
              [isEmpty],
              !!insuranceData.beneficiaryName && activeValidate,
              insuranceData.beneficiaryAddress
            ).status
          }
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
            ((insuranceData.beneficiaryAddress ||
              insuranceData.beneficiaryName) &&
              Object.values(
                pick(insuranceData, ["beneficiaryAddress", "beneficiaryName"])
              ).every(
                (item) =>
                  composeValidator([isEmpty], true, item).status === "success"
              )) ||
            !(insuranceData.beneficiaryAddress || insuranceData.beneficiaryName)
          ) {
            setactiveValidate(false);
            setStep((step) => step + 1);
          }
        }}
      />
    </div>
  );
};

export default FillBeneficiaryStep;
