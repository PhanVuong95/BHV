import { pick } from "lodash";
import React, { useState } from "react";
import { Box, Text, List, Icon } from "zmp-ui";
import {
  composeValidator,
  isEmpty,
  isIdentityCardNumValid,
} from "../../../../../helpers/validator";
import {
  ICreateHealthInsuranceParams,
  IInsuranceFeeDetails,
} from "../../../../../interfaces/insurance";
import { IVoucher } from "../../../../../services/referrer";
import LayoutHeader from "../../../../layouts/LayoutHeader";
import RegisterInsuranceStep from "../../RegisterInsuranceStep";
import { useToasts } from "react-toast-notifications";
import FillPersonDataStep from "./FillPersonDataStep";
import Footer from "../../Footer";
import RegisterInsuranceStepV2 from "../../AutoInsurance/RegisterInsuranceStepV2";
import CustomTitle from "../../../../Title/CustomTitle";
import CEditPersonNumbutton from "../../../../CEditPersonNumbutton";
import { EInsuranceSource } from "../../../../../enums/insurance";

const { Item } = List;

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

  buyForSelf: boolean;
  editPersonNum: number;
  seteditPersonNum: React.Dispatch<React.SetStateAction<number>>;

};

const CustomFillDataStep = (props: Props) => {
  const { addToast } = useToasts();
  const { editPersonNum, seteditPersonNum } = props
  const {
    insuranceData,
    setStep = () => { },
    step,
    currentStep,
    setcurrentStep,
    setactiveValidate,
    loadingFeeDetails,
    feeDetails,
    buyForSelf
  } = props;

  if (editPersonNum) {
    return (
      <FillPersonDataStep
        {...props}
        buyForSelf={buyForSelf}
        editPersonNum={editPersonNum}
        seteditPersonNum={seteditPersonNum}
      />
    );
  }
  return (
    <div className="pb-44" key={`currentStep_${currentStep}`}>
      {/* <RegisterInsuranceStepV2 step={3} /> */}
      <LayoutHeader
        showBackIcon={true}
        title={<Text className="text-white">Bảo hiểm sức khoẻ</Text>}
        onBackClick={() => {
          setcurrentStep((step) => Math.max(0, step - 1));
        }}
      />
      <Box className=" p-4 bg-white" style={{ paddingTop: 0 }}>
        <CustomTitle
          title='Danh sách người tham gia'
        />
        <CEditPersonNumbutton insuranceData={insuranceData} seteditPersonNum={seteditPersonNum} />
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
         if((insuranceData.source == EInsuranceSource.BIC)){
          if (
            insuranceData.attachedList.some(
              (item) =>
                composeValidator(
                  [isIdentityCardNumValid],
                  true,
                  item.identityCardNum
                ).status === "error"
            ) ||
            insuranceData.attachedList.some((item) =>
              Object.values(
                pick(item, ["fullName", "gender", "birthday", "address"])
              ).some(
                (item) =>
                  composeValidator([isEmpty], true, item).status === "error"
              )
            )
          ) {
            return addToast("Vui lòng điền đúng/đầy đủ thông tin", {
              appearance: "error",
              autoDismiss: true,
            });
          }
         }

          setactiveValidate(false);

          setStep((step) => step + 1);
        }}
      />
    </div>
  );
};

export default CustomFillDataStep;
