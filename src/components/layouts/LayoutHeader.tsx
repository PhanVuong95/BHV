import React from "react";
import { Header, useNavigate } from "zmp-ui";
import { ChevronRightSvg } from "../svgs/ChevronRightSvg";
import { LogoSvg } from "../svgs/LogoSvg";

type Props = {
  transparent?: boolean;
  showBackIcon?: boolean;
  title?: any;
  onBackClick?: () => void;
};

const LayoutHeader = ({
  transparent,
  showBackIcon = false,
  title = (
    <img
      src="https://i.ibb.co/GpVYDfL/baohiemviet-logo-white-horizontal.png"
      alt="Group-639"
      className="h-6 px-1"
    />
  ),
  onBackClick,
}: Props) => {
  const navigate = useNavigate();
  return (
    <Header
      title={title}
      className="bg-gradient"
      style={{
        ...(transparent && {
          backgroundColor: "rgba(0,0,0,0)",
          background: "unset",
        }),
      }}
      backIcon={
        <ChevronRightSvg
          className="m-1"
          fill="white"
          style={{
            transform: "rotate(180deg)",
          }}
        />
      }
      showBackIcon={showBackIcon}
      {...((showBackIcon || onBackClick) && {
        onBackClick: () => {
          if (onBackClick) {
            onBackClick();
          } else {
            navigate(-1);
          }
        },
      })}
    />
  );
};

export default LayoutHeader;
