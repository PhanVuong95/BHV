import React from "react";
import { IVoucher } from "../../../../services/referrer";
import {
  ICreateHealthInsuranceParams,
  IInsuranceFeeDetails,
} from "../../../../interfaces/insurance";
import { Text } from "zmp-ui";
import FlexBox from "../../../common/FlexBox";
import CustomButton from "../../../common/CustomButton";
import LayoutHeader from "../../../layouts/LayoutHeader";

type Props = {
  insuranceData: ICreateHealthInsuranceParams;
  setInsuranceData?: React.Dispatch<
    React.SetStateAction<ICreateHealthInsuranceParams>
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

const QuestionStep = (props: Props) => {
  const {
    insuranceData,
    setInsuranceData = () => {},
    setStep = () => {},
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
      <LayoutHeader
        showBackIcon={true}
        title={<Text className="text-white">Bảo hiểm sức khoẻ</Text>}
        onBackClick={() => {
          setcurrentStep((step) => Math.max(0, step - 1) as any);
        }}
      />
      <div
        className="p-4 fixed bottom-0 w-full bg-white"
        style={{
          boxShadow: "-10px 0px 10px #E2E8F0",
        }}
      >
        <FlexBox className="justify-between ">
          <CustomButton
            content="Quay lại"
            className="p-2 pl-8 pr-8 bg-white text-gray-800 border"
            onClick={() => {
              setcurrentStep((step) => step - 1);
            }}
          />
          <CustomButton
            content="Tiếp tục"
            className="bg-blue-700 p-2 pl-8 pr-8"
            onClick={() => {
              setactiveValidate(true);
              setTimeout(() => setactiveValidate(false), 1000);
              if (!insuranceData[insuranceData.source].package) return;
              setactiveValidate(false);
              setcurrentStep((step) => step + 1);
            }}
          />
        </FlexBox>
      </div>
    </div>
  );
};

export default QuestionStep;
