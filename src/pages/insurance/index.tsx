import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Page, useNavigate } from "zmp-ui";
import FlexBox from "../../components/common/FlexBox";
import Navigation from "../../components/layouts/Navigation";
import TransactionList from "../../components/views/account/TransactionList";
import { EInsuranceStatus } from "../../enums/insurance";
import withLogin from "../../hooks/withLogin";
import LayoutHeaderV2 from "../../components/layouts/LayoutHeaderV2";

const InsurancePage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [tab, settab] = useState<EInsuranceStatus>(EInsuranceStatus.PURCHASED);

  return (
    <Page className="page">
      <div className="body pb-24" style={{ background: "white" }}>
        <LayoutHeaderV2
          title={' '}
          onBackClick={() => {
            navigate("/home");
          }}
          showBackIcon
        />
        <div className="p-4">
          <FlexBox
            className="sticky top-0 shadow-lg"
            style={{
              zIndex: 999,
              marginTop: 12,
              background: '#DEE7FE',
              padding: '6px',
              width:'calc(100% + 6px)'
            }}
          >
            {[
              { key: EInsuranceStatus.CART, lable: "Đang mua" },
              { key: EInsuranceStatus.PURCHASED, lable: "Đã mua" },
              { key: EInsuranceStatus.OTHER, lable: "Khác" },
            ].map((item) => (
              <FlexBox
                style={{
                  width: '33%',
                  textAlign: 'center'
                  // background: 'red'
                }}
                key={item.key} onClick={() => settab(item.key)}>
                <div
                  style={{
                    padding: '6px 16px 6px 16px',
                    width: '100%',
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: '14px'
                  }}
                  className={twMerge(
                    "p-2 opacity-50",
                    (tab === item.key &&
                      "font-semibold opacity-100") ||
                    ""
                  )}
                >
                  {item.lable}
                </div>
              </FlexBox>
            ))}
          </FlexBox>
        </div>
        <TransactionList status={tab} />
      </div>
      <Navigation />
    </Page>
  );
};

export default withLogin(InsurancePage);
