import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { BottomNavigation, Icon } from "zmp-ui";
import useRole from "../../hooks/useRole";
import { globalState, userState } from "../../state";
import { AccountFillSvg } from "../svgs/AccountFillSvg";
import { AccountSvg } from "../svgs/AccountSvg";
import { ConfirmFilledSvg } from "../svgs/ConfirmFilledSvg";
import { ConfirmSvg } from "../svgs/ConfirmSvg";
import { HomeFillSvg } from "../svgs/HomeFillSvg";
import { HomeSvg } from "../svgs/HomeSvg";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, isAgency } = useRole();
  const [_globale, setGlobal] = useRecoilState(globalState);

  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    if (location?.pathname) setActiveTab(location.pathname || "home");
  }, [location?.pathname]);

  const phone = userData?.phone;

  const navigations: {
    label: string;
    href: string;
    icon: React.ReactNode;
    activeIcon: React.ReactNode;
    commingSoon?: boolean;
    disabled?: boolean;
  }[] = [
    {
      label: "Trang chủ",
      href: "/home",
      icon: <HomeSvg />,
      activeIcon: <HomeFillSvg />,
    },

    {
      label: "BHXH",
      href: "/social-insurance",
      icon: <Icon icon="zi-note" size={26} style={{ padding: "8px 0px" }} />,
      activeIcon: (
        <Icon icon="zi-note" size={26} style={{ padding: "8px 0px" }} />
      ),
      disabled:
        !phone?.startsWith("84986253214") &&
        !phone?.startsWith("84936968885") &&
        !phone?.startsWith("84915456885"),
    },

    {
      label: "Hợp đồng",
      href: "/insurance",
      icon: (
        <svg
          style={{ marginTop: 8 }}
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 12.1974H15.5"
            stroke="#646464"
            strokeWidth="1.5"
            sstrokeMiterlimitt="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 16.1974H12.88"
            stroke="#646464"
            strokeWidth="1.5"
            sstrokeMiterlimitt="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.5 5.99744H14.5C16.5 5.99744 16.5 4.99744 16.5 3.99744C16.5 1.99744 15.5 1.99744 14.5 1.99744H10.5C9.5 1.99744 8.5 1.99744 8.5 3.99744C8.5 5.99744 9.5 5.99744 10.5 5.99744Z"
            stroke="#646464"
            strokeWidth="1.5"
            sstrokeMiterlimitt="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.5 4.01746C19.83 4.19746 21.5 5.42746 21.5 9.99746V15.9975C21.5 19.9975 20.5 21.9975 15.5 21.9975H9.5C4.5 21.9975 3.5 19.9975 3.5 15.9975V9.99746C3.5 5.43746 5.17 4.19746 8.5 4.01746"
            stroke="#646464"
            strokeWidth="1.5"
            sstrokeMiterlimitt="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      activeIcon: (
        <svg
          style={{ marginTop: 8 }}
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 12.1974H15.5"
            stroke="var(--primary-color)"
            strokeWidth="1.5"
            sstrokeMiterlimitt="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 16.1974H12.88"
            stroke="var(--primary-color)"
            strokeWidth="1.5"
            sstrokeMiterlimitt="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.5 5.99744H14.5C16.5 5.99744 16.5 4.99744 16.5 3.99744C16.5 1.99744 15.5 1.99744 14.5 1.99744H10.5C9.5 1.99744 8.5 1.99744 8.5 3.99744C8.5 5.99744 9.5 5.99744 10.5 5.99744Z"
            stroke="var(--primary-color)"
            strokeWidth="1.5"
            sstrokeMiterlimitt="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.5 4.01746C19.83 4.19746 21.5 5.42746 21.5 9.99746V15.9975C21.5 19.9975 20.5 21.9975 15.5 21.9975H9.5C4.5 21.9975 3.5 19.9975 3.5 15.9975V9.99746C3.5 5.43746 5.17 4.19746 8.5 4.01746"
            stroke="var(--primary-color)"
            strokeWidth="1.5"
            sstrokeMiterlimitt="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Cá nhân",
      href: "/account",
      icon: <AccountSvg />,
      activeIcon: <AccountFillSvg />,
    },
    {
      label: "Đối tác",
      href: "/agency",
      icon: <ConfirmSvg />,
      activeIcon: <ConfirmFilledSvg />,
      disabled: !isAgency,
    },
  ].filter((item) => !item.disabled);

  return (
    <BottomNavigation
      id={"bottom-nav"}
      fixed
      activeKey={activeTab}
      style={{
        zIndex: 1000,
      }}
      onChange={(key) => {}}
    >
      {navigations.map((navigation) => (
        <BottomNavigation.Item
          onClick={() => {
            if (navigation.commingSoon) {
              setGlobal((global) => ({
                ...global,
                activeCommingSoonFeaturePopup: true,
              }));
            } else {
              setActiveTab(navigation.href);
              navigate(navigation.href);
            }
          }}
          key={navigation.href}
          label={navigation.label}
          icon={navigation.icon}
          activeIcon={navigation.activeIcon}
        />
      ))}
    </BottomNavigation>
  );
};

export default Navigation;
