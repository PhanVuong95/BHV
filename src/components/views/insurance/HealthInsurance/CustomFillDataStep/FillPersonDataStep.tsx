import React, { useState } from "react";
import {
  ICreateHealthAttachedPerson,
  ICreateHealthInsuranceParams,
  IInsuranceFeeDetails,
} from "../../../../../interfaces/insurance";
import { IVoucher } from "../../../../../services/referrer";
import { Box, DatePicker, Select, Text } from "zmp-ui";
import { EGender } from "../../../../../enums";
import LayoutHeader from "../../../../layouts/LayoutHeader";
import { useToasts } from "react-toast-notifications";
import { isIdentityCardNumValid } from "../../../../../helpers/validator";
import BICMedicalHistory from "./BICMedicalHistory";
import {
  EBICHealthPackageValue,
  EInsuranceSource,
  MICHealthTypeValue,
  VBIHealthPackageValue,
} from "../../../../../enums/insurance";
import BICAdditionalBenefits from "./BICAdditionalBenefits";
import CustomInput from "../../../../common/CustomInput";
import Footer from "../../Footer";
import MicMedicalHistory from "./MicMedicalHistory";
import MICAdditionalBenefits from "./MICAdditionalBenefits";
import MICVTSKAdditionalBenefits from "./MICVTKSAdditionalBenefits";
import MicVTSKMedicalHistory from "./MicVTSKMedicalHistory";
import { data } from "zmp-dom";
import VBIAdditionalBenefits from "./VBIAdditionalBenefits";
import CustomSelectV3 from "../../../../select/CustomSelectV3";
import CustomTitle from "../../../../Title/CustomTitle";
import LayoutHeaderV2 from "../../../../layouts/LayoutHeaderV2";
import CustomDatePickerV2 from "../../../../common/DatePicker/CustomDatePickerV2";
import { DEFAULT_FORMAT_DATE } from "../../AutoInsurance/AutoInsuranceFormFillDataStep";
import moment from "moment";
// import BeneficiaryPerson from "./BeneficiaryPerson";
const { Option } = Select;

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
  editPersonNum: number;
  seteditPersonNum: React.Dispatch<React.SetStateAction<number>>;
  buyForSelf: boolean;
};

const FillPersonDataStep = (props: Props) => {
  const { addToast } = useToasts();
  const {
    insuranceData,
    setInsuranceData = () => { },
    editPersonNum,
    seteditPersonNum,
    loadingFeeDetails,
    feeDetails,
    buyForSelf,
  } = props;

  const [currentStep, setcurrentStep] = useState(0);

  const handleSetAttachedPersonInfo = (
    key: keyof ICreateHealthAttachedPerson,
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
      <LayoutHeaderV2
        showBackIcon={true}
        title={<Text className="text-white">Thông tin người nhận bảo hiểm</Text>}
        onBackClick={() => {
          seteditPersonNum(0);
        }}
      />
       {
        insuranceData.source == EInsuranceSource.BIC && <div style={{padding:'0px 12px'}}>
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
          <Box className="mt-2">
            <CustomSelectV3
              onChange={(value) =>
                setInsuranceData((insurance) => ({
                  ...insurance,
                  gender: value?.Value as EGender,
                }))
              }
              label='Giới tính'
              options={Object.values(EGender).map((itemMap) => {
                return {
                  Value: itemMap,
                  Text: itemMap === EGender.MALE ? 'Nam' : 'Nữ'
                }
              })}
              value={insuranceData.gender}
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
          <Box className="mt-2">
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
          </Box>
        </div>
      }
      {(!currentStep &&
        (insuranceData.source === EInsuranceSource.BIC ? (
          <BICMedicalHistory
            medicalHistory={personData.bicMedicalHistory}
            setMedicalHistory={(data) =>
              handleSetAttachedPersonInfo("bicMedicalHistory", data)
            }
          />
        ) : insuranceData.source ===
          EInsuranceSource.VBI ? null : insuranceData[EInsuranceSource.MIC]
            .type == MICHealthTypeValue.TYPE_01 ? (
          <MicMedicalHistory
            medicalHistory={personData.micMedicalHistory}
            setMedicalHistory={(data) =>
              handleSetAttachedPersonInfo("micMedicalHistory", data)
            }
          />
        ) : (
          <MicVTSKMedicalHistory
            medicalHistory={personData.micVTSKMedicalHistory}
            setMedicalHistory={(data) =>
              handleSetAttachedPersonInfo("micVTSKMedicalHistory", data)
            }
          />
        ))) || (
          <Box className="bg-white p-4" style={{ height: "calc(100vh + 200px)" }}>
            {!(insuranceData.source != EInsuranceSource.BIC && buyForSelf) && (
              <></>
            )}

            {insuranceData.source === EInsuranceSource.BIC &&
              ![EBICHealthPackageValue.BASIC].includes(
                insuranceData[insuranceData.source].package
              ) && (
                <BICAdditionalBenefits
                  {...personData}
                  handleUpdateBeneficiaryPersonInfo={handleSetAttachedPersonInfo}
                />
              )}
            {insuranceData.source === EInsuranceSource.VBI && (
              <VBIAdditionalBenefits
                onCallback={() => {
                  seteditPersonNum(0)
                }}
                vbiPackage={insuranceData[EInsuranceSource.VBI].package}
                {...personData}
                handleUpdateBeneficiaryPersonInfo={handleSetAttachedPersonInfo}
              />
            )}
            {insuranceData.source === EInsuranceSource.MIC ? (
              insuranceData[EInsuranceSource.MIC].type ==
                MICHealthTypeValue.TYPE_01 ? (
                <MICAdditionalBenefits
                  {...personData}
                  handleUpdateBeneficiaryPersonInfo={handleSetAttachedPersonInfo}
                  micPackage={insuranceData[EInsuranceSource.MIC].package}
                />
              ) : (
                <MICVTSKAdditionalBenefits
                  {...personData}
                  handleUpdateBeneficiaryPersonInfo={handleSetAttachedPersonInfo}
                />
              )
            ) : null}
          </Box>
        )}

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
            if (buyForSelf) {
              setInsuranceData((data) => ({
                ...data,
                attachedList: data.attachedList.map(
                  (item, index) =>
                    (index === 0 && {
                      ...item,
                      fullName: insuranceData.userName,
                      gender: insuranceData.gender,
                      birthday: insuranceData.birthday,
                      address: insuranceData.userAddress,
                      identityCardNum: insuranceData.identityCardNum,
                      phone: insuranceData.phone,
                    }) ||
                    item
                ),
              }));
            }
            if (!currentStep) {
              return setcurrentStep((step) => step + 1);
            }

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
            if (!currentStep) {
              seteditPersonNum(0);
            } else {
              return setcurrentStep((step) => step - 1);
            }
          }}
        />
      }
    </>
  );
};

export default FillPersonDataStep;
