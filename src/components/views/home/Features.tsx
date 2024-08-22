import React from "react";
import { useRecoilValue } from "recoil";
import { EInsuranceFeature } from "../../../enums/insurance";
import { insuranceServicesState } from "../../../state";
import AccidentSvg from "../../svgs/AccidentSvg";
import AutoSvg from "../../svgs/AutoSvg";
import HomeInsuranceSvg from "../../svgs/HomeInsuranceSvg";
import MotorSvg from "../../svgs/MotorSvg";
import TravelSvg from "../../svgs/TravelSvg";
import FeatureItem, { IFeatureItem } from "./FeatureItem";
import HealthSvg from "../../svgs/HealthSvg";
import DomesticTravelSvg from "../../svgs/DomesticTravelSvg";
import FireSvg from "../../svgs/FireSvg";
import StudentSvg from "../../svgs/StudentSvg";
import CancerSvg from "../../svgs/CancerSvg";
import ExtendedAccidentSvg from "../../svgs/ExtendedAccidentSvg";
//       label: "Sức khoẻ",
//       label: "Học sinh sinh viên",
//       label: "Ung thư",
// tai nạn mở rộng,
// tai nạn cá nhấn

function Features() {
  const insuranceServicesValue = useRecoilValue(insuranceServicesState);
  const features: IFeatureItem[] = [
    {
      Icon: <AutoSvg width={40} height={40} />,
      label: "Ô tô",
      href: `/insurance/${EInsuranceFeature.AUTO_01}`,
      key: EInsuranceFeature.AUTO_01,
    },
    {
      Icon: <MotorSvg width={40} height={40} />,
      label: "Xe máy",
      href: `/insurance/${EInsuranceFeature.MOTOR_01}`,
      key: EInsuranceFeature.MOTOR_01,
    },
    {
      Icon: <AccidentSvg width={40} height={40} />,
      label: "Tai nạn cá nhân",
      href: `/insurance/${EInsuranceFeature.PERSONAL_01}`,
      key: EInsuranceFeature.PERSONAL_01,
    },
    {
      Icon: <HomeInsuranceSvg width={40} height={40} />,
      label: "Nhà tư nhân",
      href: `/insurance/${EInsuranceFeature.HOME_01}`,
      key: EInsuranceFeature.HOME_01,
    },
    {
      Icon: <ExtendedAccidentSvg width={40} height={40} />,
      label: "Tai nạn mở rộng",
      href: `/insurance/${EInsuranceFeature.PERSONAL_02}`,
      key: EInsuranceFeature.PERSONAL_02,
    },
    {
      Icon: <DomesticTravelSvg width={40} height={40} />,
      label: "Du lịch trong nước",
      href: `/insurance/${EInsuranceFeature.TRAVEL_01}`,
      key: EInsuranceFeature.TRAVEL_01,
    },
    {
      Icon: <FireSvg width={40} height={40} />,
      label: "Cháy nổ",
      href: `/insurance/${EInsuranceFeature.FIRE_01}`,
      key: EInsuranceFeature.FIRE_01,
    },
    {
      Icon: <TravelSvg width={40} height={40} />,
      label: "Du lịch quốc tế",
      href: `/insurance/${EInsuranceFeature.TRAVEL_02}`,
      key: EInsuranceFeature.TRAVEL_02,
    },
    {
      Icon: <HealthSvg width={40} height={40} />,
      label: "Sức khoẻ",
      href: `/insurance/${EInsuranceFeature.HEALTH_01}`,
      key: EInsuranceFeature.HEALTH_01,
    },
    {
      Icon: <StudentSvg width={40} height={40} />,
      label: "Học sinh - sinh viên",
      href: `/insurance/${EInsuranceFeature.STUDENT_01}`,
      key: EInsuranceFeature.STUDENT_01,
    },

    {
      Icon: <CancerSvg width={40} height={40} />,
      label: "Ung thư",
      href: `/insurance/${EInsuranceFeature.HEALTH_02}`,
      key: EInsuranceFeature.HEALTH_02,
    },
  ].map((item: IFeatureItem) => {
    const featureConfig = insuranceServicesValue.features.find(
      (feature) => feature.feature === item.key
    );
    return {
      ...item,

      isCommingSoon:
        featureConfig?.isCommingSoon || item.isCommingSoon || !featureConfig,
    };
  });
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

export default Features;
