import { pick } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { Box, Select, Text, Switch } from "zmp-ui";
import {
  ECategory,
  EInsuranceFeature,
  EInsuranceSource,
} from "../../../enums/insurance";
import {
  composeValidator,
  isEmailValid,
  isEmpty,
  isIdentityCardNumValid,
  isValidPhoneNumber,
  validateStringLengthChasisNumberMotor,
} from "../../../helpers/validator";
import useFormatter from "../../../hooks/useFormatter";
import {
  ICategoryResponse,
  ICreateMotorInsuranceParams,
  IInsuranceFeeDetails,
} from "../../../interfaces/insurance";
import { getInsuranceCategory } from "../../../services/insurance";
import { IVoucher } from "../../../services/referrer";
import { insuranceServicesState } from "../../../state";
import CollapseWrap from "../../common/Collapse";
import FlexBox from "../../common/FlexBox";
import LayoutHeader from "../../layouts/LayoutHeader";
import InsuranceFormConfirmStep, {
  MotorInsuranceFormConfirmData,
} from "./InsuranceFormConfirmStep";
import InsuranceIntro from "./InsuranceIntro";
import PaymentIntent from "./PaymentIntent";
import useInsurance from "./useInsurance";
import SelectVoucher from "./SelectVoucher";
import Footer from "./Footer";
import CustomInput from "../../common/CustomInput";
import CustomValidatePhone from "../../CustomValidatePhone";
import CustomValidateEmail from "../../CustomValidateEmail";
import CustomValidateIdCard from "./CustomValidateIdCard";
import InfomationContact from "../../common/Contact/InfomationContact";
import RegisterInsuranceStepV2 from "./AutoInsurance/RegisterInsuranceStepV2";
import CustomSelectV3 from "../../select/CustomSelectV3";
import CustomTitle from "../../Title/CustomTitle";
import CSuplier from "../../select/CSuplier";
import CustomDatePickerV2 from "../../common/DatePicker/CustomDatePickerV2";
import { DEFAULT_FORMAT_DATE } from "./AutoInsurance/AutoInsuranceFormFillDataStep";
export const ComponentRequire = () => `(*)`
export const MotorInsuranceFormFillDataStep = ({
  insuranceData,
  setInsuranceData = () => { },
  setStep = () => { },
  feeDetails,
  loadingFeeDetails,
  availableVouchers,
}: {
  insuranceData: ICreateMotorInsuranceParams;
  setInsuranceData?: React.Dispatch<
    React.SetStateAction<ICreateMotorInsuranceParams>
  >;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  feeDetails: IInsuranceFeeDetails;
  loadingFeeDetails: boolean;
  availableVouchers: IVoucher[];
}) => {
  const { fee, discount, directReferrer } = feeDetails;
  const [activeValidate, setActiveValidate] = useState<boolean>(false);
  const [currentStep, setcurrentStep] = useState(0);
  const [motorCategory, setmotorCategory] = useState<ICategoryResponse[]>([]);
  useEffect(() => {
    getInsuranceCategory(ECategory.LOAIXEMOTOR).then((res) =>
      setmotorCategory(res)
    );
  }, []);


  if (currentStep === 0) {
    return (
      <div>
        <RegisterInsuranceStepV2 step={currentStep + 1 as 1} />
        <div style={{ padding: '12px 18px 0px 18px' }}>
          <CustomTitle
            title='Nội dung bảo hiểm'
          />
        </div>
        <Box className="p-4 pb-44">
          {(
            <>
              <CSuplier
                insuranceData={insuranceData}
                setInsuranceData={setInsuranceData}
                type={EInsuranceFeature.MOTOR_01}
              />
            </>
          )}
          <CustomSelectV3
            onChange={(value) =>
              setInsuranceData((insurance) => ({
                ...insurance,
                category: value?.Value
              }))
            }
            options={motorCategory}
            value={insuranceData.category}
            label='Loại xe (*)'
          />
          <CustomSelectV3
            onChange={(e) => {
              setInsuranceData((data) => ({
                ...data,
                expiry: e?.Value,
              }))
            }}
            label='Thời hạn bảo hiểm'
            options={
              [1, 2, 3].map((itemMap) => {
                return {
                  Value: itemMap,
                  Text: `${itemMap} năm`
                }
              })
            }
            value={insuranceData.expiry}
          />
          <FlexBox className=" pb-4">
            <div className="pr-2" style={{ width: '50%' }}>
              <CustomDatePickerV2
                onChange={(e, e1) => {
                  const selectedDate = moment(e1, DEFAULT_FORMAT_DATE).toISOString();
                  setInsuranceData((insurance) => ({
                    ...insurance,
                    startDate: selectedDate,
                  }));
                }}
                label="Từ ngày"
                value={(insuranceData.startDate)}
                disabledDate={(date) => {
                  return date < moment().startOf('day');
                }}
              />
            </div>
            <div className="pl-2" style={{ pointerEvents: "none", width: '50%' }}>
              <CustomDatePickerV2
                disabled={true}
                onChange={(e, e1) => { }}
                label="Đến ngày"
                value={new Date(
                  moment(insuranceData.startDate)
                    .add(insuranceData.expiry, "years")
                    .toISOString()
                )}
              />
            </div>
          </FlexBox>
          <CustomTitle
            title='Chọn gói bảo hiểm'
          />
          <div className="shadow-lg p-4" style={{ marginTop: 12 }}>
            <FlexBox className="justify-between pt-1.5 pb-3">
              <Text.Title className="text-base fw-600">
                Tai nạn người ngồi trên xe
              </Text.Title>
              <Switch
                onChange={(e) =>
                  setInsuranceData((data) => ({
                    ...data,
                    occupantInsurance:
                      insuranceData.occupantInsurance > 0 ? 0 : 10000000,
                  }))
                }
                checked={insuranceData.occupantInsurance > 0}
              />
            </FlexBox>
            {insuranceData.occupantInsurance > 0 && (
              <div className="mt-2">
                <CustomSelectV3
                  onChange={(value) =>
                    setInsuranceData((insurance) => ({
                      ...insurance,
                      occupantInsurance: Number(value?.Value),
                    }))
                  }

                  label='Mức bảo hiểm'
                  options={[10]
                    .map((item) => item * 1000000)
                    .map((item) => ({
                      Text: `${new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item)} / người / vụ`,
                      Value: item,
                    }))
                  }
                  value={insuranceData.occupantInsurance}
                />
              </div>
            )}
          </div>


          <SelectVoucher
            setInsuranceData={setInsuranceData}
            discount={discount}
            availableVouchers={availableVouchers}
            loadingFeeDetails={loadingFeeDetails}
            insuranceData={insuranceData}
            directReferrer={directReferrer}
          />
        </Box>

        <Footer
          nextContent="Tiếp tục"
          loadingFeeDetails={loadingFeeDetails}
          feeDetails={feeDetails}
          handlePrev={() => {
            setStep((step) => step - 1);
          }}
          handleNext={() => {
            setcurrentStep((step) => step + 1);
          }}
        />
      </div>
    );
  }

  return (
    <div className="pb-44">
      <LayoutHeader
        showBackIcon={true}
        title={<Text className="text-white">Bảo hiểm xe máy</Text>}
        onBackClick={() => {
          setcurrentStep((step) => Math.max(0, step - 1) as any);
        }}
      />
      <RegisterInsuranceStepV2 step={2} />
      <Box style={{ padding: '12px 18px' }} className="bg-white">
        <Text.Title className="font-semibold text-lg leading-6   mb-4">
          Thông tin bảo hiểm
        </Text.Title>
        <CustomInput
          label={(<Text className="text-sm"> Tên chủ xe {ComponentRequire()}</Text>) as any}
          type="text"
          placeholder="Nguyễn Văn A"
          className="text-base mt-2 block"
          required
          value={insuranceData.userName}
          onChange={(e) =>
            setInsuranceData((insurance) => ({
              ...insurance,
              userName: e.target.value,
            }))
          }
          errorText={
            composeValidator([isEmpty], activeValidate, insuranceData.userName)
              .message
          }
          status={
            composeValidator([isEmpty], activeValidate, insuranceData.userName)
              .status
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
          value={insuranceData.userAddress}
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

        <CustomValidateIdCard
          activeValidate={activeValidate}
          insuranceData={insuranceData}
          setInsuranceData={setInsuranceData}
        />
        <CustomInput
          maxLength={12}
          label={(<Text className="text-sm">Biển số xe {ComponentRequire()}</Text>) as any}
          type="text"
          placeholder="29S1-12345"
          className="text-base mt-2 block"
          required
          value={insuranceData.licensePlates}
          onChange={(e) =>
            setInsuranceData((insurance) => ({
              ...insurance,
              licensePlates: e.target.value.toUpperCase(),
            }))
          }
          errorText={
            composeValidator(
              [isEmpty],
              activeValidate,
              insuranceData.licensePlates
            ).message
          }
          status={
            composeValidator(
              [isEmpty],
              activeValidate,
              insuranceData.licensePlates
            ).status
          }
        />

        <CustomInput
          maxLength={30}
          label={(<Text className="text-sm">Số khung {ComponentRequire()}</Text>) as any}
          type="text"
          placeholder=""
          className="text-base mt-2 block"
          value={insuranceData.chassisNumber}
          onChange={(e) => {
            setInsuranceData((insurance) => ({
              ...insurance,
              chassisNumber: e.target.value,
            }))
            // success
          }
          }
          required
          errorText={
            composeValidator(
              [validateStringLengthChasisNumberMotor],
              activeValidate,
              insuranceData.chassisNumber,
            ).message
          }
          status={
            composeValidator(
              [validateStringLengthChasisNumberMotor],
              activeValidate,
              insuranceData.chassisNumber,
            ).status
          }
        />
        <CustomInput
          label={(<Text className="text-sm">Số máy {ComponentRequire()}</Text>) as any}
          type="text"
          maxLength={30}
          placeholder=""
          className="text-base mt-2 block"
          value={insuranceData.engineNumber}
          onChange={(e) =>
            setInsuranceData((insurance) => ({
              ...insurance,
              engineNumber: e.target.value,
            }))
          }
          errorText={
            composeValidator(
              [validateStringLengthChasisNumberMotor],
              activeValidate,
              insuranceData.engineNumber,
              false
            ).message
          }
          status={
            composeValidator(
              [validateStringLengthChasisNumberMotor],
              activeValidate,
              insuranceData.engineNumber,
              false
            ).status
          }
        />
      </Box>
      <Box className="p-4 pt-0 pb-0">
        <InfomationContact />
        <CustomValidatePhone
          activeValidate={activeValidate}
          insuranceData={insuranceData}
          setInsuranceData={setInsuranceData}
        />
        <CustomValidateEmail
          activeValidate={activeValidate}
          insuranceData={insuranceData}
          setInsuranceData={setInsuranceData}
        />
      </Box>
      <Footer
        loadingFeeDetails={loadingFeeDetails}
        feeDetails={feeDetails}
        validateFunc={() => {
          setActiveValidate(true);
          setTimeout(() => setActiveValidate(false), 1000);
          if (
            composeValidator([isValidPhoneNumber, isEmpty], true, insuranceData.phone)
              .status === "error"
          )
            return false;
          if (
            composeValidator([isEmailValid, isEmpty], true, insuranceData.email)
              .status === "error"
          )
            return false;

          if (
            composeValidator([validateStringLengthChasisNumberMotor], true, insuranceData.chassisNumber)
              .status === "error"
          )
            return false;
          if (
            composeValidator([validateStringLengthChasisNumberMotor], true, insuranceData.engineNumber, false)
              .status === "error"
          )
            return false;
          if (
            composeValidator([isEmailValid], true, insuranceData.email)
              .status === "error"
          )
            return false;
          if (
            composeValidator(
              [isIdentityCardNumValid],
              true,
              insuranceData.identityCardNum
            ).status === "error"
          )
            return false;

          if (
            Object.values(
              pick(insuranceData, ["userAddress", "userName", "licensePlates"])
            ).every(
              (item) =>
                composeValidator([isEmpty], true, item).status === "success"
            )
          ) {
            setActiveValidate(false);
            return true;
          }
          return false;
        }}
        handleNext={() => setStep((step) => step + 1)}
        handlePrev={() => setcurrentStep((step) => Math.max(0, step - 1))}
      />
    </div>
  );
};

const MotorInsurance = () => {
  const navigate = useNavigate();
  const insuranceServicesValue = useRecoilValue(insuranceServicesState);

  const featureConfig = insuranceServicesValue.features.find(
    (item) => item.feature === EInsuranceFeature.MOTOR_01
  );

  const {
    loadingFeeDetails,
    feeDetails,
    insuranceData,
    step,
    setStep,
    setInsuranceData,
    handleCreateInsuranceRequest,
    loadingInsuranceRequest,
    paymentIntent,
    availableVouchers,
  } = useInsurance<ICreateMotorInsuranceParams>({
    defaultInsuranceData: {
      ...insuranceServicesValue.defaultMotorData,
      source: EInsuranceSource.MIC,
    },
    feature: EInsuranceFeature.MOTOR_01,
  });

  const thumbnail = featureConfig?.thumbnail || "";
  return (
    <>
      <LayoutHeader
        showBackIcon={true}
        title={<Text className="text-white">Bảo hiểm xe máy</Text>}
        onBackClick={() => {
          if (step > 0) setStep((step) => Math.max(0, step - 1) as any);
          else {
            navigate("/home");
          }
        }}
      />
      {paymentIntent && step >= 3 && (
        <> <PaymentIntent step={step} paymentIntent={paymentIntent} setStep={setStep} />

        </>
      )}
      <div
        className="section-container"
        style={{
          ...([2, 0].includes(step) && {
            background: "unset",
            paddingBottom: 200,
          }),
          ...(step === 3 && {
            display: "none",
          }),
          marginBottom: 0,
        }}
      >
        <div
          style={{
            display: step === 0 ? "block" : "none",
          }}
          className="animate-fadeIn"
        >
          <img src={thumbnail} alt="Thumbnail-tnds-xe-may" />
          <div className="bg-white mt-2 p-4">
            <CollapseWrap
              title="Bảo hiểm trách nhiệm dân sự xe máy"
              showMoreBtn
              content={[
                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content:
                        "✓ Quỹ thiệt hại về sức khỏe, tính mạng do xe máy gây ra là",
                    },
                    {
                      type: "hightlight",
                      content: " 150 triệu đồng/người/vụ tai nạn",
                    },
                  ],
                },
                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content: "✓ Quỹ thiệt hại về tài sản do xe máy gây ra là",
                    },
                    {
                      type: "hightlight",
                      content: " 50 triệu đồng/người/vụ tai nạn",
                    },
                  ],
                },
                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content: "✓ Bảo hiểm hiệu lực:",
                    },
                    {
                      type: "hightlight",
                      content: " 365 ngày",
                    },
                  ],
                },
                {
                  type: "text",
                  content:
                    "✓ Báo ngay cho cảnh sát giao thông hoặc cơ quan công an, chính quyền địa phương để phối hợp giải quyết tai nạn, đồng thời lập tức liên hệ hotline trên giấy chứng nhận bảo hiểm hoặc tổng đài HOTLINE, thông báo tổn thất và cung cấp thông tin vụ việc để nhận hướng dẫn cụ thể:",
                },
                {
                  type: "list",
                  content: [
                    {
                      type: "text",
                      content:
                        "Tên chủ xe, tên lái xe, số điện thoại, địa chỉ;",
                    },
                    {
                      type: "text",
                      content:
                        "Biển kiểm soát, số giấy chứng nhận bảo hiểm, hiệu lực bảo hiểm;",
                    },
                    {
                      type: "text",
                      content: "Ngày giờ, địa điểm nơi xảy ra tai nạn;",
                    },

                    {
                      type: "text",
                      content: "Số lượng người, hàng trên xe;",
                    },
                    {
                      type: "text",
                      content: "Thiệt hại về người, tài sản sơ bộ;",
                    },
                    {
                      type: "text",
                      content: "Diễn biến tai nạn sơ bộ.",
                    },
                    {
                      type: "text",
                      content: "Chụp ảnh hiện trường (nếu có thể);",
                    },
                  ],
                },
              ]}
            />
          </div>

          <div className="bg-white mt-2 p-4">
            <CollapseWrap
              title="Điều kiện - Điều khoản"
              height={0}
              content={[
                {
                  type: "text",
                  content:
                    "✓ Điều kiện áp dụng: Cho các trường hợp thuộc phạm vi bảo hiểm",
                },
                {
                  type: "text",
                  content: "✓ Được tạm ứng chi phí từ công ty bảo hiểm",
                },
                {
                  type: "text",
                  content: "❤️️ Vui lòng liên hệ chúng tôi để được làm rõ",
                  className: "pt-1 pb-1 block",
                },
                {
                  type: "text",
                  content:
                    "Điều khoản loại trừ với các trường hợp thiếu/vi phạm các nội dung sau:",
                  className: "mt-4",
                },
                {
                  type: "text",
                  content:
                    "❌ Giấy chứng nhận bảo hiểm và/hoặc Hợp đồng bảo hiểm và các thỏa thuận khác bằng văn bản (nếu có)",
                  className: "pl-6 pt-1",
                },
                {
                  type: "text",
                  content:
                    "❌ Giấy đăng ký xe, Giấy phép lái xe hợp lệ của Người Điều Khiển Xe;",
                  className: "pl-6 pt-1",
                },
                {
                  type: "text",
                  content:
                    "❌ Giấy chứng nhận kiểm định an toàn kỹ thuật và bảo vệ môi trường phương tiện giao thông cơ giới đường bộ hợp lệ,",
                  className: "pl-6 pt-1",
                },
                {
                  type: "text",
                  content:
                    "❌ Hóa đơn, chứng từ hợp lệ về việc sửa chữa, thay mới tài sản bị thiệt hại;",
                  className: "pl-6 pt-1",
                },
                {
                  type: "text",
                  content:
                    "❌ Các giấy tờ chứng minh chi phí cần thiết và hợp lý mà Bên Mua Bảo Hiểm đã chi ra để giảm thiểu tổn thất hay để thực hiện theo chỉ dẫn của công ty bảo hiểm (nếu có).",
                  className: "pl-6 pt-1",
                },
              ]}
            />
          </div>

          <div className="bg-white mt-2 p-4">
            <CollapseWrap
              title="Phương thức thanh toán"
              height={0}
              content={[
                {
                  type: "text",
                  content: "✓ Trực tiếp tại các cửa hàng (ưu việt nhất)",
                },
                {
                  type: "text",
                  content:
                    "✓ Online qua QRCode vào tài khoản công ty mở tại BIDV",
                },
              ]}
            />
          </div>
          <InsuranceIntro
            feature={EInsuranceFeature.MOTOR_01}
            setStep={setStep}
            title="Bảo hiểm xe máy 66k"
            description={`✍️ Lưu trữ Online ngay trên Zalo, cần là có
✍️ Thủ tục chi trả bồi thường đơn giản trong trường hợp gây ra tai nạn cho người khác
✍️ Chia sẻ ngay giúp bạn bè cùng biết`}
            thumbnail={thumbnail}
          />
        </div>
        <div
          style={{
            display: step === 1 ? "block" : "none",
          }}
          className="animate-fadeIn"
        >
          <MotorInsuranceFormFillDataStep
            feeDetails={feeDetails}
            loadingFeeDetails={loadingFeeDetails}
            availableVouchers={availableVouchers}
            insuranceData={insuranceData}
            setInsuranceData={setInsuranceData}
            setStep={setStep}
          />
        </div>
        {step === 2 && (
          <div style={{ paddingBottom: '68px' }}>
            <RegisterInsuranceStepV2 step={3} />
            <MotorInsuranceFormConfirmData insuranceData={insuranceData} />
            <InsuranceFormConfirmStep
              insuranceData={insuranceData}
              feeDetails={feeDetails}
              loadingFeeDetails={loadingFeeDetails}
              loadingInsuranceRequest={loadingInsuranceRequest}
              handleCreateInsuranceRequest={handleCreateInsuranceRequest}
              setStep={setStep}
              feature={EInsuranceFeature.MOTOR_01}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MotorInsurance;
