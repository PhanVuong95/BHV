import React from "react";
import { useRecoilValue } from "recoil";
import { EInsuranceFeature } from "../../../enums/insurance";
import { insuranceServicesState } from "../../../state";
import TravelSvg from "../../svgs/TravelSvg";
import FeatureItem, { IFeatureItem } from "./FeatureItem";

function ListMiniGame() {
  const insuranceServicesValue = useRecoilValue(insuranceServicesState);
  const features: any[] = [
    {
      Icon: <TravelSvg width={40} height={40} />,
      label: "Vòng quay may mắn",
      href: `/home/MiniGame`,
    },
  ]
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 pb-4">
        {features.slice(0, 2).map((item) => (
          <FeatureItem {...item} />
        ))}
      </div>
      <div className="grid grid-cols-3 ">
        {features.slice(2, features.length).map((item) => (
          <FeatureItem {...item} />
        ))}
      </div>
    </div>
  );
}

export default ListMiniGame;
