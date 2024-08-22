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

import {
  composeValidator,
  isEmpty,
  isIdentityCardNumValid,
} from "../../../../helpers/validator";
import {
  ICreateStudentInsuranceParams,
  ICreateStudentAttachedPerson,
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
import CustomSelectV3 from "../../../select/CustomSelectV3";
import CEditPersonNumbutton from "../../../CEditPersonNumbutton";
import CustomDatePickerV2 from "../../../common/DatePicker/CustomDatePickerV2";
import CButtonSave from "../../../CButtonSave";

const { Option } = Select;

const { Item } = List;

type Props = {
  insuranceData: ICreateStudentInsuranceParams;
  setInsuranceData?: React.Dispatch<
    React.SetStateAction<ICreateStudentInsuranceParams>
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
  editPersonNum: number;
  seteditPersonNum: React.Dispatch<React.SetStateAction<number>>;

};

const CustomFillDataStep = (props: Props) => {
  const { addToast } = useToasts();


  const {
    insuranceData,
    setInsuranceData = () => { },
    setStep = () => { },
    feeDetails,
    loadingFeeDetails,
    step,
    currentStep,
    setcurrentStep,
    setactiveValidate,
    editPersonNum,
    seteditPersonNum,
  } = props;

  const handleSetAttachedPersonInfo = (
    key: keyof ICreateStudentAttachedPerson,
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
      {/* <RegisterInsuranceStep step={step as any} /> */}
      <>
        {editPersonNum === 0 && <> <LayoutHeader
          showBackIcon={true}
          title={<Text className="text-white">Bảo hiểm học sinh sinh viên</Text>}
          onBackClick={() => {
            setcurrentStep((step) => Math.max(0, step - 1));
          }}
        />
          <Box className="p-4 pt-0 bg-white">
            <Text className="font-semibold py-4 pb-0 pt-0">Danh sách người tham gia:</Text>
            {insuranceData.attachedList.map((item, index) => <CEditPersonNumbutton
              seteditPersonNum={seteditPersonNum}
              insuranceData={insuranceData}
            />)}
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
                    pick(item, [
                      "fullName",
                      "gender",
                      "birthday",
                      "address",
                      "schoolName",
                    ])
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

              setactiveValidate(false);

              setStep((step) => step + 1);
            }}
          /></>}
      </>

      {editPersonNum > 0 && (
        <Box className="bg-white p-4">
          {/* <Text.Title className="font-semibold text-lg leading-6 pt-4 pb-4 mb-4 border-b">
            Thông tin người được bảo hiểm {editPersonNum}
          </Text.Title> */}
          <CustomInput
            label={(<Text className="text-sm"> Họ tên (*)</Text>) as any}
            type="text"
            placeholder="Nguyễn Văn A"
            className="text-base mt-2 block"
            required
            value={
              insuranceData.attachedList[editPersonNum - 1].fullName
            }
            onChange={(e) =>
              handleSetAttachedPersonInfo("fullName", e.target.value)
            }
          />
          <CustomInput
            label={
              (
                <Text className="text-sm"> Địa chỉ thường trú (*)</Text>
              ) as any
            }
            type="text"
            placeholder="Mễ Trì Hạ, Nam Từ Liêm, Hà Nội"
            className="text-base mt-2 block"
            required
            value={
              insuranceData.attachedList[editPersonNum - 1].address
            }
            onChange={(e) =>
              handleSetAttachedPersonInfo("address", e.target.value)
            }
          />
          <CustomInput
            type="text"
            label={(<Text className="text-sm">Tên trường (*)</Text>) as any}
            placeholder="Tên trường học"
            className="text-base mt-2 block"
            required
            value={insuranceData.attachedList[editPersonNum - 1].schoolName}
            onChange={(e) =>
              handleSetAttachedPersonInfo("schoolName", e.target.value)
            }
          />
          <Box className="mt-2">
            <CustomSelectV3
              onChange={(value) =>
                handleSetAttachedPersonInfo("gender", value?.Value)
              }
              label='Giới tính'
              options={Object.values(EGender).map((itemMap) => {
                return {
                  Value: itemMap,
                  Text: itemMap === EGender.MALE ? 'Nam' : 'Nữ'
                }
              })}
              value={insuranceData.attachedList[editPersonNum - 1].gender}
            />
          </Box>
          <Box className="mt-2">
            <CustomDatePickerV2
              onChange={(e, e1) => {
                handleSetAttachedPersonInfo("birthday", new Date(e));
              }}
              label="Ngày sinh (*)"
              value={
                new Date(
                  insuranceData.attachedList[editPersonNum - 1].birthday
                )
              }
            />
          </Box>
          <CustomInput
            type="text"
            label={(<Text className="text-sm"> Số CMND/CCCD</Text>) as any}
            placeholder="Số CMND/CCCD 9 hoặc 12 số"
            className="text-base mt-2 block"
            required
            value={
              insuranceData.attachedList[editPersonNum - 1].identityCardNum
            }
            onChange={(e) =>
              handleSetAttachedPersonInfo(
                "identityCardNum",
                e.target.value.replace(/[^\d]/g, "")
              )
            }
          />
          <CButtonSave onCallback={() => seteditPersonNum(0)} />
        </Box>
      )}
    </div>
  );
};

export default CustomFillDataStep;
