import React from "react";
import { Icon } from "zmp-ui";
import { IconProps } from "zmp-ui/icon";
import Loading from "./Loading";
import { twMerge } from "tailwind-merge";

type Props = {
  iconProps?: IconProps & { Icon?: React.ReactElement };
  content: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  disable?: boolean;
  loading?: boolean;
};

const CustomButton = ({
  iconProps,
  content,
  style,
  className,
  disable,
  loading,
  ...props
}: Props) => {
  return (
    <div
      className={twMerge(
        `flex justify-center bg-red items-center bg-blue-600 text-white pt-2 pb-2 pl-4 pr-4 rounded-xl `,
        className
      )}
      style={{
        ...style,
        ...((disable || loading) && {
          pointerEvents: "none",
          opacity: 0.5,
        }),
      }}
      {...props}
    >
      {loading ? (
        <Loading
          style={{
            height: 20,
            width: 20,
          }}
        />
      ) : (
        <>
          {content}
          {iconProps?.icon && <Icon {...iconProps} />}
          {iconProps?.Icon}
        </>
      )}
    </div>
  );
};

export default CustomButton;
