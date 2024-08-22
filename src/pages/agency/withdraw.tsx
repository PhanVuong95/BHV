import React from "react";
import { Page, Text } from "zmp-ui";
import LayoutHeader from "../../components/layouts/LayoutHeader";

import Navigation from "../../components/layouts/Navigation";
import UserCard from "../../components/views/home/UserCard";
import FlexBox from "../../components/common/FlexBox";
import PromotionCarousel from "../../components/views/home/PromotionCarousel";
import Features from "../../components/views/home/Features";
import withLogin from "../../hooks/withLogin";

const AgencyPaymentPage: React.FunctionComponent = () => {
  return (
    <Page className="page">
      <div className="body pb-24" style={{ paddingTop: 0 }}>
        <LayoutHeader />
        <div className="bg-gradient pt-11 pb-24">
          <UserCard />

          <FlexBox className="pl-4 pr-4 justify-between">
            <Text.Title
              className="max-w-[240px] text-white text-xl font-medium font-unbounded"
              style={{
                letterSpacing: "0.005em",
              }}
            >
              An tâm vững chắc thành công thật xa
            </Text.Title>
            <img
              src="https://i.ibb.co/Nj5t0zX/image-1-1.png"
              style={{
                width: 100,
                height: 68,
              }}
            />
          </FlexBox>
        </div>
        <FlexBox className="bg-white flex-col items-center">
          <Features />
          <div className="w-full p-4">
            <Text.Title className="pb-2 font-medium">
              Chương trình khuyến mãi
            </Text.Title>
          </div>
        </FlexBox>
      </div>
      <Navigation />
    </Page>
  );
};

export default withLogin(AgencyPaymentPage);
