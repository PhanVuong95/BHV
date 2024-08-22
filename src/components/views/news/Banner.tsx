import React, { useState } from 'react';
import { Icon, Text, useNavigate } from "zmp-ui";
import { SkeletonImage } from "zmp-framework/react";
import FlexBox from "../../common/FlexBox";
import CustomButton from "../../common/CustomButton";
import { StringNullableChain } from "lodash";
import useOA from "../../../hooks/useOA";
import useRole from '../../../hooks/useRole';

type Props = {
  data: {
    image: string;
    mainHref?: string;
    secondHref?: string;
    firstTile?: string;
    secondTile?: string;
    mainBtnText: string;
    secondBtnText: string;
    customClass?: string;
  }
  isAgency : boolean,
  isBannerVisible : boolean,
  closeBanner : any,
};


const Banner = ({ data , isAgency , isBannerVisible , closeBanner}: Props) => {
  const { openChat } = useOA();
  const navigate = useNavigate();
  return (
    <>
    {isBannerVisible && (
      <div className='banner-backdrop'>
          <div id="home-banner">
            <img
              src={data.image}
              style={{
                height: 180,
                width: "100%",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
              onClick={() => data.mainHref && navigate(data.mainHref)}
            />
            <Text.Title className={`${data.customClass} banner-title`}>{data.firstTile}</Text.Title>
            <Text.Title className="banner-desc">{data.secondTile}</Text.Title>
            <CustomButton
              content={data.mainBtnText}
              className="banner-button"
              onClick={() =>  isAgency ? closeBanner() : navigate("/account/become-agency")}
            />
            <CustomButton
              content={data.secondBtnText}
              className="banner-button2"
              onClick={() => {
                openChat("Tôi cần hỗ trợ");
              }}
            />
            <CustomButton
                  content="x"
                  className="close-button"
                  onClick={closeBanner}
                />
          </div>
      </div>
    )}
    </>
  );
};

export default Banner;
