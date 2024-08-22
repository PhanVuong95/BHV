import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon, Text, DatePicker, Box, Select } from "zmp-ui";
import LayoutHeader from "../../layouts/LayoutHeader";
import CollapseWrap from "../../common/Collapse";
import FlexBox from "../../common/FlexBox";
import VoluntaryFooter from "./VoluntaryFooter";
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import { EGender } from "../../../enums";
import RegisterInsuranceStep from "../../views/insurance/RegisterInsuranceStep";
import NextFillData from "../../views/social-insurance/NextFillData";
const { Option } = Select;
import {
  composeValidator,
  isEmailValid,
  isEmpty,
  isGTE,
  isIdentityCardNumValid,
  isLTE,
  isStartDateValid,
} from "../../../helpers/validator";
import moment from "moment";
import InfomationContact from "../../common/Contact/InfomationContact";


type Props = {
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  insuranceData: any;
  setInsuranceData?: React.Dispatch<
    React.SetStateAction<any>
  >;
  step: number;
};
const NextForm = (props: Props) => {
  const {
    step,
    setStep = () => { },
    insuranceData,
    setInsuranceData = () => { },
  } = props;
  const navigate = useNavigate();
  const [activeValidate, setActiveValidate] = useState<boolean>(false);

  return (
    <>
      <LayoutHeader
        showBackIcon={true}
        title={<Text className="text-white">BHXH Tự nguyện</Text>}
        onBackClick={() => {
          if (step > 0) setStep((step) => Math.max(0, step - 1) as any);
          else {
            navigate("/social-insurance");
          }

        }}
      />
      <div className="form-bhxh">
        <RegisterInsuranceStep step={1} />
        <Text.Title className="font-medium text-lg leading-6 p-2 pb-2">
          Thông tin người mua bảo hiểm
        </Text.Title>

        <div className="rounded-lg p-2 pt-4">
          <CustomInput
            label={
              (<Text className="zaui-text-title">Tên</Text>) as any
            }
            type="text"
            placeholder="Lê Đức Toàn"
            className="text-base mt-2 block"
            required
            value={insuranceData.userName || 0}
            onChange={(e) => setInsuranceData((insurance) => ({
              ...insurance,
              userName: Number(e.target.value.replace(/[^\d]/g, "")),
            }))
            }
            errorText={
              composeValidator(
                [isEmpty, isLTE, isGTE],
                activeValidate,
                insuranceData.userName,
                { min: 100 }
              ).message
            }
            status={
              insuranceData.userName
                ? composeValidator(
                  [isEmpty, isLTE, isGTE],
                  activeValidate,
                  insuranceData.userName,
                  { min: 100 }
                ).status
                : "error"
            }

          />
          <CustomInput
            label={
              (<Text className="text-sm"> Địa chỉ thường trú (*)</Text>) as any
            }
            type="text"
            placeholder="Địa chỉ"
            className="text-base mt-2 block"
            required
            defaultValue={insuranceData.userAddress}
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
          <CustomInput
            type="text"
            label={(<Text className="text-sm"> Số CMND/CCCD</Text>) as any}
            placeholder="Số CMND/CCCD"
            className="text-base  mt-2 block"
            required
            defaultValue={insuranceData.identityCardNum}
            onChange={(e) =>
              setInsuranceData((insurance) => ({
                ...insurance,
                identityCardNum: e.target.value.replace(/[^\d]/g, ""),
              }))
            }
            errorText={
              composeValidator(
                [isIdentityCardNumValid],
                activeValidate,
                insuranceData.identityCardNum
              ).message
            }
            status={
              composeValidator(
                [isIdentityCardNumValid],
                activeValidate,
                insuranceData.identityCardNum
              ).status
            }
          />

          <Box className="mt-2 ">
            <DatePicker
              label={(<Text className="text-sm "> Ngày sinh (*) </Text>) as any}
              placeholder="Placeholder"
              mask
              maskClosable
              dateFormat="dd/mm/yyyy"
              title="Ngày sinh"
              defaultValue={new Date(insuranceData.birthday)}
              onChange={(value) => {
                setInsuranceData((insurance) => ({
                  ...insurance,
                  birthday: new Date(value),
                }));
              }}
            />
            <FlexBox className="text-gray-500 items-center pt-2 pb-2">
              <Icon icon="zi-info-circle-solid" size={16} />
              <Text className="pl-2 text-xs">Từ đủ 18 tuổi</Text>
            </FlexBox>
          </Box>

        </div>


        <div className="rounded-lg p-2 pt-4 bg-gray-100 pb-110" style={{ margin: "0 0 84px 0", display: "block" }}>
          <InfomationContact />
          {/* <Box className="mt-2">
            <Select
              closeOnSelect
              label={(<Text className="text-sm"> Giới tính (*) </Text>) as any}
              placeholder="Giới tính"
              value={insuranceData.gender}
              onChange={(value) =>
                setInsuranceData((insurance) => ({
                  ...insurance,
                  gender: value as EGender,
                }))
              }
              className="text-base mt-2 block"
              errorText="Không được để trống"
            >
              {Object.values(EGender).map((gender) => (
                <Option
                  value={gender}
                  title={gender === EGender.MALE ? "NAM" : "NỮ"}
                />
              ))}
            </Select>
          </Box> */}



          <Box className="justify-between mt-1 bg-[#F6FEFA] text-[#22C55E]  p-3 mb-4">
            <Text className="text-sm white-space-prewrap">
              √{`   `}Đầy đủ giá trị pháp lý như chứng nhận bản cứng
            </Text>
            <Text className="text-sm white-space-prewrap">
              √{`   `}Thuận tiện xem mọi lúc mọi nơi
            </Text>
          </Box>


          <CustomInput
            label={
              (<Text className="zaui-text-title">Số điện thoại</Text>) as any
            }
            type="text"
            placeholder="033xxxxxxx"
            className="text-base mt-2 block"
            required
            onChange={(e) =>
              setInsuranceData((insurance) => ({
                ...insurance,
                phone: e.target.value.replace(/[^\d]/g, ""),
              }))
            }
            defaultValue={insuranceData.phone}
          />

          <Text className="zaui-text-title">Email</Text>
          <FlexBox>
            <CustomInput

              type="text"
              placeholder="ybaohiem@gmail.com"
              className="text-base mt-2 bg-white"
              required
              defaultValue={insuranceData.email}
              onChange={(e) =>
                setInsuranceData((insurance) => ({
                  ...insurance,
                  email: e.target.value?.trim(),
                }))
              }
              errorText={
                composeValidator(
                  [isEmailValid],
                  activeValidate,
                  insuranceData.email
                ).message
              }
              status={
                composeValidator(
                  [isEmailValid],
                  activeValidate,
                  insuranceData.email
                ).status
              }
            />
          </FlexBox>


        </div>
      </div>



    </>


  );

};

export default NextForm;
