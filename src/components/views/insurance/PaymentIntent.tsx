import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";

import { Button, Text, Modal, useNavigate, Icon } from "zmp-ui";
import config from "../../../contants/config";
import { getBase64QRCode } from "../../../helpers/dom";
import useCountdown from "../../../hooks/useCountdown";
import useOA from "../../../hooks/useOA";
import useSocket from "../../../hooks/useSocket";
import { IPaymentTransaction } from "../../../interfaces/payment";

import { confirmPaymentIntentPaid } from "../../../services/insurance";
import { openUrlInWebview, saveImage } from "../../../services/zalo";
import CustomButton from "../../common/CustomButton";
import FlexBox from "../../common/FlexBox";
import InsurancePdf from "../../common/InsurancePdf";
import PaymentQRImage from "../../common/PaymentQRImage";
import moment from "moment";

const PaymentIntent = ({
  paymentIntent,
  setStep,
  step,
}: {
  paymentIntent: IPaymentTransaction;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  step: number;
}) => {
  const { addToast } = useToasts();
  const { handleFollow, needFollow } = useOA();
  const [_days, _hours, minutes, seconds] = useCountdown(
    paymentIntent.amount
      ? new Date(paymentIntent?.rawData?.exp * 1000)
      : new Date()
  );
  useEffect(() => {
    if (minutes < 0 && seconds < 0) {
      if (!paymentIntent.billId?.includes("zero_bill")) {
        setStep(step - 1);
      }
    }
  }, [minutes, seconds]);
  const navigate = useNavigate();
  const [pdfUrl, setpdfUrl] = useState("");
  const [paid, setPaid] = useState(false);

  useSocket({
    namespace: "/insurance",
    handleMessage: (message) => {
      if (
        message.event === "INSURANCE_CREATED" &&
        message.data.insurance?.transactionId === paymentIntent.id
      ) {
        setTimeout(() => {
          setpdfUrl(message.data.pdfUrl);
        }, 3000);
      }
    },
  });

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

  useSocket({
    namespace: "/payment",
    handleMessage: (message) => {
      if (
        message.event === "PAYMENT_INTENT_PAID" &&
        message.data.transaction?.id === paymentIntent.id
      ) {
        setPaid(true);
      }
    },
  });

  if (pdfUrl)
    return (
      <div className="items-center w-full flex-col bg-white h-full">
        <Text className="p-5 pt-3 text-center font-normal text-xs mt-4 italic">
          Giấy chứng nhận sẽ được gửi qua tin nhắn cho bạn (nếu đã theo dõi Bảo
          Hiểm Thành Công)
        </Text>
        <InsurancePdf
          src={pdfUrl}
          transactionId={paymentIntent.id}
          maxHeight={"80vh"}
        />

        <FlexBox className="m-4 justify-around">
          <div
            className="bg-cyan-500 items-center flex text-white pl-4 pr-4 pt-1 pb-1"
            style={{ borderRadius: 20, width: "max-content" }}
            onClick={() => openUrlInWebview(pdfUrl)}
          >
            <Icon icon="zi-download" />
            <Text className="pl-1">Tải xuống</Text>
          </div>

          <div
            className="items-center flex pl-4 pr-4 pt-1 pb-1 border"
            style={{ borderRadius: 20, width: "max-content" }}
            onClick={() => navigate("/home")}
          >
            <Icon icon="zi-home" />
            <Text className="pl-1">Trang chủ</Text>
          </div>
        </FlexBox>
      </div>
    );

  if (!paymentIntent.amount) {
    return (
      <FlexBox className="items-center w-full flex-col bg-white h-full pt-8">
        <img
          src="https://i.ibb.co/Gc0gdNp/Screen-Shot-2023-03-03-at-18-34-07.png"
          alt="Screen-Shot-2023-03-03-at-18-34-07"
          style={{ width: 134, height: 134 }}
        />

        <Text className="p-5 pt-3 text-center font-normal text-sm">
          Cảm ơn bạn đã tin tưởng Bảo Hiểm Việt, hệ thống sẽ tự điều hướng bạn
          trong giây lát.
        </Text>

        <Button
          type="highlight"
          className="w-1/2"
          style={{
            minWidth: "max-content",
          }}
          fullWidth
          size="small"
          onClick={() => navigate("/insurance")}
        >
          Danh sách bảo hiểm đã mua
        </Button>
      </FlexBox>
    );
  }
  return (
    <>
      {(!paid && (
        <>
          <div
            className="fs-14 fw-500 p-4"
            style={{ color: "#000000", textAlign: "center" }}
          >
            Vui lòng thực hiện thanh toán qua hình thức QR Pay, hệ thống sẽ tự
            động xử lý sau khi nhận tiền.
          </div>
          <div className="text-center">
            Hết hạn sau:{" "}
            <span className="text-primary-color">
              {" "}
              {minutes} phút {seconds} giây
            </span>
          </div>

          <FlexBox className="justify-center items-center flex-col pl-4 pr-4">
            <PaymentQRImage paymentIntent={paymentIntent} />
            <div className="relative w-100">
              <CustomButton
                className="mt-4 mb-2 w-full fw-600"
                content="Lưu ảnh về máy"
                onClick={downloadQRCode}
              />
              <svg
                style={{
                  position: "absolute",
                  right: "86px",
                  top: "25px",
                }}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99859 15.0616C9.85452 15.0617 9.71043 15.0068 9.60051 14.8968L5.85037 11.1467C5.63072 10.927 5.63072 10.5709 5.85037 10.3513C6.07001 10.1316 6.42613 10.1316 6.64578 10.3513L9.43652 13.142L9.43652 1C9.43652 0.689374 9.68834 0.437561 9.99896 0.437561C10.3096 0.437561 10.5614 0.689374 10.5614 1V13.1405L13.3506 10.3513C13.5703 10.1316 13.9264 10.1316 14.1461 10.3513C14.3657 10.5709 14.3657 10.927 14.1461 11.1467L10.4136 14.8791C10.3108 14.9913 10.1627 15.0616 9.99859 15.0616C9.99871 15.0616 9.99846 15.0616 9.99859 15.0616Z"
                  fill="white"
                />
                <path
                  d="M0.999939 12.8125C1.31057 12.8125 1.56238 13.0644 1.56238 13.375V15.9997C1.56238 17.3457 2.65357 18.4369 3.99962 18.4369H15.9983C17.3444 18.4369 18.4356 17.3457 18.4356 15.9997V13.375C18.4356 13.0644 18.6874 12.8125 18.998 12.8125C19.3086 12.8125 19.5604 13.0644 19.5604 13.375V15.9997C19.5604 17.967 17.9656 19.5618 15.9983 19.5618H3.99962C2.03231 19.5618 0.4375 17.967 0.4375 15.9997V13.375C0.4375 13.0644 0.689313 12.8125 0.999939 12.8125Z"
                  fill="white"
                />
              </svg>
            </div>
            <CustomButton
              style={{
                background: "white",
                border: "1px solid var(--primary-color)",
              }}
              className="mb-2 w-full fw-600 text-blue-700 font-semibold"
              content="Về trang chủ"
              onClick={() => navigate("/home")}
              // onClick={() => setStep((step) => Math.max(0, step - 1))}
            />
            {config.DEV && (
              <Button
                type="highlight"
                fullWidth
                onClick={() => {
                  confirmPaymentIntentPaid({
                    billID: paymentIntent?.rawData?.data?.paymentID,
                  });
                }}
              >
                Fake Đã chuyển khoản
              </Button>
            )}
          </FlexBox>
        </>
      )) || (
        <Modal visible>
          <FlexBox className="items-center w-full flex-col bg-white h-full pt-8">
            <img
              src="https://i.ibb.co/Gc0gdNp/Screen-Shot-2023-03-03-at-18-34-07.png"
              alt="Screen-Shot-2023-03-03-at-18-34-07"
              style={{ width: 134, height: 134 }}
            />
            <Text.Title className="text-xl">Thanh toán thành công</Text.Title>
            {!needFollow && (
              <Text className="p-5 pt-3 text-center font-normal text-sm">
                Cảm ơn bạn đã tin tưởng
                <br /> <strong>Bảo Hiểm Việt</strong>, hệ thống sẽ tự điều hướng
                bạn trong giây lát.
              </Text>
            )}

            {needFollow && (
              <Text className="p-5 pt-3 text-center font-normal text-sm">
                Ấn <strong>Đồng ý</strong> và <strong>xác nhận</strong> để nhận
                hợp đồng điện tử
              </Text>
            )}
            <Button
              type="highlight"
              className="w-1/2"
              style={{
                minWidth: "max-content",
              }}
              fullWidth
              onClick={() => {
                if (needFollow) handleFollow();
                else navigate("/insurance");
              }}
            >
              {needFollow ? "Đồng ý" : "Danh sách bảo hiểm của bạn"}
            </Button>
          </FlexBox>
        </Modal>
      )}
    </>
  );
};

export default PaymentIntent;
