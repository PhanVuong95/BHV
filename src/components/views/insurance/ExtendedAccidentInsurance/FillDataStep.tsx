import React, { useState } from "react";

import {
  ICreateExtendedAccidentInsuranceParams,
  IInsuranceFeeDetails,
} from "../../../../interfaces/insurance";
import { IVoucher } from "../../../../services/referrer";
import FirstStepFillData from "./FirstStepFillData";
import FillBasicInfoStep from "./FillBasicInfoStep";
import CustomFillDataStep from "./CustomFillDataStep";
import FlexBox from "../../../common/FlexBox";
import { Spinner } from "zmp-ui";
import RegisterInsuranceStepV2 from "../AutoInsurance/RegisterInsuranceStepV2";

export const ExtendedAccidentInsuranceFormFillDataStep = ({
  insuranceData,
  setInsuranceData = () => {},
  setStep = () => {},
  feeDetails,
  loadingFeeDetails,
  availableVouchers,
  step,
}: {
  insuranceData: ICreateExtendedAccidentInsuranceParams;
  setInsuranceData?: React.Dispatch<
    React.SetStateAction<ICreateExtendedAccidentInsuranceParams>
  >;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  feeDetails: IInsuranceFeeDetails;
  loadingFeeDetails: boolean;
  availableVouchers: IVoucher[];
  step: number;
}) => {
  const [activeValidate, setActiveValidate] = useState<boolean>(false);
  const [currentStep, setcurrentStep] = useState(0);

  if (!feeDetails?.fee)
    return (
      <FlexBox className="items-center justify-center">
        <Spinner />
      </FlexBox>
    );

  if (currentStep === 0) {
    return (
     <>
     <RegisterInsuranceStepV2 step={1} />
      <FirstStepFillData
        feeDetails={feeDetails}
        loadingFeeDetails={loadingFeeDetails}
        availableVouchers={availableVouchers}
        insuranceData={insuranceData}
        setInsuranceData={setInsuranceData}
        setStep={setStep}
        step={step}
        currentStep={currentStep}
        setcurrentStep={setcurrentStep}
        activeValidate={activeValidate}
        setactiveValidate={setActiveValidate}
      /></>

    );
  }

  if (currentStep === 1)
    return (
     <>
      <FillBasicInfoStep
        feeDetails={feeDetails}
        loadingFeeDetails={loadingFeeDetails}
        availableVouchers={availableVouchers}
        insuranceData={insuranceData}
        setInsuranceData={setInsuranceData}
        setStep={setStep}
        step={step}
        currentStep={currentStep}
        setcurrentStep={setcurrentStep}
        activeValidate={activeValidate}
        setactiveValidate={setActiveValidate}
      />
     </>
    );

  return (
    <>
    <CustomFillDataStep
      feeDetails={feeDetails}
      loadingFeeDetails={loadingFeeDetails}
      availableVouchers={availableVouchers}
      insuranceData={insuranceData}
      setInsuranceData={setInsuranceData}
      setStep={setStep}
      step={step}
      currentStep={currentStep}
      setcurrentStep={setcurrentStep}
      activeValidate={activeValidate}
      setactiveValidate={setActiveValidate}
    />
    </>
  );
};
