import React, { ReactNode } from "react";
import { useSetRecoilState } from "recoil";
import { Text, useNavigate } from "zmp-ui";
import { globalState } from "../../../state";
import FlexBox from "../../common/FlexBox";
import { ChevronRightSvg } from "../../svgs/ChevronRightSvg";
import CustomTitle from "../../Title/CustomTitle";

type Props = {
  header: string;
  items: {
    label: string | ReactNode;
    href?: string;
    commingSoon?: boolean;
    onClick?: () => void;
  }[];
};

const SettingRouteItem = ({
  label,
  href,
  commingSoon,
  onClick,
}: {
  label: string | ReactNode;
  href?: string;
  commingSoon?: boolean;
  onClick?: () => void;
}) => {
  const navigate = useNavigate();

  const setGlobal = useSetRecoilState(globalState);

  return (
    <FlexBox
      className="justify-between items-center"
      style={{ borderTop: "0.5px solid rgba(0,0,0,0.05)", marginLeft: '12px', padding: '1rem 2rem 1rem 1rem' }}
      onClick={() => {
        if (commingSoon) {
          setGlobal((global) => ({
            ...global,
            activeCommingSoonFeaturePopup: true,
          }));
        } else if (onClick) {
          onClick();
        } else if (href) navigate(href);
      }}
    >
      <Text style={{display:'block',width:'100%'}}>{label}</Text>
      <ChevronRightSvg />
    </FlexBox>
  );
};

const SettingRoute = ({ header, items }: Props) => {
  return (
    <div className="mt-3 bg-white font-medium text-lg">
      <CustomTitle
        title={header}
        className="p-4"
      />
      {items.map((item) => (
        <SettingRouteItem key={item.href} {...item} />
      ))}
    </div>
  );
};

export default SettingRoute;
