import React from "react";
import { useRecoilValue } from "recoil";

import config from "../../../contants/config";
import { EQrCodeType } from "../../../enums";
import { EInsuranceFeature } from "../../../enums/insurance";
import { DeepLinkStateType } from "../../../hooks/useHandleDeeplink";
import { shareCurrentPage, version } from "../../../services/zalo";
import { userState } from "../../../state";
import FlexBox from "../../common/FlexBox";
import { Button } from "antd";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  thumbnail: string;
  title: string;
  description: string;
  feature: EInsuranceFeature;
};

const InsuranceIntro = ({
  setStep,
  thumbnail,
  title,
  description,
  feature,
}: Props) => {
  const user = useRecoilValue(userState);
  const deepLinkState: DeepLinkStateType = {
    data: {
      referrerId: String(user.id),
      callback: `/insurance/${feature}`,
    },
    type: EQrCodeType.REFER,
  };

  const versionQuery = config?.DEV ? config.VITE_ZALO_ENV : "";
  const deeplink =
    "?" +
    versionQuery + "&" +
    new URLSearchParams({
      state: btoa(JSON.stringify(deepLinkState)),
    }).toString();
  return (
    <>
      <FlexBox
        className="fixed bottom-0 justify-center left-0 p-4 "
        style={{
          width: "100%",
          background: "white",
          boxShadow: "-10px 0px 10px #E2E8F0",
          fontWeight: 600
        }}
      >
        <Button
          onClick={() => {
            shareCurrentPage({
              title,
              description,
              thumbnail,
              path: deeplink,
            });

          }}
          style={{ height: '48px' }} className="mr-4 border-primary-color text-primary-color cback flex-1 fw-600 fs-16">
          Chia sẻ
        </Button>
        <Button
          onClick={() => {
            setStep((step) => step + 1);
          }}
          style={{ height: '48px' }} className="confirm flex-1 fw-600 fs-16">
          Mua ngay
        </Button>
      </FlexBox>
    </>
  );
};

export default InsuranceIntro;
