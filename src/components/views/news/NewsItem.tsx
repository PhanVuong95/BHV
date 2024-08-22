import React from "react";
import { SkeletonImage } from "zmp-framework/react";
import { Icon, Text } from "zmp-ui";
import FlexBox from "../../common/FlexBox";

type Props = {};

const NewsItem = (props: Props) => {
  return (
    <>
      <div
        style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}
        className="mt-6 mb-4"
      />
      <FlexBox className="pt-4">
        <SkeletonImage
          className="pl-4 pr-4"
          tag="div"
          showIcon
          iconColor="gray"
          color="rgba(0,0,0,0.05)"
          width={120}
          height={80}
          effect="wave"
          borderRadius="10px"
        />
        <div>
          <Text.Title className="text-xl">
            Title Title Title Title xxxxxx
          </Text.Title>
          <FlexBox className="pt-1">
            <Icon icon="zi-clock-1" size={14} className="text-gray-500" />
            <Text className="text-center text-sm pl-2 text-gray-500">
              dd/mm/yyy HH:mm AM
            </Text>
          </FlexBox>
        </div>
      </FlexBox>
    </>
  );
};

export default NewsItem;
