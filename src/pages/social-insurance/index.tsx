import React from "react";
import { Page } from "zmp-ui";
import LayoutHeader from "../../components/layouts/LayoutHeader";
import Navigation from "../../components/layouts/Navigation";
import SettingRoute from "../../components/views/account/SettingRoute";
import UserCard from "../../components/views/home/UserCard";
import withLogin from "../../hooks/withLogin";
import { ECalculationFeature } from "../../enums/insurance";

const SocialInsurancePage: React.FunctionComponent = () => {
  return (
    <Page className="page">
      <div
        className="body pb-24"
        style={{ paddingTop: 0, background: "rgba(0,0,0,0.05)" }}
      >
        <LayoutHeader transparent />
        <div className="bg-gradient pt-11">
          <UserCard />
        </div>
        <SettingRoute
          header="BHXH tự nguyện"
          items={[
            {
              label: "Đóng BHXH tự nguyên",
              href: `/social-insurance/${ECalculationFeature.voluntary}`,
              commingSoon: false,//dòng này để bật tính năng báo Comming soon
            }
          ]}
        />

        <SettingRoute 
          header="Công cụ tính BHXH"
          items={[
            {
              label: "Bảo hiểm xã hội bắt buộc",
              href: "/social-insurance/tool11",
              commingSoon: true,
            },
            {
              label: "Bảo hiểm xã hội tự nguyện",
              href: `/social-insurance/${ECalculationFeature.BHXH_TUNGUYEN}`,// cái này chính là a đang làm dở
            },
            {
              label: "Bảo hiểm xã hội tự nguyện và bảo hiểm xã hội bắt buộc",
              href: "/social-insurance/tool13",
              commingSoon: true,
            },
          ]}
        />

        <SettingRoute
          header="Công cụ tra cứu BHXH"
          items={[
            {
              label: "Tra cứu mã số BHXH",
              href: "/social-insu rance/tool21",
              commingSoon: true,
            },
            {
              label: "Tra cứu quá trình đóng BHXH",
              href: "/social-insurance/tool22",
              commingSoon: true,
            },
            {
              label: "Tra cứu thời hạn của BHYT ",
              href: "/social-insurance/tool23",
              commingSoon: true,
            },
          ]}
        />
      </div>

      <Navigation />
    </Page>
  );
};

export default withLogin(SocialInsurancePage);
