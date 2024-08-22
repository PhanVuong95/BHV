import React from "react";
import FlexBox from "./FlexBox";

type Props = { style?: React.CSSProperties };

const Loading = ({ style = { width: 30, height: 30 } }: Props) => {
  return (
    <FlexBox className="w-full h-full items-center justify-center">
      <FlexBox
        className="w-full h-full items-center justify-center"
        style={{ ...style }}
      >
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </FlexBox>
    </FlexBox>
  );
};

export default Loading;
