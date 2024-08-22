import React, { useMemo } from "react";
import { ETagType } from "../../enums";

const tagConfigs: {
  [key in ETagType]: {
    label: string;
    style?: React.CSSProperties;
    className?: string;
  };
} = {
  [ETagType.COMMING_SOON]: {
    label: "SẮP RA MẮT",
    style: {
      background: "#B0E6FB",
      fontSize: 8,
      boxShadow: "1px 3px 3px rgba(0,0,0,0.3)",
    },
  },
  [ETagType.HOT]: {
    label: "HOT",
    style: {
      color: "white",
      fontSize: 8,
      boxShadow: "1px 3px 3px rgba(0,0,0,0.3)",
    },
    className: "bg-red-700 text-white",
  },
  [ETagType.NEW]: {
    label: "Tính năng mới",
    style: {
      color: "white",
      fontSize: 8,
      boxShadow: "1px 3px 3px rgba(0,0,0,0.3)",
    },
  },
};

const Tag = ({
  type,
  style,
  className,
}: {
  type: ETagType;
  style?: React.CSSProperties;
  className?: string;
}) => {
  const config = useMemo(() => tagConfigs[type], [type]);
  return (
    <div
      style={{ height: "max-content", ...config.style, ...style }}
      className={`rounded-xl font-semibold pl-2 pr-2 pt-0.3 pb-0.3 text-xs ${
        config?.className
      } ${className || ""}`}
    >
      {config.label}
    </div>
  );
};

export default Tag;
