import React from "react";
import { useSetRecoilState } from "recoil";
import { Text, useNavigate } from "zmp-ui";
import { globalState } from "../../../state";
import FlexBox from "../../common/FlexBox";

export interface ISuggestionItem {
  Icon: React.ReactElement;
  label: string;
  isCommingSoon?: boolean;
  href?: string;
}

const SuggestionItem = ({
  Icon,
  label,
  isCommingSoon,
  href,
}: ISuggestionItem) => {
  const setGlobal = useSetRecoilState(globalState);
  const navigate = useNavigate();
  return (
    <FlexBox
      onClick={() => {
        if (isCommingSoon) {
          setGlobal((global) => ({
            ...global,
            activeCommingSoonFeaturePopup: true,
          }));
        } else if (href) navigate(href);
      }}
      className="flex-col items-center bg-white rounded-xl p-2 m-2  drop-shadow"
    >
      <div className="py-2">{Icon}</div>
      <Text className="text-xs text-center pt-2">{label}</Text>
    </FlexBox>
  );
};

export default SuggestionItem;
