import { pick } from "lodash";
import React, { useState } from "react";

import {
  Box,
  DatePicker,
  Input,
  Select,
  Text,
  Checkbox,
  List,
  Icon,
  Modal,
} from "zmp-ui";
import { EGender } from "../../../../enums";

import { composeValidator, isEmpty } from "../../../../helpers/validator";
import {
  ICreateDomesticTravelInsuranceParams,
  ICreateTravelAttachedPerson,
  IInsuranceFeeDetails,
} from "../../../../interfaces/insurance";
import { IVoucher } from "../../../../services/referrer";
import CustomButton from "../../../common/CustomButton";
import FlexBox from "../../../common/FlexBox";
import LayoutHeader from "../../../layouts/LayoutHeader";
import RegisterInsuranceStep from "../RegisterInsuranceStep";
import { useToasts } from "react-toast-notifications";
import Footer from "../Footer";
import CustomInput from "../../../common/CustomInput";
import RegisterInsuranceStepV2 from "../AutoInsurance/RegisterInsuranceStepV2";
import CustomTitle from "../../../Title/CustomTitle";
import CustomSelectV3 from "../../../select/CustomSelectV3";
import LayoutHeaderV2 from "../../../layouts/LayoutHeaderV2";
import CEditPersonNumb from "../../../common/CEditPersonNumb";
import CEditPersonNumbutton from "../../../CEditPersonNumbutton";

const { Option } = Select;

const { Item } = List;

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
  editPersonNum: number;
  activeValidate: boolean;
  setactiveValidate: React.Dispatch<React.SetStateAction<boolean>>;
  seteditPersonNum: React.Dispatch<React.SetStateAction<number>>;
};

const CustomFillDataStep = (props: Props) => {
  const { addToast } = useToasts();
  const { editPersonNum, seteditPersonNum } = props
  // const [editPersonNum, seteditPersonNum] = useState(0);
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

  const handleSetAttachedPersonInfo = (
    key: keyof ICreateTravelAttachedPerson,
    value: any
  ) => {
    setInsuranceData((data) => ({
      ...data,
      attachedList: data.attachedList.map(
        (item, index) =>
          (index === editPersonNum - 1 && { ...item, [key]: value }) || item
      ),
    }));
  };

  return (
    <div className="pb-44" key={`currentStep_${currentStep}`}>
      {
        editPersonNum === 0 && <><LayoutHeader
          showBackIcon={true}
          title={<Text className="text-white">Bảo hiểm du lịch trong nước</Text>}
          onBackClick={() => {
            setcurrentStep((step) => Math.max(0, step - 1));
          }}
        />
          <div style={{ padding: '0px 0px 12px 0px' }}>
            <CustomTitle
              title='Hành trình'
            />
          </div>
          <CustomInput
            label={(<Text className="text-sm"> Hành trình (*)</Text>) as any}
            type="text"
            placeholder="Hà Nội - Đà Nẵng - Nha Trang - Hà Nội"
            className="text-base mt-2 block"
            required
            value={insuranceData.trip}
            onChange={(e) =>
              setInsuranceData((data) => ({ ...data, trip: e.target.value }))
            }
            errorText={
              composeValidator([isEmpty], activeValidate, insuranceData.trip)
                .message
            }
            status={
              composeValidator([isEmpty], activeValidate, insuranceData.trip)
                .status
            }
          />
          <CEditPersonNumbutton
            seteditPersonNum={seteditPersonNum}
            insuranceData={insuranceData}
          />
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
                !insuranceData.trip ||
                insuranceData.attachedList.some((item) =>
                  Object.values(
                    pick(item, [
                      "fullName",
                      "gender",
                      "birthday",
                      "address",
                      "identityCardNum",
                    ])
                  ).some(
                    (item) =>
                      composeValidator([isEmpty], true, item).status === "error"
                  )
                )
              ) {
                return addToast("Vui lòng điền đúng/đầy đủ thông tin" , {
                  appearance: "error",
                  autoDismiss: true,
                });
              }
              setactiveValidate(false);
              setStep((step) => step + 1);
            }}
          />
        </>
      }

      {editPersonNum > 0 && (
        <CEditPersonNumb
          activeValidate={activeValidate}
          editPersonNum={editPersonNum}
          handleSetAttachedPersonInfo={handleSetAttachedPersonInfo}
          insuranceData={insuranceData}
          seteditPersonNum={seteditPersonNum}
        />
      )}
    </div>
  );
};

export default CustomFillDataStep;
