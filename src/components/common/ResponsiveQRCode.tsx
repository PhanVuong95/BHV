import React from "react";
import { Button } from "zmp-ui";
import { QR_GEN_ID } from "../../contants";
import FlexBox from "./FlexBox";
import { saveImage } from "../../services/zalo";
import { useToasts } from "react-toast-notifications";
import { getBase64QRCode } from "../../helpers/dom";
import QRCode from "react-qr-code";

type Props = {
  value: string;
  className?: string;
};

const ResponsiveQRCode = ({ value }: Props) => {
  const { addToast } = useToasts();

  const downloadQRCode = async () => {
    // Generate download with use canvas and stream
    try {
      const pngBase64 = getBase64QRCode();
      if (!pngBase64) {
        await addToast("Có lỗi xảy ra", {
          appearance: "error",
          autoDismiss: true,
        });
        return;
      }
      await saveImage(pngBase64);
      await addToast("Đã lưu", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      console.error(error);
      await addToast("Có lỗi xảy ra", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };
  return (
    <FlexBox className="flex-col items-center" style={{ margin: "0 -40px" }}>
      {/* <img
        crossOrigin="anonymous"
        id={QR_GEN_ID}
        style={{ 
          width: "100%",
          maxWidth: "400px"
         }}
        src={`https://quickchart.io/qr?text=${value}`}
      /> */}

<div style={{ height: "auto", margin: "12px auto 0px auto", maxWidth: 268, width: "100%" }}>
  <QRCode
    size={256}
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={value}
    viewBox={`0 0 268 268`}
  />
</div>

      <Button
        type="highlight"
        onClick={downloadQRCode}
        size="small"
        className="m-4 text-xs"
      >
        Tải QR Code
      </Button>
    </FlexBox>
  );
};

export default ResponsiveQRCode;
