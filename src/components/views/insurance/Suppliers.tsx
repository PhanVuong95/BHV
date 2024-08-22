import React from "react";

import { EInsuranceSource } from "../../../enums/insurance";
import MICSvg from "../../svgs/MICSvg";
import PVISvg from "../../svgs/PVISvg";
import VBISvg from "../../svgs/VBISvg";
import BICSvg from "../../svgs/BICSvg";

export const SuppilerLogos = (props?: {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}) => ({
  [EInsuranceSource.PVI]: <PVISvg {...props} />,
  [EInsuranceSource.VBI]: <VBISvg {...props} />,
  [EInsuranceSource.MIC]: <MICSvg {...props} />,
  [EInsuranceSource.BIC]: <BICSvg {...props} />,
});
