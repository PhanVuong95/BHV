import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { InfoSvg } from "../../svgs/InfoSvg";
import { InfoFilledSvg } from "../../svgs/InfoFilledSvg";
import { ConfirmSvg } from "../../svgs/ConfirmSvg";
import { ConfirmFilledSvg } from "../../svgs/ConfirmFilledSvg";
import { PaymentFilledSvg } from "../../svgs/PaymentFilledSvg";
import { PaymentSvg } from "../../svgs/PaymentSvg";
import { Text } from "zmp-ui";
import FlexBox from "../../common/FlexBox";

type Props = { step?: 0 | 1 | 2 | 3 };

const stepPositions = [20, 50, 80];

const RegisterInsuranceStep = ({ step = 1 }: Props) => {
  return (
    <div
      className="h-24 pt-10 pb-2 "
      style={{ background: "white", zIndex: 999 }}
    >
      <ProgressBar
        stepPositions={stepPositions}
        percent={stepPositions[step - 1]}
        filledBackground="linear-gradient(to right, rgba(37, 99, 235, 0.5), #2563EB)"
      >
        <Step transition="scale">
          {({ accomplished }) => (
            <FlexBox className="pt-2 flex-col items-center">
              {accomplished ? <InfoFilledSvg /> : <InfoSvg />}
              <Text className="text-xs font-normal"> Cung cấp thông tin</Text>
            </FlexBox>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <FlexBox className="pt-2 flex-col items-center">
              {accomplished ? <ConfirmFilledSvg /> : <ConfirmSvg />}
              <Text className="text-xs font-normal">Xác nhận</Text>
            </FlexBox>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <FlexBox className="pt-2 flex-col items-center">
              {accomplished ? <PaymentFilledSvg /> : <PaymentSvg />}
              <Text className="text-xs font-normal">Thanh toán</Text>
            </FlexBox>
          )}
        </Step>
      </ProgressBar>
    </div>
  );
};

export default RegisterInsuranceStep;
