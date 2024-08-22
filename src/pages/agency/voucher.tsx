import React from "react";
import { Page } from "zmp-ui";
import LayoutHeader from "../../components/layouts/LayoutHeader";
import Navigation from "../../components/layouts/Navigation";
import withLogin from "../../hooks/withLogin";

type Props = {};

const AgencyVoucherPage = (props: Props) => {
  return (
    <Page className="page">
      <div className="body pb-24" style={{ paddingTop: 0 }}>
        <LayoutHeader showBackIcon />
      </div>
      <Navigation />
    </Page>
  );
};

export default withLogin(AgencyVoucherPage);
