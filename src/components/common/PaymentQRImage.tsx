import React from "react";
import { QR_GEN_ID } from "../../contants";
import { EBank } from "../../enums";
type Props = {
  paymentIntent?: {
    rawData?: {
      data?: string
    }
  }
};
const PaymentQRImage = ({ paymentIntent }: Props) => {
  const src = paymentIntent?.rawData?.data
  return <img src={`data:image/png;base64,${src}`} id={QR_GEN_ID} crossOrigin="anonymous" width="100%" />;
};

export default PaymentQRImage;
