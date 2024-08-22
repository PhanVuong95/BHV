import React, { useState } from "react";

import {
  ICreateHealthInsuranceParams,
  IInsuranceFeeDetails,
} from "../../../../interfaces/insurance";
import { IVoucher } from "../../../../services/referrer";
import FirstStepFillData from "./FirstStepFillData";
import FillBasicInfoStep from "./FillBasicInfoStep";
import CustomFillDataStep from "./CustomFillDataStep";
import FlexBox from "../../../common/FlexBox";
import { Spinner } from "zmp-ui";

export const HealthInsuranceFormFillDataStep = ({
  insuranceData,
  setInsuranceData = () => { },
  setStep = () => { },
  feeDetails,
  loadingFeeDetails,
  availableVouchers,
  step,
}: {
  insuranceData: ICreateHealthInsuranceParams;
  setInsuranceData?: React.Dispatch<
    React.SetStateAction<ICreateHealthInsuranceParams>
  >;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  feeDetails: IInsuranceFeeDetails;
  loadingFeeDetails: boolean;
  availableVouchers: IVoucher[];
  step: number;
}) => {
  const [activeValidate, setActiveValidate] = useState<boolean>(false);
  const [currentStep, setcurrentStep] = useState(0);
  const [buyForSelf, setbuyForSelf] = useState<boolean>(false);
  const [editPersonNum, seteditPersonNum] = useState(0);

  if (!feeDetails?.fee)
    return (
      <FlexBox className="items-center justify-center">
        <Spinner />
      </FlexBox>
    );

  if (currentStep === 0) {
    return (
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
        buyForSelf={buyForSelf}
        setbuyForSelf={setbuyForSelf}
      />
    );
  }

  if (currentStep === 1)
    return (
      <>
        {
          editPersonNum === 0 && <FillBasicInfoStep
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
            buyForSelf={buyForSelf}
          />
        }

        <CustomFillDataStep
          editPersonNum={editPersonNum}
          seteditPersonNum={seteditPersonNum}
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
          buyForSelf={buyForSelf}
        /></>

    );

  return (
    <></>
  );
};
