import React from "react";
import {
  ICreateExtendedAccidentAttachedPerson,
  ICreateExtendedAccidentInsuranceParams,
  IInsuranceFeeDetails,
} from "../../../../../interfaces/insurance";
import { IVoucher } from "../../../../../services/referrer";
import { Box, DatePicker, Select, Text } from "zmp-ui";
import { EGender } from "../../../../../enums";
import LayoutHeader from "../../../../layouts/LayoutHeader";
import { useToasts } from "react-toast-notifications";
import { isIdentityCardNumValid } from "../../../../../helpers/validator";
import CustomInput from "../../../../common/CustomInput";
import Footer from "../../Footer";
import CustomSelectV3 from "../../../../select/CustomSelectV3";
// import MedicalHistory from "./MedicalHistory";
// import BeneficiaryPerson from "./BeneficiaryPerson";
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
  editPersonNum: number;
  seteditPersonNum: React.Dispatch<React.SetStateAction<number>>;
};

const FillPersonDataStep = (props: Props) => {
  const { addToast } = useToasts();
  const {
    insuranceData,
    setInsuranceData = () => { },
    editPersonNum,
    seteditPersonNum,
    feeDetails,
    loadingFeeDetails,
  } = props;

  const handleSetAttachedPersonInfo = (
    key: keyof ICreateExtendedAccidentAttachedPerson,
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

  const personData = insuranceData.attachedList[editPersonNum - 1];

  return (
    <>
      <LayoutHeader
        showBackIcon={true}
        title={<Text className="text-white">Bảo hiểm tai nạn mở rộng</Text>}
        onBackClick={() => {
          seteditPersonNum(0);
        }}
      />

      {/* <MedicalHistory
        medicalHistory={personData.bicMedicalHistory}
        setMedicalHistory={(data) =>
          handleSetAttachedPersonInfo("bicMedicalHistory", data)
        }
      /> */}
      <Box className="bg-white p-4">
        <CustomInput
          label={(<Text className="text-sm"> Họ tên (*)</Text>) as any}
          type="text"
          placeholder="Nguyễn Văn A"
          className="text-base mt-2 block"
          required
          value={insuranceData.attachedList[editPersonNum - 1].fullName}
          onChange={(e) =>
            handleSetAttachedPersonInfo("fullName", e.target.value)
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
          value={insuranceData.attachedList[editPersonNum - 1].address}
          onChange={(e) =>
            handleSetAttachedPersonInfo("address", e.target.value)
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
          <DatePicker

            placeholder="Placeholder"
            mask
            maskClosable
            dateFormat="dd/mm/yyyy"
            title="Ngày sinh"
            defaultValue={
              new Date(insuranceData.attachedList[editPersonNum - 1].birthday)
            }
            onChange={(value) => {
              handleSetAttachedPersonInfo("birthday", new Date(value));
            }}
          />
        </Box>

        <div className="mt-2">
          <CustomInput
            type="text"
            label={(<Text className="text-sm"> Số CMND/CCCD (*)</Text>) as any}
            placeholder="Số CMND/CCCD 9 hoặc 12 số"
            className="text-base mt-2 block"
            required
            value={insuranceData.attachedList[editPersonNum - 1].identityCardNum}
            onChange={(e) =>
              handleSetAttachedPersonInfo(
                "identityCardNum",
                e.target.value.replace(/[^\d]/g, "")
              )
            }
          />
        </div>
      </Box>

      {/* <BeneficiaryPerson
        {...personData}
        handleUpdateBeneficiaryPersonInfo={handleSetAttachedPersonInfo}
      /> */}
      {
        editPersonNum === 0 && <Footer
          loadingFeeDetails={loadingFeeDetails}
          feeDetails={feeDetails}
          nextContent="Tiếp tục"
          handleNext={() => {
            if (!personData.fullName) {
              return addToast("Vui lòng điền họ tên", {
                appearance: "error",
                autoDismiss: true,
              });
            }
            if (!personData.address) {
              return addToast("Vui lòng điền địa chỉ", {
                appearance: "error",
                autoDismiss: true,
              });
            }
            if (
              typeof isIdentityCardNumValid(true, personData.identityCardNum) ==
              "string"
            ) {
              return addToast(
                "Số CMND/CCCD không hợp lệ. Vui lòng kiểm tra lại",
                {
                  appearance: "error",
                  autoDismiss: true,
                }
              );
            }
            seteditPersonNum(0);
          }}
          handlePrev={() => {
            seteditPersonNum(0);
          }}
        />
      }


    </>
  );
};

export default FillPersonDataStep;
