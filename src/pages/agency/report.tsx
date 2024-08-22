import React from "react";
import { Page, Tabs } from "zmp-ui";
import LayoutHeader from "../../components/layouts/LayoutHeader";
import { Global } from "iconsax-react";

import Navigation from "../../components/layouts/Navigation";
import withLogin from "../../hooks/withLogin";
import FlexBox from "../../components/common/FlexBox";
import DirectRefererReport from "../../components/views/agency/DirectRefererReport";
import IndirectRefererReport from "../../components/views/agency/IndirectRefererReport";
import CustomButton from "../../components/common/CustomButton";
import useLoginPortal from "../../hooks/useLoginPortal";

const AgencyReportPage: React.FunctionComponent = () => {
  const { handleOpenPortal, loading } = useLoginPortal();
  return (
    <Page className="page">
      <div className="body pb-36 " style={{ paddingTop: 60 }}>
        <LayoutHeader showBackIcon />
        <style>
          {`
          .zaui-tabs-tabbar-item {
            width: 50%;
            text-align: center;
          }
        `}
        </style>
        <Tabs>
          <Tabs.Tab
            key="directly"
            label="Tự giới thiệu"
            style={{
              width: "100%",
            }}
          >
            <FlexBox className="p-4">
              <DirectRefererReport />
            </FlexBox>
          </Tabs.Tab>
          <Tabs.Tab key="indirectly" label="Đại lý cấp dưới">
            <FlexBox className="p-4">
              <IndirectRefererReport />
            </FlexBox>
          </Tabs.Tab>
        </Tabs>
        <FlexBox className="w-full justify-center mt-4">
          <CustomButton
            loading={loading}
            onClick={handleOpenPortal}
            className="flex-row-reverse"
            iconProps={{
              Icon: <Global size="24" className="pr-2" color="#ffffff" />,
            }}
            content="Xem chi tiết trên portal"
          />
        </FlexBox>
      </div>

      <Navigation />
    </Page>
  );
};

export default withLogin(AgencyReportPage);
