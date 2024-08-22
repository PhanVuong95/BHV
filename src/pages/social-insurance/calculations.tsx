import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Page } from "zmp-ui";
import { ECalculationFeature } from "../../enums/insurance";
import withLogin from "../../hooks/withLogin";
import NonComplulsoryInsuranceCal from "../../components/views/social-insurance/NonComplulsoryInsuranceCal";
import FirstStepFillData from "../../components/views/social-insurance/NextForm";
import moment from "moment";
import { EGender } from "../../enums";
import VoluntarySocialInsurance from "../../components/views/social-insurance/VoluntarySocialInsurance";

const InsuranceCalculationsPage: React.FunctionComponent = () => {
  const { feature } = useParams();
  const [insuranceData, setInsuranceData] = useState<any>(
    {
      // vehicleLoad: 12,
      // customerPrice: "10.000.000",
      startDate: new Date(),
      fee: 0.1,
      attachedList: [
        {
          fullName: "Nguyễn Văn A",
          gender: EGender.FEMALE,
          birthday: moment().subtract(18, "years").valueOf(),
          address: "123 Xuân La",
          identityCardNum: "123565",
        },
        {
          fullName: "Nguyễn Văn B",
          gender: EGender.FEMALE,
          birthday: moment().subtract(18, "years").valueOf(),
          address: "123 Xuân La",
          identityCardNum: "123565",
        },
        {
          fullName: "Nguyễn Văn C",
          gender: EGender.FEMALE,
          birthday: moment().subtract(18, "years").valueOf(),
          address: "123 Xuân La",
          identityCardNum: "123565",
        },
       
        
      ],
    }
  );
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  return (
    <Page className="page">
      <div className="body" >
        {(feature as unknown as ECalculationFeature) ==
          ECalculationFeature.BHXH_TUNGUYEN && <NonComplulsoryInsuranceCal />}

        {(feature as unknown as ECalculationFeature) ==
          ECalculationFeature.voluntary && <VoluntarySocialInsurance
            insuranceData={insuranceData}
            setInsuranceData={setInsuranceData}
            setStep={setStep} 
            step={step}/>}
      </div>
    </Page>
  );
};

export default withLogin(InsuranceCalculationsPage);
