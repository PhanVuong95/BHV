import { random } from "lodash";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Text } from "zmp-ui";
import {
  EInsuranceFeature,
  EInsuranceSource,
} from "../../../../enums/insurance";
import { ICreateCancerInsuranceParams } from "../../../../interfaces/insurance";
import { insuranceServicesState } from "../../../../state";
import CollapseWrap from "../../../common/Collapse";
import LayoutHeader from "../../../layouts/LayoutHeader";
import InsuranceFormConfirmStep, {
  CancerInsuranceFormConfirmData,
} from "../InsuranceFormConfirmStep";
import InsuranceIntro from "../InsuranceIntro";
import PaymentIntent from "../PaymentIntent";
import RegisterInsuranceStep from "../RegisterInsuranceStep";
import useInsurance from "../useInsurance";
import { CancerInsuranceFormFillDataStep } from "./FillDataStep";
import RegisterInsuranceStepV2 from "../AutoInsurance/RegisterInsuranceStepV2";

const CancerInsurance = () => {
  const navigate = useNavigate();
  const insuranceServicesValue = useRecoilValue(insuranceServicesState);
  const featureConfig = insuranceServicesValue.features.find(
    (item) => item.feature === EInsuranceFeature.HEALTH_02
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
  } = useInsurance<ICreateCancerInsuranceParams>({
    defaultInsuranceData: {
      ...insuranceServicesValue.defaultCancerData,
      source:
        featureConfig?.sources?.[
        random(0, featureConfig?.sources?.length || 0)
        ] || EInsuranceSource.BIC,
    },
    feature: EInsuranceFeature.HEALTH_02,
  });

  const thumbnail = featureConfig?.thumbnail || "";

  return (
    <>
      <LayoutHeader
        showBackIcon={true}
        title={<Text className="text-white">Bảo hiểm ung thư</Text>}
        onBackClick={() => {
          if (step > 0) setStep((step) => Math.max(0, step - 1) as any);
          else {
            navigate("/home");
          }
        }}
      />
      {paymentIntent && step >= 3 && (
        <PaymentIntent step={step} paymentIntent={paymentIntent} setStep={setStep} />
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
          <img src={thumbnail} alt="Thumbnail-tncn" />
          <div className="bg-white mt-2 p-4">
            <CollapseWrap
              title="Bảo hiểm ung thư"
              showMoreBtn
              content={[
                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content: "✓ Chi trả bảo hiểm khi",
                    },
                    {
                      type: "hightlight",
                      content: " mắc bệnh ung thư giai đoạn sớm/trễ",
                    },
                  ],
                },

                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content: "✓ Chi trả bảo hiểm khi",
                    },
                    {
                      type: "hightlight",
                      content:
                        " nằm viện điều trị do mắc bệnh ung thư giai đoạn sớm/trễ",
                    },
                  ],
                },
                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content: "✓ Chi trả bảo hiểm khi",
                    },
                    {
                      type: "hightlight",
                      content: " tử vong do bệnh Ung thư",
                    },
                  ],
                },
                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content: "✓ Chi trả bảo hiểm khi",
                    },
                    {
                      type: "hightlight",
                      content: " tử vong do tai nạn",
                    },
                  ],
                },
                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content: "✓ Chi trả bảo hiểm khi",
                    },
                    {
                      type: "hightlight",
                      content: " tử vong do bệnh đột quỵ",
                    },
                  ],
                },

                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content: "✓ Chi trả bồi thường cao nhất lên đến",
                    },
                    {
                      type: "hightlight",
                      content: " 500.000.000 VNĐ/năm",
                    },
                  ],
                },
                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content: "✓ Bảo hiểm hiệu lực",
                    },
                    {
                      type: "hightlight",
                      content: " 365 ngày",
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
                  content: "✓ Điều kiện áp dụng: ",
                },
                {
                  type: "list",
                  content: [
                    {
                      type: "text",
                      content:
                        "Công dân Việt Nam và người nước ngoài cư trú hợp pháp tại Việt Nam;",
                    },
                    {
                      type: "text",
                      content:
                        "Độ tuổi từ đủ 16 tuổi tối đa đến tròn 65 tuổi tại ngày bắt đầu thời hạn bảo hiểm",
                    },
                  ],
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
                  content: "Không nhận bảo hiểm cho các đối tượng sau:",
                  className: "mt-4",
                },
                {
                  type: "text",
                  content: "❌ Người bị bệnh tâm thần",
                  className: "pl-6 pt-1",
                },
                {
                  type: "text",
                  content:
                    "❌ Người tàn tật hoặc thương tật vĩnh viễn 50% trở lên",
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
            feature={EInsuranceFeature.HEALTH_02}
            setStep={setStep}
            title="Bảo hiểm ung thư"
            description={`✍️ Lưu trữ Online ngay trên Zalo, cần là có
✍️ Thủ tục chi trả bồi thường đơn giản trong trường hợp bị tai nạn
✍️ Chia sẻ ngay giúp bạn bè cùng biết`}
            thumbnail={thumbnail}
          />
        </div>
        <div
          style={{
            display: step === 1 ? "block" : "none",
          }}
          className="animate-fadeIn pb-44"
        >
          <CancerInsuranceFormFillDataStep
            feeDetails={feeDetails}
            loadingFeeDetails={loadingFeeDetails}
            availableVouchers={availableVouchers}
            insuranceData={insuranceData}
            setInsuranceData={setInsuranceData}
            setStep={setStep}
            step={step}
          />
        </div>
        {step === 2 && (
          <>
            <RegisterInsuranceStepV2 isCancer={true} step={4} />
            <CancerInsuranceFormConfirmData insuranceData={insuranceData} />
            <InsuranceFormConfirmStep
              insuranceData={insuranceData}
              feeDetails={feeDetails}
              loadingFeeDetails={loadingFeeDetails}
              loadingInsuranceRequest={loadingInsuranceRequest}
              handleCreateInsuranceRequest={handleCreateInsuranceRequest}
              setStep={setStep}
              feature={EInsuranceFeature.HEALTH_02}
            />
          </>
        )}
      </div>
    </>
  );
};

export default CancerInsurance;
