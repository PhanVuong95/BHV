import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon, Text, DatePicker, Box, Select, List, Modal, Checkbox } from "zmp-ui";
import LayoutHeader from "../../layouts/LayoutHeader";
import CollapseWrap from "../../common/Collapse";
import FlexBox from "../../common/FlexBox";
import VoluntaryFooter from "./VoluntaryFooter";
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import { EGender } from "../../../enums";
import RegisterInsuranceStep from "../../views/insurance/RegisterInsuranceStep";
import NextForm from "../../views/social-insurance/NextForm";
const { Option } = Select;
const { Item } = List;
import { pick } from "lodash";
import {
  composeValidator,
  isEmpty,
  isGTE,
  isLTE,
  isStartDateValid,
} from "../../../helpers/validator";
import moment from "moment";
import { ICreateStudentAttachedPerson, ICreateBHXHInsuranceParams, ICreateBHXHAttachedPerson } from "../../../interfaces/insurance";
import { openUrlInWebview } from "../../../services/zalo";
import { useToasts } from "react-toast-notifications";



type Props = {
 
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  insuranceData: ICreateBHXHInsuranceParams;
  setInsuranceData?: React.Dispatch<
    React.SetStateAction<ICreateBHXHInsuranceParams>
  >;
  
  step:number;
  currentStep: number;
  setcurrentStep: React.Dispatch<React.SetStateAction<number>>;
  activeValidate: boolean;
  setactiveValidate: React.Dispatch<React.SetStateAction<boolean>>;
};

const NextFillData = (props: Props) => {
  const [editPersonNum, seteditPersonNum] = useState(0);
  const { addToast } = useToasts();
  const {
    step,
    setStep = () => { },
    insuranceData,
    setInsuranceData = () => {},
    currentStep,
    setcurrentStep,
    setactiveValidate,
  } = props;

 
  const handleSetAttachedPersonInfo = (
    key: keyof ICreateBHXHAttachedPerson,
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
  const navigate = useNavigate();
  const [activeValidate, setActiveValidate] = useState<boolean>(false);

  function setaccept(checked: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
    
    <RegisterInsuranceStep step={step as any} />

    <Box className="mt-4 p-4 bg-white">
        {/* <Text className="font-semibold py-4">Danh sách người tham gia:</Text> */}
        <List>
          {insuranceData?.attachedList?.map((item, index) => (
            <Item
              key={item.fullName + index}
              onClick={() => {
                seteditPersonNum(index + 1);
              }}
              title={item.fullName || `Người nhận bảo hiểm ${index + 1}`}
              suffix={<Icon icon="zi-chevron-right" />}
              subTitle={
                (
                  <Text className="text-xs">
                    {!item.fullName ||
                    !item.gender ||
                    !item.address ||
                    !item.birthday ? (
                      <span className="text-red-500">
                        Cần bổ sung thông tin
                      </span>
                    ) : (
                      Object.values(
                        pick(item, ["address", "identityCardNum"])
                      ).join(" - ")
                    )}
                  </Text>
                ) as any
              }
            />
          ))}
        </List>
      </Box>
      {editPersonNum > 0 && (
        <Modal
          visible={editPersonNum > 0}
          onClose={() => seteditPersonNum(0)}
          actions={[
            {
              text: "Xong",
              close: true,
            },
          ]}
        >
          <Box className="bg-white">
            <Text.Title className="font-semibold text-lg leading-6 pb-4 mb-4 border-b">
              Thông tin người được bảo hiểm {editPersonNum}
            </Text.Title>

            <CustomInput
              label={(<Text className="text-sm"> Họ tên (*)</Text>) as any}
              type="text"
              placeholder="Nguyễn Văn A"
              className="text-base mt-2 block"
              required
              defaultValue={
                insuranceData.attachedList[editPersonNum - 1].fullName
              }
              onChange={(e) =>
                handleSetAttachedPersonInfo("fullName", e.target.value)
              }
            />

            <Box className="mt-2">
              <Select
                closeOnSelect
                label={
                  (<Text className="text-sm"> Giới tính (*) </Text>) as any
                }
                placeholder="Giới tính"
                value={insuranceData.attachedList[editPersonNum - 1].gender}
                onChange={(value) =>
                  handleSetAttachedPersonInfo("gender", value)
                }
                className="text-base mt-2 block"
              >
                {Object.values(EGender).map((gender) => (
                  <Option
                    value={gender}
                    title={gender === EGender.MALE ? "NAM" : "NỮ"}
                  />
                ))}
              </Select>
            </Box>

            <Box className="mt-2">
              <DatePicker
                label={
                  (<Text className="text-sm"> Ngày sinh (*) </Text>) as any
                }
                placeholder="Placeholder"
                mask
                maskClosable
                dateFormat="dd/mm/yyyy"
                title="Ngày sinh"
                defaultValue={
                  new Date(
                    insuranceData.attachedList[editPersonNum - 1].birthday
                  )
                }
                onChange={(value) => {
                  handleSetAttachedPersonInfo("birthday", new Date(value));
                }}
              />
            </Box>


            <CustomInput
              type="text"
              label={(<Text className="text-sm"> Đối tượng</Text>) as any}
              placeholder="Hộ nghèo"
              className="text-base mt-2 block"
              required
              defaultValue={
                insuranceData.attachedList[editPersonNum - 1].identityCardNum
              }
              onChange={(e) =>
                handleSetAttachedPersonInfo(
                  "identityCardNum",
                  e.target.value.replace(/[^\d]/g, "")
                )
              }
            />


            <CustomInput
              type="text"
              label={(<Text className="text-sm"> Số CMND/CCCD</Text>) as any}
              placeholder="Số CMND/CCCD 9 hoặc 12 số"
              className="text-base mt-2 block"
              required
              defaultValue={
                insuranceData.attachedList[editPersonNum - 1].identityCardNum
              }
              onChange={(e) =>
                handleSetAttachedPersonInfo(
                  "identityCardNum",
                  e.target.value.replace(/[^\d]/g, "")
                )
              }
            />

            <CustomInput
              label={
                (
                  <Text className="text-sm"> Tỉnh/thành phố (*)</Text>
                ) as any
              }
              type="text"
              placeholder="TP. Hồ Chí Minh"
              className="text-base mt-2 block"
              required
              defaultValue={
                insuranceData.attachedList[editPersonNum - 1].address
              }
              onChange={(e) =>
                handleSetAttachedPersonInfo("address", e.target.value)
              }
            />

            <CustomInput
              label={
                (
                  <Text className="text-sm"> Quận/huyện/thị xã</Text>
                ) as any
              }
              type="text"
              placeholder="Bình Tân"
              className="text-base mt-2 block"
              required
              defaultValue={
                insuranceData.attachedList[editPersonNum - 1].address
              }
              onChange={(e) =>
                handleSetAttachedPersonInfo("address", e.target.value)
              }
            />

            <CustomInput
              label={
                (
                  <Text className="text-sm"> Số nhà - tên đường</Text>
                ) as any
              }
              type="text"
              placeholder="123A - đường XYZ"
              className="text-base mt-2 block"
              required
              defaultValue={
                insuranceData.attachedList[editPersonNum - 1].address
              }
              onChange={(e) =>
                handleSetAttachedPersonInfo("address", e.target.value)
              }
            />

            <CustomInput
              type="text"
              label={(<Text className="text-sm">Số BHXH</Text>) as any}
              placeholder="102938476272103"
              className="text-base mt-2 block"
              required
              onChange={(e) =>
                handleSetAttachedPersonInfo("idinsurance", e.target.value)
              }
            />

      {/* <div className="rounded-lg pt-4">
          <CustomInput
            label={
              (<Text className="zaui-text-title">Mức lương làm căn cứ đóng</Text>) as any
            }
            type="text"
            placeholder="Mức lương làm căn cứ đóng"
            className="text-base mt-2 block"
            required
            value={insuranceData.customerPrice || ""}
            onChange={(e) => setInsuranceData((insurance) => ({
              ...insurance,
              customerPrice: String(e.target.value),
            }))
            }
            errorText={
              composeValidator(
                [isEmpty, isLTE, isGTE],
                activeValidate,
                insuranceData.customerPrice,
              ).message
            }
            status={
              insuranceData
                ? composeValidator(
                  [isEmpty, isLTE, isGTE],
                  activeValidate,
                  insuranceData.customerPrice,
                ).status
                : "error"
            }
            suffix={(<Text className="pr-2">đ</Text>) as any}
          />
          <FlexBox className="text-gray-500 items-center pt-2">
            <Icon icon="zi-info-circle-solid" size={16} />
            <Text className="pl-2 text-xs">Từ 1,800,000 vnđ đến 36,000,000 vnđ</Text>
          </FlexBox>
        </div> */}

            

            
          </Box>
        </Modal>
      )}
      
    </>
    
  );
  
};

export default NextFillData;
function setInsuranceData(arg0: (data: any) => any) {
  throw new Error("Function not implemented.");
}

