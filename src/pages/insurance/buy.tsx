import React from "react";
import { useParams } from "react-router-dom";
import { Page } from "zmp-ui";
import InsuranceCarForm from "../../components/views/insurance/AutoInsurance/AutoInsurance";
import HomeInsurance from "../../components/views/insurance/HomeInsurance";
import MotorInsurance from "../../components/views/insurance/MotorInsurance";
import PersonalAccidentInsurance from "../../components/views/insurance/PersonalAccidentInsurance";
import { EInsuranceFeature } from "../../enums/insurance";
import withLogin from "../../hooks/withLogin";
import DomesticTravelInsurance from "../../components/views/insurance/DomesticTravelInsurance";
import OverseaTravelInsurance from "../../components/views/insurance/OverseaTravelInsurance";
import HealthInsurance from "../../components/views/insurance/HealthInsurance";
import StudentInsurance from "../../components/views/insurance/StudentInsurance";
import FireInsurance from "../../components/views/insurance/FireInsurance";
import CancerInsurance from "../../components/views/insurance/CancerInsurance";
import ExtendedAccidentInsurance from "../../components/views/insurance/ExtendedAccidentInsurance";

const BuyInsurancePage: React.FunctionComponent = () => {
  const { feature } = useParams();

  return (
    <Page className="page">
      <div className="body" style={{ background: "unset" }}>
        {(feature as unknown as EInsuranceFeature) ==
          EInsuranceFeature.MOTOR_01 && <MotorInsurance />}
        {(feature as unknown as EInsuranceFeature) ==
          EInsuranceFeature.AUTO_01 && <InsuranceCarForm />}
        {(feature as unknown as EInsuranceFeature) ==
          EInsuranceFeature.PERSONAL_01 && <PersonalAccidentInsurance />}
        {(feature as unknown as EInsuranceFeature) ==
          EInsuranceFeature.TRAVEL_01 && <DomesticTravelInsurance />}
        {(feature as unknown as EInsuranceFeature) ==
          EInsuranceFeature.TRAVEL_02 && <OverseaTravelInsurance />}
        {(feature as unknown as EInsuranceFeature) ==
          EInsuranceFeature.HOME_01 && <HomeInsurance />}
        {(feature as unknown as EInsuranceFeature) ==
          EInsuranceFeature.HEALTH_01 && <HealthInsurance />}
        {(feature as unknown as EInsuranceFeature) ==
          EInsuranceFeature.STUDENT_01 && <StudentInsurance />}
        {(feature as unknown as EInsuranceFeature) ==
          EInsuranceFeature.FIRE_01 && <FireInsurance />}
        {(feature as unknown as EInsuranceFeature) ==
          EInsuranceFeature.HEALTH_02 && <CancerInsurance />}
        {(feature as unknown as EInsuranceFeature) ==
          EInsuranceFeature.PERSONAL_02 && <ExtendedAccidentInsurance />}
      </div>
    </Page>
  );
};

export default withLogin(BuyInsurancePage);
