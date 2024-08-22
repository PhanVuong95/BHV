import React from "react";
import FlexBox from "../../../../common/FlexBox";
import ProtectIcon from "../../../../svgs/ProtectIcon";
import { Switch, Text } from "zmp-ui";
import { ICreateHealthAttachedPerson } from "../../../../../interfaces/insurance";

type Props = {
  bicDentistry: boolean;
  bicMaternity: boolean;
  handleUpdateBeneficiaryPersonInfo: (
    key: keyof ICreateHealthAttachedPerson,
    value: boolean
  ) => void;
};

const BICAdditionalBenefits = ({
  bicDentistry,
  bicMaternity,
  handleUpdateBeneficiaryPersonInfo,
}: Props) => {
  return (
    <div className="pt-8">
      <FlexBox
        className="items-center rounded-md bg-[#FFA000] text-white p-1 pl-2 pr-2 text-xs"
        style={{ width: "max-content" }}
      >
        <ProtectIcon />
        <Text className="pl-1">QUYỀN LỢI BỔ SUNG</Text>
      </FlexBox>
      <FlexBox className="justify-between">
        <Text.Title className="text-base pt-2">Nha khoa</Text.Title>
        <Switch
          onChange={(e) =>
            handleUpdateBeneficiaryPersonInfo("bicDentistry", e.target.checked)
          }
          checked={bicDentistry}
        />
      </FlexBox>
      <FlexBox className="justify-between">
        <Text.Title className="text-base pt-2">Thai sản</Text.Title>
        <Switch
          onChange={(e) =>
            handleUpdateBeneficiaryPersonInfo("bicMaternity", e.target.checked)
          }
          checked={bicMaternity}
        />
      </FlexBox>
    </div>
  );
};

export default BICAdditionalBenefits;
