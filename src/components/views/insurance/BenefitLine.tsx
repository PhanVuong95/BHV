import FlexBox from "../../common/FlexBox";
import React from "react";
import { Text } from "zmp-ui";

export const BenefitLine = ({
  items,
}: {
  items: { title: string; value: string | number }[];
}) => {
  return (
    <>
      {items.map(({ title, value }) => (
        <FlexBox
          className="justify-between text-gray-500 py-1"
          key={value + title}
        >
          <Text className="w-2/3">{`⌙ ${title}`}</Text>
          <Text className="w-1/3 text-right">{value}</Text>
        </FlexBox>
      ))}
    </>
  );
};
