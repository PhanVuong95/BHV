import React, { useState } from "react";
import { IInsuranceFeeDetails } from "../../../interfaces/insurance";
import FlexBox from "../../common/FlexBox";
import { Checkbox, Text } from "zmp-ui";
import CustomButton from "../../common/CustomButton";
import useFormatter from "../../../hooks/useFormatter";
import { useVirtualKeyboardVisible } from "../../../hooks/useVirtualKeyboardVisible";
import { openUrlInWebview } from "../../../services/zalo";
import { UNIT_VND, formatNumberWithCommas } from "../../Utils";

type Props = {
  validateFunc?: () => boolean;
  feeDetails: IInsuranceFeeDetails;
  handleNext: () => void;
  handlePrev: () => void;
  nextContent?: string;
  prevContent?: string;
  loadingFeeDetails: boolean;
};

function Footer({
  feeDetails,
  validateFunc,
  handleNext,
  handlePrev,
  nextContent = "Tiếp tục",
  prevContent = "Quay lại",
  loadingFeeDetails,
}: Props) {
  const isKeyboardVisible = useVirtualKeyboardVisible();
  const { formatter } = useFormatter();
  const [accept, setaccept] = useState(true);

  if (isKeyboardVisible) return null;
  return (
    <div
      className="p-4 fixed bottom-0 left-0 bg-white w-full"
      style={{
        boxShadow: "-10px 0px 10px #E2E8F0",
      }}
    >
      {/* <FlexBox className="mb-2">
        <Checkbox
          label={
            (
              <Text className="text-xs">
                Tôi đã đọc và đồng ý với{" "}
                <span
                  className="text-blue-700"
                  style={{
                    ...(!feeDetails?.fee?.ruleUrl && {
                      color: "unset",
                    }),
                  }}
                  onClick={() => {
                    if (feeDetails?.fee?.ruleUrl)
                      openUrlInWebview(feeDetails?.fee?.ruleUrl);
                  }}
                >
                  quy tắc bảo hiểm
                </span>
              </Text>
            ) as any
          }
          value={1}
          defaultChecked={true}
          onChange={(e) => setaccept(e.target.checked)}
        />
      </FlexBox> */}
      <FlexBox className="mb-2" style={{ alignItems: 'center' }}>
        <span className="fs-14 fw-500" style={{ color: '#646464' }}>
          Tổng thanh toán:
        </span>
        <span className="fw-600" style={{ color: '#2E2E2E', fontSize: '18px', marginLeft: '4px',fontWeight:600 }}>
          {' '}{loadingFeeDetails || !feeDetails?.fee?.total
            ? "---"
            : formatNumberWithCommas(
              Math.max(
                (feeDetails?.fee?.total || 0) - feeDetails?.discount,
                0
              )
            )} {UNIT_VND}
        </span>
      </FlexBox>

      <FlexBox className="justify-between" style={{gap:12}}>
        <CustomButton
          style={{ width: '50%',border:'1px solid var(--primary-color)',color:'var(--primary-color)' }}
          content={prevContent}
          className="p-2 pl-8 pr-8 bg-white text-gray-800 border"
          onClick={handlePrev}
        />
        <CustomButton
          style={{ width: '50%' }}
          disable={!accept || loadingFeeDetails || !feeDetails?.fee?.total}
          content={nextContent}
          className="bg-blue-700 p-2 pl-8 pr-8"
          onClick={() => {
            if (validateFunc) {
              if (validateFunc()) handleNext();
            } else {
              handleNext();
            }
          }}
        />
      </FlexBox>
    </div>
  );
}

export default Footer;
