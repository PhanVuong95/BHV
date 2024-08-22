import { random } from "lodash";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { Text } from "zmp-ui";
import {
  EInsuranceFeature,
  EInsuranceSource,
} from "../../../../enums/insurance";

import { ICreateOverseaTravelInsuranceParams } from "../../../../interfaces/insurance";
import { insuranceServicesState } from "../../../../state";
import CollapseWrap from "../../../common/Collapse";
import LayoutHeader from "../../../layouts/LayoutHeader";
import InsuranceFormConfirmStep, {
  OverseaTravelInsuranceFormConfirmData,
} from "../InsuranceFormConfirmStep";
import InsuranceIntro from "../InsuranceIntro";
import PaymentIntent from "../PaymentIntent";
import RegisterInsuranceStep from "../RegisterInsuranceStep";
import useInsurance from "../useInsurance";
import { TravelInsuranceFormFillDataStep } from "./FillDataStep";
import RegisterInsuranceStepV2 from "../AutoInsurance/RegisterInsuranceStepV2";

const OverseaTravelInsurance = () => {
  const navigate = useNavigate();
  const insuranceServicesValue = useRecoilValue(insuranceServicesState);
  const featureConfig = insuranceServicesValue.features.find(
    (item) => item.feature === EInsuranceFeature.TRAVEL_02
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
  } = useInsurance<ICreateOverseaTravelInsuranceParams>({
    defaultInsuranceData: {
      ...insuranceServicesValue.defaultOverseaTravelData,
      // source:
      //   featureConfig?.sources?.[
      //     random(0, featureConfig?.sources?.length || 0)
      //   ] || EInsuranceSource.PVI,
      source: EInsuranceSource.BIC,
    },
    feature: EInsuranceFeature.TRAVEL_02,
  });
  const thumbnail = featureConfig?.thumbnail || "";
  return (
    <>
      <LayoutHeader
        showBackIcon={true}
        title={<Text className="text-white">Bảo hiểm du lịch quốc tế</Text>}
        onBackClick={() => {
          if (step > 0) setStep((step) => Math.max(0, step - 1) as any);
          else {
            navigate("/home");
          }
        }}
      />

      {/* {step > 1 && <RegisterInsuranceStep step={step} />} */}

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
              title="Bảo hiểm du lịch quốc tế"
              showMoreBtn
              content={[
                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content: "✓ Đáp ứng chuẩn",
                    },
                    {
                      type: "hightlight",
                      content: " thủ tục xin VISA",
                    },
                  ],
                },
                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content:
                        "✓ Hỗ trợ điều trị nội trú, ngoại trú, khám bệnh",
                    },
                  ],
                },
                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content: "✓ Hỗ trợ tiền mặt cho mỗi ngày nằm viện",
                    },
                    {
                      type: "hightlight",
                      content: " tại nước ngoài",
                    },
                  ],
                },
                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content:
                        "✓ Bồi thường tiền đặt cọc cho chuyến đi do người được bảo hiểm bị ốm đau, tử vong và bệnh tật",
                    },
                  ],
                },
                {
                  type: "text",
                  content: "✓ Mở rộng bảo hiểm cho các chi phí phát sinh do",
                },
                {
                  type: "list",
                  content: [
                    {
                      type: "text",
                      content: "Nhận hành lý chậm;",
                    },
                    {
                      type: "text",
                      content: "Mất giấy tờ thông hành;",
                    },
                    {
                      type: "text",
                      content: "Cắt ngắn hay hủy bỏ chuyến đi;",
                    },
                    {
                      type: "text",
                      content: "Chuyến đi bị trì hoãn;",
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
                      content: "Độ tuổi từ đủ 06 tuần tuổi đến 80 tuổ",
                    },
                  ],
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
            feature={EInsuranceFeature.TRAVEL_02}
            setStep={setStep}
            title="Bảo hiểm du lịch quốc tế"
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
          className="animate-fadeIn"
        >
          <TravelInsuranceFormFillDataStep
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
            <RegisterInsuranceStepV2 step={2} />
            <OverseaTravelInsuranceFormConfirmData
              insuranceData={insuranceData}
            />
            <InsuranceFormConfirmStep
              insuranceData={insuranceData}
              feeDetails={feeDetails}
              loadingFeeDetails={loadingFeeDetails}
              loadingInsuranceRequest={loadingInsuranceRequest}
              handleCreateInsuranceRequest={handleCreateInsuranceRequest}
              setStep={setStep}
              feature={EInsuranceFeature.TRAVEL_02}
            />
          </>
        )}
      </div>
    </>
  );
};

export default OverseaTravelInsurance;
