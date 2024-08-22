import React from "react";
import FlexBox from "../../../../common/FlexBox";
import ProtectIcon from "../../../../svgs/ProtectIcon";
import { Switch, Text } from "zmp-ui";
import { ICreateHealthAttachedPerson } from "../../../../../interfaces/insurance";

type Props = {
  micVTSKAdditionalBenefits: ICreateHealthAttachedPerson['micVTSKAdditionalBenefits'];
  handleUpdateBeneficiaryPersonInfo: (
    key: keyof ICreateHealthAttachedPerson,
    value: ICreateHealthAttachedPerson['micVTSKAdditionalBenefits']
  ) => void;
};

const MICVTSKAdditionalBenefits = ({
  micVTSKAdditionalBenefits,
  handleUpdateBeneficiaryPersonInfo,
}: Props) => {
  const handleSwitchChange = (key: keyof typeof micVTSKAdditionalBenefits , value: boolean) => {
    const newValue = { ...micVTSKAdditionalBenefits };
    newValue[key] = value;
    handleUpdateBeneficiaryPersonInfo("micVTSKAdditionalBenefits", newValue);
  };
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
        <Text.Title className="text-base pt-2">Tử vong, thương tật toàn bộ vĩnh viễn không do tai nạn bao gồm cả bệnh Ung thư</Text.Title>
        <Switch
          onChange={(e) =>
            handleSwitchChange("bs01", e.target.checked)
          }
          checked={micVTSKAdditionalBenefits.bs01}
        />
      </FlexBox>
      <FlexBox className="justify-between">
        <Text.Title className="text-base pt-2">Trợ cấp thai sản</Text.Title>
        <Switch
          onChange={(e) =>
            handleSwitchChange("bs02", e.target.checked)
          }
          checked={micVTSKAdditionalBenefits.bs02}
        />
      </FlexBox>
    </div>
  );
};

export default MICVTSKAdditionalBenefits;
