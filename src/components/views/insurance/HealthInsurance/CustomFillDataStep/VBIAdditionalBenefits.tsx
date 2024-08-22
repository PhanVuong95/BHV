import React from "react";
import FlexBox from "../../../../common/FlexBox";
import { Switch, Text } from "zmp-ui";
import { ICreateHealthAttachedPerson } from "../../../../../interfaces/insurance";
import { VBIHealthPackageValue } from "../../../../../enums/insurance";
import CustomTitle from "../../../../Title/CustomTitle";
import CButtonSave from "../../../../CButtonSave";
type Props = {
  vbiAdditionalBenefits: ICreateHealthAttachedPerson['vbiAdditionalBenefits'];
  handleUpdateBeneficiaryPersonInfo: (
    key: keyof ICreateHealthAttachedPerson,
    value: ICreateHealthAttachedPerson['vbiAdditionalBenefits']
  ) => void;
  vbiPackage: VBIHealthPackageValue
  onCallback: () => void
};

const VBIAdditionalBenefits = ({
  vbiAdditionalBenefits,
  handleUpdateBeneficiaryPersonInfo,
  vbiPackage,
  onCallback
}: Props) => {
  const handleSwitchChange = (key: keyof typeof vbiAdditionalBenefits, value: boolean) => {
    const newValue = { ...vbiAdditionalBenefits };
    newValue[key] = value;
    handleUpdateBeneficiaryPersonInfo("vbiAdditionalBenefits", newValue);
  };
  return (
    <div className="pt-8">
      <CustomTitle
        title='QUYỀN LỢI BỔ SUNG'
      />

      <div className="p-4" style={{ marginTop: 24, boxShadow: '0px 2px 6px 0px #1E5DFC26' }}>
        <FlexBox className="justify-between pt-1.5 pb-3">
          <Text.Title className="text-base fw-600">
            Thai sản
          </Text.Title>
          <Switch
            onChange={(e) =>
              handleSwitchChange("bs1", e.target.checked)
            }
            // checked={insuranceData.occupantInsurance > 0}
            checked={vbiAdditionalBenefits.bs1}
          />
        </FlexBox>
      </div>
      <div className="p-4" style={{ marginTop: 24, boxShadow: '0px 2px 6px 0px #1E5DFC26' }}>
        <FlexBox className="justify-between pt-1.5 pb-3">
          <Text.Title className="text-base fw-600">
            Thai sản
          </Text.Title>
          <Switch
            onChange={(e) =>
              handleSwitchChange("bs2", e.target.checked)
            }
            checked={vbiAdditionalBenefits.bs2}
          />
        </FlexBox>
      </div>
      <div className="p-4" style={{ marginTop: 24, boxShadow: '0px 2px 6px 0px #1E5DFC26' }}>
        <FlexBox className="justify-between pt-1.5 pb-3">
          <Text.Title className="text-base fw-600">
            Chăm sóc và điều trị răng ngoại trú
          </Text.Title>
          <Switch
            onChange={(e) =>
              handleSwitchChange("bs3", e.target.checked)
            }
            checked={vbiAdditionalBenefits.bs3}
          />
        </FlexBox>
      </div>
      <div className="p-4" style={{ marginTop: 24, boxShadow: '0px 2px 6px 0px #1E5DFC26' }}>
        <FlexBox className="justify-between pt-1.5 pb-3">
          <Text.Title className="text-base fw-600">
            Trợ cấp nằm viện nội trú do tai nạn
          </Text.Title>
          <Switch
            onChange={(e) =>
              handleSwitchChange("bs4", e.target.checked)
            }
            checked={vbiAdditionalBenefits.bs4}
          />
        </FlexBox>
      </div>
      <CButtonSave onCallback={onCallback} />
    </div>
  );
};

export default VBIAdditionalBenefits;
