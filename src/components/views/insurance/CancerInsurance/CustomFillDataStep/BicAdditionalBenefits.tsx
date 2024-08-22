import React from "react";
import FlexBox from "../../../../common/FlexBox";
import ProtectIcon from "../../../../svgs/ProtectIcon";
import { Switch, Text } from "zmp-ui";
import { ICreateCancerAttachedPerson } from "../../../../../interfaces/insurance";
import CustomTitle from "../../../../Title/CustomTitle";

type Props = {
  bicIsStroke: boolean;
  handleUpdateBeneficiaryPersonInfo: (
    key: keyof ICreateCancerAttachedPerson,
    value: boolean
  ) => void;
};

const BICAdditionalBenefits = ({
  bicIsStroke,
  handleUpdateBeneficiaryPersonInfo,
}: Props) => {
  return (
    <div className="px-4">
      <CustomTitle
        title='QUYỀN LỢI BỔ SUNG'
      />
      <div className="p-4 pb-0" style={{ marginTop: 12, boxShadow: '0px 2px 6px 0px #1E5DFC26' }}>
        <FlexBox className="justify-between pt-1.5 pb-3">
          <Text.Title className="text-base fw-600">
            Đột quỵ
          </Text.Title>
          <Switch
            onChange={(e) =>
              handleUpdateBeneficiaryPersonInfo("bicIsStroke", e.target.checked)
            }
            checked={bicIsStroke}
          />
        </FlexBox>
      </div>
    </div>
  );
};

export default BICAdditionalBenefits;
