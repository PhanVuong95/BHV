import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon, Text, DatePicker, Box, Select, Button } from "zmp-ui";
import LayoutHeader from "../../layouts/LayoutHeader";
import CollapseWrap from "../../common/Collapse";
import FlexBox from "../../common/FlexBox";
import VoluntaryFooter from "./VoluntaryFooter";
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import NextFillData from "./NextFillData";
import InsuranceFormConfirmStep, {
  BHXHInsuranceFormConfirmData,
} from "../../views/insurance/InsuranceFormConfirmStep";
import {
  composeValidator,
  isEmpty,
  isGTE,
  isLTE,
  isStartDateValid,
} from "../../../helpers/validator";
import moment from "moment";
import NextForm from "./NextForm";
import { ECategory, EInsuranceFeature, EInsuranceSource } from "../../../enums/insurance";
import { insuranceServicesState } from "../../../state";
import { useRecoilValue } from "recoil";
import { IAutoTypeResponse, IBHXHTypeResponse, ICategoryResponse, ICreateBHXHInsuranceParams, IInsuranceResponse } from "../../../interfaces/insurance";
import { random } from "lodash";
import useInsurance from "../insurance/useInsurance";
import RegisterInsuranceStep from "../insurance/RegisterInsuranceStep";
import { getInsuranceCategory, updateTempInsuranceRequest } from "../../../services/insurance";
import Swal from "sweetalert2";
import { openUrlInWebview } from "../../../services/zalo";
import InsurancePdf from "../../common/InsurancePdf";
import { IPaymentTransaction } from "../../../interfaces/payment";

const { Option } = Select;


type Props = {
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  insuranceData1: any;
  setInsuranceData?: React.Dispatch<
    React.SetStateAction<any>>;
  step: number;
  
};
const VoluntarySocialInsurance = (props: Props) => {
  const insuranceServicesValue = useRecoilValue(insuranceServicesState);
  const featureConfig = insuranceServicesValue.features.find(
    (item) => item.feature === EInsuranceFeature.BHXH_01
  );
  const {
    loadingFeeDetails,
    feeDetails,
    loadingInsuranceRequest,
    insuranceData,
    paymentIntent,
    availableVouchers,
  } = useInsurance<ICreateBHXHInsuranceParams>({
    defaultInsuranceData: {
      ...insuranceServicesValue.defaultBHXHData,
      source:
        featureConfig?.sources?.[
          random(0, featureConfig?.sources?.length || 0)
        ] || EInsuranceSource.DNP,
    },
    feature: EInsuranceFeature.BHXH_01,
  });
  const {
    step,
    setStep = () => { },
    insuranceData1,
    setInsuranceData = () => { },
    
  } = props;
   const navigate = useNavigate();
   const [value, setValue] = useState<ICategoryResponse[]>([]);
   const [pdfSource, setpdfSource] = useState<any>();
   const [callBackInsurance, setcallBackInsurance] = useState<{
    paymentIntent: IPaymentTransaction;
    insuranceDraft: IInsuranceResponse;
  }>();
  useEffect(() => {
    setValue([]);
    getInsuranceCategory<any>(ECategory.BHXH,{
      source : EInsuranceSource.DNP
    }).then((res) =>
    setValue(res)
    );
  }, [insuranceData.source]);
  

  const [activeValidate, setActiveValidate] = useState<boolean>(false);
  const handleCreateInsuranceRequest = async () => {
    updateTempInsuranceRequest(
      "",
      EInsuranceFeature.BHXH_01,
      {
        ...insuranceData
      } as any
    )
      .then((res) => {
        console.log(res)
        const url = res?.insuranceDraft?.createResponse;
        const callBackInsurance = res;
        if(url && res){
          setStep(4);
          setpdfSource(url);
          setcallBackInsurance(callBackInsurance)
        }
        // Swal.fire({
        //   title: "Thành công",
        //   text: "Đã lưu thông tin của bạn",
        //   icon: "success",
        //   showCancelButton: true, // Hiển thị nút Cancel
        //   cancelButtonText: "Tải xuống", // Đặt văn bản cho nút Cancel
        //   showCloseButton: true, // Hiển thị nút đóng
        // }).then((result) => {
        //   console.log(result);
        //   if(result.isDismissed){
        //     openUrlInWebview(url)
        //   }
        //   // if (result.isConfirmed) {
        //   //   openUrlInWebview(url)
        //   //     // Xử lý khi người dùng xác nhận (không cần thiết nếu bạn muốn chuyển hướng tới tệp tin)
        //   // }
        // });
        // alert("Thanh cong")
        //setStep(3);
      })
      .catch((error) => {
        console.error(error);
        // setInsuranceData((data) => ({ ...data, discountCode: "" }));
        // navigate(-1);
      })
      .finally(() => {
        console.log("Ket thuc")
      });
  };

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
      <div
        style={{
          display: step === 0 ? "block" : "none",
        }}
        className="animate-fadeIn"
      >
        <div className="rounded-lg  shadow-lg p-2 pt-4">
          <CustomInput
            label={
              (<Text className="zaui-text-title">Số người tham gia bảo hiểm</Text>) as any
            }
            type="text"
            placeholder="Số người tham gia bảo hiểm"
            className="text-base mt-2 block"
            required
            defaultValue={insuranceData.personNum || 0}
            onChange={(e) => setInsuranceData((insurance: any) => ({
              ...insurance,
              personNum: Number(e.target.value.replace(/[^\d]/g, "")),
            }))
            }
            errorText={
              composeValidator(
                [isEmpty, isLTE, isGTE],
                activeValidate,
                insuranceData.personNum,
                { min: 100 }
              ).message
            }
            status={
              insuranceData.personNum
                ? composeValidator(
                  [isEmpty, isLTE, isGTE],
                  activeValidate,
                  insuranceData.personNum,
                  { min: 100 }
                ).status
                : "error"
            }
            suffix={(<Text className="pr-2">Người</Text>) as any}
          />
          <FlexBox className="text-gray-500 items-center pt-2">
            <Icon icon="zi-info-circle-solid" size={16} />
            <Text className="pl-2 text-xs">Tối đa 100 người</Text>
          </FlexBox>
        </div>
        <Box className="shadow rounded-xl p-4">
          <Text.Title className="font-medium text-lg leading-6">
            Số tháng đóng
          </Text.Title>
       
          <Select
              closeOnSelect
              
              placeholder="Số tháng đóng"
              value={insuranceData.userIntent}
              onChange={(value) =>
                setInsuranceData((insurance: any) => ({
                  ...insurance,
                  userIntent: value ,
                  type: "",
                  vehicleLoad: 0,
                }))
              }
              className="text-base mt-2 block"
              errorText={
                composeValidator(
                  [isEmpty],
                  activeValidate,
                  insuranceData.userIntent
                ).message
              }
              status={
                composeValidator(
                  [isEmpty],
                  activeValidate,
                  insuranceData.userIntent
                ).status
              }
            >
              {value.map((category) => (
                <Option value={category.Value} title={category.Text} />
              ))}
            </Select>

       
        </Box>
        <div className="rounded-lg  shadow-lg p-2 pt-4">
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
              insuranceData.customerPrice
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
            <Text className="pl-2 text-xs">Nhập mức lương trung bình để tạm tính số tiền BH</Text>
          </FlexBox>
        </div>
        <FlexBox className="justify-between mb-2 p-2 pt-4">
          <Text.Title className="text-[#565758] text-lg">
            Mức giảm trừ
          </Text.Title>
          <Text.Title className="text-lg text-[#1E3880]">
            -236.000 ₫
          </Text.Title>
        </FlexBox>
        <Box className="shadow rounded-xl p-4">
          <Text.Title className="zaui-text-title text-lg leading-6">
            Chọn mã giảm giá
          </Text.Title>
          <Select
            closeOnSelect
            placeholder="X mã giảm giá khả dụng"
            value=""
            style={{
              ...(!availableVouchers.length && {
                pointerEvents: "none",
              }),
            }}

          >
            {(
              <option value="10">10</option>
            )}
          </Select>
          <div

          >
            <Text className="text-blue-500 pt-2 italic text-sm">{`Xem quyền lợi bảo hiểm`}</Text>
          </div>
        </Box>


        
        <VoluntaryFooter
          nextContent="Tiếp tục"
          handlePrev={() => {
            if (step > 0) setStep((step) => Math.max(0, step - 1) as any);
            else {
              navigate("/social-insurance");
            }
          } }
          handleNext={() => {
            setStep((step) => step + 1);
          } } loadingFeeDetails={false}
      />
      </div>
      
      <div
        style={{
          display: step === 1 ? "block" : "none",
        }}
        className="animate-fadeIn"
      >
        <NextForm
          insuranceData={insuranceData}
          setInsuranceData={setInsuranceData}
          setStep={setStep}
          step={step}
        />
        <VoluntaryFooter
          nextContent="Tiếp tục"
          handlePrev={() => {
            if (step > 0) setStep((step) => Math.max(0, step - 1) as any);
            else {
              navigate("/social-insurance");
            }
          } }
          handleNext={() => {
            setStep((step) => step + 1);
          } } loadingFeeDetails={false}
      />
      </div>
      <div
        style={{
          display: step === 2 ? "block" : "none",
        }}
        className="animate-fadeIn"
      >
        <NextFillData
          insuranceData={insuranceData}
          setInsuranceData={setInsuranceData}
          setStep={setStep}
          step={step}
        />
        <VoluntaryFooter
          nextContent="Tiếp tục"
          handlePrev={() => {
            if (step > 0) setStep((step) => Math.max(0, step - 1) as any);
            else {
              navigate("/social-insurance");
            }
          } }
          handleNext={() => {
            setStep((step) => step + 1);
          } } loadingFeeDetails={false}
      />
      </div>
      {step === 3 && (
          <>
      

          <RegisterInsuranceStep step={2} />
            <BHXHInsuranceFormConfirmData insuranceData={insuranceData} />
           
            <InsuranceFormConfirmStep
              source={insuranceData.source}
              feeDetails={feeDetails}
              loadingFeeDetails={loadingFeeDetails}
              loadingInsuranceRequest={loadingInsuranceRequest}
              handleCreateInsuranceRequest={handleCreateInsuranceRequest}
              setStep={setStep}
              feature={EInsuranceFeature.BHXH_01}
            />
          </>
        )}

        {step === 4 && (pdfSource && callBackInsurance && (
            <>
              <InsurancePdf
                src={pdfSource}
                transactionId={callBackInsurance?.insuranceDraft?.transactionId}
                maxHeight="calc(100vh - 190px)"
              />

              <FlexBox className="fixed bottom-0 left-0 z-10 w-full justify-around p-4 border-t bg-white">
                <div
                  className="bg-cyan-500 items-center flex text-white pl-4 pr-4 pt-1 pb-1"
                  style={{ borderRadius: 20, width: "max-content" }}
                  onClick={() => openUrlInWebview(pdfSource)}
                >
                  <Icon icon="zi-download" />
                  <Text className="pl-1">Tải xuống</Text>
                </div>

                <div
                  className="items-center flex pl-4 pr-4 pt-1 pb-1 border"
                  style={{ borderRadius: 20, width: "max-content" }}
                  onClick={() => setpdfSource("")}
                >
                  <Icon icon="zi-close" />
                  <Text className="pl-1">Đóng</Text>
                </div>
              </FlexBox>
            </>
          ))}
    </>
  );
};

export default VoluntarySocialInsurance;
function setModalVisible(arg0: boolean) {
  throw new Error("Function not implemented.");
}

