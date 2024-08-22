import React from "react";
import { Text } from "zmp-ui";
import FlexBox from "./FlexBox";

type Props = { description?: string; className?: string };

const Empty = ({ description, className }: Props) => {
  return (
    <FlexBox
      className={`w-full h-full items-center justify-center flex-col ${
        className || ""
      }`}
    >
      <img
        src="https://i.ibb.co/Kw6NCJX/sketch.png"
        alt="empty"
        style={{
          width: 120,
          height: 120,
        }}
      />

      {description && (
        <Text className="text-xs text-gray-500 p-4">{description}</Text>
      )}
    </FlexBox>
  );
};

export default Empty;
