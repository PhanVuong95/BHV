import React, { } from "react";
import { useNavigate } from "react-router-dom";
import { Icon, Text, DatePicker } from "zmp-ui";
import LayoutHeader from "../../layouts/LayoutHeader";
import CollapseWrap from "../../common/Collapse";
import FlexBox from "../../common/FlexBox";
import CalculationFooter from "./CalculationFooter";
import CustomButton from "../../common/CustomButton";

import { 
  composeValidator,
  isEmpty,
  isGTE,
  isLTE, 
} from "../../../helpers/validator";



type Props = {
  setStep?: React.Dispatch<React.SetStateAction<number>>;
};
const NonComplulsoryInsuranceCal = (props: Props) => {
  const {
    setStep = () => {},
  } = props;
  const navigate = useNavigate();
  return (
    <>
      <LayoutHeader
        showBackIcon={true}
        title={<Text className="text-white">Tính BHXH tự nguyện</Text>}
        onBackClick={() => {
          navigate("/social-insurance");
        }}
      />
      <div className="bg-white mt-2 p-4">
        <CollapseWrap
          title="Giai đoạn đóng bảo hiểm #1"
          height={0}
          defaultOpen={true}
          content={[
            {
              type: "text",
              content: "Thời gian đóng ",
            },
            {
              type: "text",
              content:
                "Mức lương đóng BHXH giai đoạn này",
            }
            ,
          ]}
        />
      </div>


      
     
      <CalculationFooter
        nextContent="Tính BHXH"
        handlePrev={() => {
          setStep((step) => step - 1);
        }}
        handleNext={() => {
          if (
            composeValidator(
              [isEmpty, isLTE, isGTE],
              true,
              { min: 1, max: 100 }
            ).status === "error"
          )
            return;
        }}
      />
    </>
  );
};

export default NonComplulsoryInsuranceCal;
