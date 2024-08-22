import { random } from "lodash";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { Text } from "zmp-ui";
import {
  EInsuranceFeature,
  EInsuranceSource,
} from "../../../../enums/insurance";

import { ICreateFireInsuranceParams } from "../../../../interfaces/insurance";
import { insuranceServicesState } from "../../../../state";
import CollapseWrap from "../../../common/Collapse";
import LayoutHeader from "../../../layouts/LayoutHeader";
import InsuranceFormConfirmStep, {
  FireInsuranceFormConfirmData,
} from "../InsuranceFormConfirmStep";
import InsuranceIntro from "../InsuranceIntro";
import PaymentIntent from "../PaymentIntent";
import RegisterInsuranceStep from "../RegisterInsuranceStep";
import useInsurance from "../useInsurance";
import { FireInsuranceFormFillDataStep } from "./FillDataStep";
import RegisterInsuranceStepV2 from "../AutoInsurance/RegisterInsuranceStepV2";

const FireInsurance = () => {
  const navigate = useNavigate();
  const insuranceServicesValue = useRecoilValue(insuranceServicesState);
  const featureConfig = insuranceServicesValue.features.find(
    (item) => item.feature === EInsuranceFeature.FIRE_01
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
  } = useInsurance<ICreateFireInsuranceParams>({
    defaultInsuranceData: {
      ...insuranceServicesValue.defaultFireData,
      // source:
      //   featureConfig?.sources?.[
      //     random(0, featureConfig?.sources?.length || 0)
      //   ] || EInsuranceSource.BIC,
      source: EInsuranceSource.BIC,
    },
    feature: EInsuranceFeature.FIRE_01,
  });
  console.log(featureConfig?.sources);
  const thumbnail = featureConfig?.thumbnail || "";
  return (
    <>
      <LayoutHeader
        showBackIcon={true}
        title={<Text className="text-white">Bảo hiểm cháy nổ</Text>}
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
              title="Bảo hiểm cháy nổ"
              showMoreBtn
              content={[
                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content: "✓ Chi trả",
                    },
                    {
                      type: "hightlight",
                      content: " Cháy, Nổ, Sét đánh trực tiếp",
                    },
                  ],
                },
                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content: "✓ Chi trả khi",
                    },
                    {
                      type: "hightlight",
                      content:
                        " máy bay và các phương tiện hàng không khác rơi vào",
                    },
                  ],
                },
                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content: "✓ Chi trả khi có thiệt hại bởi",
                    },
                    {
                      type: "hightlight",
                      content: " giông bão, lũ lụt",
                    },
                  ],
                },
                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content: "✓ Hỗ trợ chi phí khi",
                    },
                    {
                      type: "hightlight",
                      content:
                        " Xe cộ hay súc vật không thuộc quyền sở hữu hay kiểm soát của Người được bảo hiểm hay người làm thuê của họ đâm vào",
                    },
                  ],
                },
                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content: "✓ Hỗ trợ chi trả tài sản",
                    },
                    {
                      type: "hightlight",
                      content:
                        " Cháy do tài sản tự lên men, tỏa nhiệt hay bốc cháy",
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
                      content: " 2 tỉ VNĐ/năm",
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
                      content: "Cháy, Nổ, Sét đánh trực tiếp",
                    },
                    {
                      type: "text",
                      content:
                        "Máy bay và các phương tiện hàng không khác rơi vào",
                    },
                    {
                      type: "text",
                      content: "Động đất, núi lửa phun.",
                    },
                    {
                      type: "text",
                      content: "Lửa ngầm dưới đất",
                    },
                    {
                      type: "text",
                      content: "Giông bão và lũ lụt",
                    },
                    {
                      type: "text",
                      content:
                        "Cháy do tài sản tự lên men, tỏa nhiệt hay bốc cháy",
                    },
                    {
                      type: "text",
                      content:
                        "Vỡ tràn từ các bể chứa, thiết bị chứa nước hay đường ống dẫ",
                    },
                    {
                      type: "text",
                      content: "Xe cộ hay súc vật đâm vào",
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
                  content: "Không nhận bảo hiểm trong trường hợp sau:",
                  className: "mt-4",
                },

                {
                  type: "text",
                  content:
                    "❌ Tài sản bị phá hủy hay hư hại do nước chảy, rò rỉ từ hệ thống thiết bị phòng cháy tự động",
                  className: "pl-6 pt-1",
                },
                {
                  type: "text",
                  content:
                    "❌ Xe cộ, súc vật thuộc quyền sở hữu hay kiểm soát của Người được bảo hiểm hay người làm thuê của họ đâm vào",
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
            feature={EInsuranceFeature.FIRE_01}
            setStep={setStep}
            title="Bảo hiểm cháy nổ 220k"
            description={`✍️ Lưu trữ Online ngay trên Zalo, cần là có
✍️ Thủ tục chi trả bồi thường đơn giản trong trường hợp bị thiệt hại tài sản
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
          <FireInsuranceFormFillDataStep
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
            {<RegisterInsuranceStepV2 step={3} />}
            <FireInsuranceFormConfirmData insuranceData={insuranceData} />
            <InsuranceFormConfirmStep
              insuranceData={insuranceData}
              feeDetails={feeDetails}
              loadingFeeDetails={loadingFeeDetails}
              loadingInsuranceRequest={loadingInsuranceRequest}
              handleCreateInsuranceRequest={handleCreateInsuranceRequest}
              setStep={setStep}
              feature={EInsuranceFeature.FIRE_01}
            />
          </>
        )}
      </div>
    </>
  );
};

export default FireInsurance;
