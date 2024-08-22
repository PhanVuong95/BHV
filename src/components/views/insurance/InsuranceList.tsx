import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Text } from "zmp-ui";
import { EInsuranceGroup } from "../../../enums/insurance";
import { globalState, insuranceServicesState } from "../../../state";
import FlexBox from "../../common/FlexBox";
import { ChevronRightSvg } from "../../svgs/ChevronRightSvg";

type Props = {
  groupValue?: EInsuranceGroup;
};

const InsuranceList = ({ groupValue }: Props) => {
  const setGlobal = useSetRecoilState(globalState);

  const navigate = useNavigate();
  const insuranceServices = useRecoilValue(insuranceServicesState);
  const insuranceFeatures = useMemo(
    () =>
      insuranceServices.features.filter(
        (item) => item.group === groupValue || !groupValue
      ),
    [groupValue, insuranceServices]
  );

  return (
    <div>
      {insuranceFeatures.map((feature) => (
        <FlexBox
          key={feature.feature}
          className="justify-between items-center p-4 border-b"
          onClick={() => {
            if (feature.isCommingSoon) {
              setGlobal((global) => ({
                ...global,
                activeCommingSoonFeaturePopup: true,
              }));
            } else navigate(`/insurance/${feature.feature}`);
          }}
        >
          <div>
            <Text className="font-medium text-lg leading-6 mb-1 mt-1">
              {feature.title}
            </Text>
            <Text className="font-normal text-sm leading-4 text-gray-500">
              {feature.description}
            </Text>
          </div>
          <ChevronRightSvg />
        </FlexBox>
      ))}
    </div>
  );
};

export default InsuranceList;
