import { random } from "lodash";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Text } from "zmp-ui";
import {
  EInsuranceFeature,
  EInsuranceSource,
} from "../../../../enums/insurance";
import { ICreateStudentInsuranceParams } from "../../../../interfaces/insurance";
import { insuranceServicesState } from "../../../../state";
import CollapseWrap from "../../../common/Collapse";
import LayoutHeader from "../../../layouts/LayoutHeader";
import InsuranceFormConfirmStep, {
  StudentInsuranceFormConfirmData,
} from "../InsuranceFormConfirmStep";
import InsuranceIntro from "../InsuranceIntro";
import PaymentIntent from "../PaymentIntent";
import RegisterInsuranceStep from "../RegisterInsuranceStep";
import useInsurance from "../useInsurance";
import { TravelInsuranceFormFillDataStep } from "./FillDataStep";
const StudentInsurance = () => {
  const navigate = useNavigate();
  const insuranceServicesValue = useRecoilValue(insuranceServicesState);
  const featureConfig = insuranceServicesValue.features.find(
    (item) => item.feature === EInsuranceFeature.STUDENT_01
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
  } = useInsurance<ICreateStudentInsuranceParams>({
    defaultInsuranceData: {
      ...insuranceServicesValue.defaultStudentData,
      source:
        featureConfig?.sources?.[
        random(0, featureConfig?.sources?.length || 0)
        ] || EInsuranceSource.BIC,
    },
    feature: EInsuranceFeature.STUDENT_01,
  });

  const thumbnail = featureConfig?.thumbnail || "";
  return (
    <>
      <LayoutHeader
        showBackIcon={true}
        title={<Text className="text-white">Bảo hiểm học sinh sinh viên</Text>}
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
              title="Bảo hiểm học sinh sinh viên"
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
                      content: " tử vong do óm đau, bệnh tật",
                    },
                    {
                      type: "text",
                      content: " (thuộc phạm vi bảo hiểm)",
                      style: {
                        fontWeight: 300,
                      },
                      className: "italic",
                    },
                  ],
                },
                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content: "✓ Chi trả",
                    },
                    {
                      type: "hightlight",
                      content: " tử vong hoặc thương tật thân thể do tai nạn",
                    },
                  ],
                },
                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content: "✓ Chi phí",
                    },
                    {
                      type: "hightlight",
                      content: " Phẫu thuật do ốm đau, bệnh tật",
                    },
                  ],
                },
                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content: "✓ Hỗ trợ chi phí",
                    },
                    {
                      type: "hightlight",
                      content:
                        " Nằm viện do ốm đau, bệnh tật, thương tật thân thể do tai nạn",
                    },
                    {
                      type: "text",
                      content:
                        "(mỗi ngày 0,3% số tiền bảo hiểm, không quá 60 ngày/năm)",
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
                  content:
                    "✓ Đối tượng bảo hiểm: Học sinh, sinh viên đang theo học các trường",
                },
                {
                  type: "list",
                  content: [
                    {
                      type: "text",
                      content: "Mẫu giáo",
                    },
                    {
                      type: "text",
                      content: "Tiểu học",
                    },
                    {
                      type: "text",
                      content: "Trung học cơ sở",
                    },
                    {
                      type: "text",
                      content: "Trung học phổ thông",
                    },
                    {
                      type: "text",
                      content: "Các trường đại học, cao đẳng, trung cấp",
                    },
                    {
                      type: "text",
                      content: "Các trường dạy nghề",
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
                  content:
                    "❌ Những người mắc bệnh thần kinh, tâm thần, phong.",
                  className: "pl-6 pt-1",
                },
                {
                  type: "text",
                  content:
                    "❌ Người tàn tật hoặc thương tật vĩnh viễn 50% trở lên",
                  className: "pl-6 pt-1",
                },
                {
                  type: "text",
                  content:
                    "❌ Những người đang trong thời gian điều trị bệnh tật, thương tật.",
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
            feature={EInsuranceFeature.STUDENT_01}
            setStep={setStep}
            title="Bảo hiểm học sinh sinh viên 100k"
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

            <StudentInsuranceFormConfirmData insuranceData={insuranceData} />
            <InsuranceFormConfirmStep
              insuranceData={insuranceData}
              feeDetails={feeDetails}
              loadingFeeDetails={loadingFeeDetails}
              loadingInsuranceRequest={loadingInsuranceRequest}
              handleCreateInsuranceRequest={handleCreateInsuranceRequest}
              setStep={setStep}
              feature={EInsuranceFeature.STUDENT_01}
            />
          </>
        )}
      </div>
    </>
  );
};

export default StudentInsurance;
