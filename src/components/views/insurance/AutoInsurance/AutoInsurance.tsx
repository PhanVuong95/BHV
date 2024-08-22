import { Select, Text } from "zmp-ui";
import { EInsuranceFeature, EInsuranceSource } from "../../../../enums/insurance";
import { ICreateAutoInsuranceParams } from "../../../../interfaces/insurance";
import { insuranceServicesState } from "../../../../state";
import LayoutHeader from "../../../layouts/LayoutHeader";
import RegisterInsuranceStep from "../RegisterInsuranceStep";
import { random } from "lodash";
import PaymentIntent from "../PaymentIntent";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import InsuranceFormConfirmStep, {
  AutoInsuranceFormConfirmData,
} from "../InsuranceFormConfirmStep";
import InsuranceIntro from "../InsuranceIntro";
import CollapseWrap from "../../../common/Collapse";
import useInsurance from "../useInsurance";
import { AutoInsuranceFormFillDataStep } from "./AutoInsuranceFormFillDataStep";
import React from "react";
import CustomPolicy from "../../../Policy/CustomPolicy";
import RegisterInsuranceStepV2 from "./RegisterInsuranceStepV2";
import { POLICY_AUTO, POLICY_CONDITIONAL_AUTO } from "../../../../constants";
const { Option } = Select;
const AutoInsurance = () => {
  const navigate = useNavigate();
  const insuranceServicesValue = useRecoilValue(insuranceServicesState);

  const featureConfig = insuranceServicesValue.features.find(
    (item) => item.feature === EInsuranceFeature.AUTO_01
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
  } = useInsurance<ICreateAutoInsuranceParams>({
    defaultInsuranceData: {
      ...insuranceServicesValue.defaultAutoData,
      source: EInsuranceSource.MIC,
    },
    feature: EInsuranceFeature.AUTO_01,
  });

  const thumbnail = featureConfig?.thumbnail || "";
  return (
    <>
      <LayoutHeader
        showBackIcon={true}
        title={<Text className="text-white">Bảo hiểm ô tô</Text>}
        onBackClick={() => {
          if (step > 0) setStep((step) => (step - 1) as any);
          else {
            navigate("/home");
          }
        }}
      />


      {(paymentIntent && step >= 3 && (
        <PaymentIntent step={step} paymentIntent={paymentIntent} setStep={setStep} />
      )) || (
          <div
            className="section-container"
            style={{
              ...([2, 0].includes(step) && {
                background: "unset",
                paddingBottom: 200,
              }),
            }}
          >

            {
              step === 0 && <img src={thumbnail} alt="thumbnail-baohiem-oto" />
            }
            <div
              style={{
                display: step === 0 ? "block" : "none",
                padding: '0px 12px'
              }}
              className="animate-fadeIn"
            >
              <CustomPolicy
                title="Bảo hiểm trách nhiệm dân sự ô tô"
                content={POLICY_AUTO}
              />
              <div className="bg-white box-shadow mt-4 p-4">
                <CollapseWrap
                  title="Điều kiện - Điều khoản"
                  content={POLICY_CONDITIONAL_AUTO as []}
                />
              </div>

              <div className="bg-white box-shadow mt-4 p-4">
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
                feature={EInsuranceFeature.AUTO_01}
                setStep={setStep}
                title="Bảo hiểm ô tô"
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
              <AutoInsuranceFormFillDataStep
                feeDetails={feeDetails}
                loadingFeeDetails={loadingFeeDetails}
                availableVouchers={availableVouchers}
                insuranceData={insuranceData}
                setInsuranceData={setInsuranceData}
                setStep={setStep}
              />
            </div>
            {step === 2 && (
              <div style={{paddingBottom:'64px'}}>
                <RegisterInsuranceStepV2 step={3} />
                <AutoInsuranceFormConfirmData insuranceData={insuranceData} />
                <InsuranceFormConfirmStep
                  insuranceData={insuranceData}
                  feeDetails={feeDetails}
                  loadingFeeDetails={loadingFeeDetails}
                  loadingInsuranceRequest={loadingInsuranceRequest}
                  handleCreateInsuranceRequest={handleCreateInsuranceRequest}
                  setStep={setStep}
                  feature={EInsuranceFeature.AUTO_01}
                />
              </div>
            )}
          </div>
        )}
    </>
  );
};

export default AutoInsurance;
