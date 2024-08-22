import React, { useState } from "react";
import { Button, Text, useNavigate } from "zmp-ui";
import FlexBox from "../../common/FlexBox";
import { ArrowRightSvg } from "../../svgs/ArrowRightSvg";
import { Step1Svg } from "../../svgs/Step1Svg";
import { Step2Svg } from "../../svgs/Step2Svg";
import { Step3Svg } from "../../svgs/Step3Svg";

export type StepType = {
  image: React.ReactNode;
  title: string;
  subTitle: string;
};

const steps: StepType[] = [
  {
    image: <Step1Svg />,
    title: "Bảo Hiểm Việt - An Tâm Cho Tương Lai",
    subTitle:
      "Bảo vệ bạn và gia đình với sản phẩm bảo hiểm phù hợp nhất. Đăng ký ngay để được tư vấn chuyên nghiệp và đảm bảo an tâm cho tương lai.",
  },
  {
    image: <Step2Svg />,
    title: "Bảo vệ xe của bạn 24/7",
    subTitle:
      "Tìm kiếm và so sánh các gói bảo hiểm xe máy, xe ô tô phù hợp nhất cho nhu cầu của bạn. Đăng ký ngay để đảm bảo an toàn và bảo vệ chiếc xe yêu quý của bạn. Cùng Bảo Hiểm Việt - đồng hành trên mọi nẻo đường.",
  },
  {
    image: <Step3Svg />,
    title: "An tâm trên mọi nẻo đường",
    subTitle:
      "Đảm bảo bảo vệ xe của bạn và giảm thiểu rủi ro trong trường hợp xảy ra tai nạn. Đăng ký ngay để được tư vấn chuyên nghiệp và đảm bảo an tâm trên mọi nẻo đường.",
  },
];

export const StepItem = ({
  image,
  title,
  subTitle,
  active,
  style,
}: StepType & {
  active: boolean;
  style?: React.CSSProperties;
}) => {
  if (!active) return null;
  return (
    <FlexBox className={`flex-col items-center animate-fadeIn `}>
      <div className="mt-24" style={{ ...style }}>
        {image}
      </div>
      <Text.Title className="mt-8 mb-2 max-w-[240px] h-12 text-center font-medium text-lg leading-6">
        {title}
      </Text.Title>
      <Text className="text-center max-w-80 text-gray-500 text-sm h-24">
        {subTitle}
      </Text>
    </FlexBox>
  );
};

const Steps = () => {
  const [step, setStep] = useState<number>(0);
  const navigate = useNavigate();
  return (
    <>
      {steps.map((item, index) => (
        <StepItem key={item.title} {...item} active={index === step} />
      ))}
      <FlexBox className="justify-center">
        {steps.map((item, index) => (
          <div
            key={item.title + index}
            className="w-1.5 h-0.5 m-0.5 mt-8 mb-8"
            style={{
              background:
                index === step ? "#667685" : "rgba(102, 118, 133, 0.5)",
            }}
          />
        ))}
      </FlexBox>
      <Button
        className="bg-blue-900 w-full"
        onClick={() => {
          if (step < steps.length - 1) {
            setStep((step) => step + 1);
          } else {
            navigate("/home");
          }
        }}
      >
        <FlexBox className="items-center">
          <Text className="text-white">
            {(step < steps.length - 1 && "Tiếp tục") || "Bắt đầu sử dụng"}
          </Text>
          {/* <ArrowRightSvg className="ml-2" /> */}
        </FlexBox>
      </Button>
    </>
  );
};

export default Steps;
