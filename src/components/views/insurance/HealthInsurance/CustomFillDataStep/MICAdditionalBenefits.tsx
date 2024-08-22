import React from "react";
import FlexBox from "../../../../common/FlexBox";
import ProtectIcon from "../../../../svgs/ProtectIcon";
import { Switch, Text } from "zmp-ui";
import { ICreateHealthAttachedPerson } from "../../../../../interfaces/insurance";
import { MICHealthPackageValue } from "../../../../../enums/insurance";

type Props = {
  micAdditionalBenefits: ICreateHealthAttachedPerson['micAdditionalBenefits'];
  handleUpdateBeneficiaryPersonInfo: (
    key: keyof ICreateHealthAttachedPerson,
    value: ICreateHealthAttachedPerson['micAdditionalBenefits']
  ) => void;
  micPackage : MICHealthPackageValue
};

const MICAdditionalBenefits = ({
  micAdditionalBenefits,
  handleUpdateBeneficiaryPersonInfo,
  micPackage
}: Props) => {
  const handleSwitchChange = (key: keyof typeof micAdditionalBenefits , value: boolean) => {
    const newValue = { ...micAdditionalBenefits };
    newValue[key] = value;
    handleUpdateBeneficiaryPersonInfo("micAdditionalBenefits", newValue);
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
        <Text.Title className="text-base pt-2">Điều trị ngoại trú do ốm đau, bệnh tật</Text.Title>
        <Switch
          onChange={(e) =>
            handleSwitchChange("bs1", e.target.checked)
          }
          checked={micAdditionalBenefits.bs1}
        />
      </FlexBox>
      <FlexBox className="justify-between">
        <Text.Title className="text-base pt-2">Quyền lợi nha khoa</Text.Title>
        <Switch
          onChange={(e) =>
            handleSwitchChange("bs2", e.target.checked)
          }
          checked={micAdditionalBenefits.bs2}
        />
      </FlexBox>
      {micPackage !== MICHealthPackageValue.BRONZE && micPackage !== MICHealthPackageValue.SILVER 
        && (
          <FlexBox className="justify-between">
            <Text.Title className="text-base pt-2">Quyền lợi thai sản</Text.Title>
            <Switch
              onChange={(e) =>
                handleSwitchChange("bs3", e.target.checked)
              }
              checked={micAdditionalBenefits.bs3}
            />
          </FlexBox>
        )
      } 
      <FlexBox className="justify-between">
        <Text.Title className="text-base pt-2">Tử vong, thương tật toàn bộ vĩnh viễn không do nguyên nhân tai nạn</Text.Title>
        <Switch
          onChange={(e) =>
            handleSwitchChange("bs4", e.target.checked)
          }
          checked={micAdditionalBenefits.bs4}
        />
      </FlexBox>
    </div>
  );
};

export default MICAdditionalBenefits;
