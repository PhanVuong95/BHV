import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { Text } from "zmp-ui";
import { ETagType } from "../../../enums";
import { EInsuranceFeature } from "../../../enums/insurance";
import { globalState } from "../../../state";
import FlexBox from "../../common/FlexBox";
import Tag from "../../common/Tag";

export interface IFeatureItem {
  Icon: React.ReactElement;
  label: string;
  href?: string;
  isCommingSoon?: boolean;
  key: EInsuranceFeature;
}

const FeatureItem = ({ Icon, label, href, isCommingSoon }: IFeatureItem) => {
  const setGlobal = useSetRecoilState(globalState);
  const navigate = useNavigate();
  return (
    <FlexBox className="p-4 relative pb-1">
      <FlexBox
        onClick={() => {
          if (isCommingSoon) {
            setGlobal((global) => ({
              ...global,
              activeCommingSoonFeaturePopup: true,
            }));
          } else if (href) navigate(href);
        }}
        className="flex-col items-center w-full bg-white rounded-xl p-2 drop-shadow-xl"
        style={{
          ...(isCommingSoon && {
            opacity: 0.5,
          }),
        }}
      >
        <FlexBox
          className="items-center justify-center w-[60px] h-[60px]"
          style={{ borderRadius: "50%" }}
        >
          {Icon}
        </FlexBox>
        <Text className="text-sm text-center pt-1">{label}</Text>
      </FlexBox>
      {isCommingSoon && (
        <Tag
          className="absolute rotate-45 right-0 top-6"
          type={ETagType.COMMING_SOON}
        />
      )}
    </FlexBox>
  );
};

export default FeatureItem;
