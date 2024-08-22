import React from "react";
import FlexBox from "../../common/FlexBox";
import { useNavigate, Text } from "zmp-ui";
import CustomButton from "../../common/CustomButton";
import { useVirtualKeyboardVisible } from "../../../hooks/useVirtualKeyboardVisible";

type Props = {
    validateFunc?: () => boolean;
    handleNext: () => void;
    handlePrev: () => void;
    nextContent?: string;
    prevContent?: string;
    loadingFeeDetails: boolean;
};

function VoluntaryFooter({
    validateFunc,
    handleNext,
    handlePrev,
    nextContent = "Xác nhận",
    prevContent = "Quay lại",
    loadingFeeDetails,
}: Props) {
    const isKeyboardVisible = useVirtualKeyboardVisible();
    const navigate = useNavigate();
    if (isKeyboardVisible) return null;
    return (
        <div
            className="p-4 fixed bottom-0 left-0 bg-white w-full"
            style={{
                boxShadow: "-10px 0px 10px #E2E8F0",
            }}
        >
            <FlexBox className="justify-between mb-2">
                    <Text.Title className="text-[#565758] text-lg zaui-text-title">
                        Tổng phí thanh toán
                    </Text.Title>
                    <Text.Title className="text-lg text-[#1E3880]">
                        66.000
                    </Text.Title>
                </FlexBox>
            <FlexBox className="justify-between">
            
                <CustomButton
                    content={prevContent}
                    className="flex justify-center items-center rounded-xl p-2 pl-8 pr-8 bg-white text-gray-800 border"
                    onClick={() => {
                        if (validateFunc) {
                            if (validateFunc()) handlePrev();
                        } else {
                            handlePrev();
                        }
                    }}
                />
                <CustomButton
                    content={nextContent}
                    className="flex justify-center items-center text-white rounded-xl bg-blue-700 p-2 pl-8 pr-8"
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

export default VoluntaryFooter;
