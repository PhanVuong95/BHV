import React from "react";
import { useRecoilValue } from "recoil";
import { Text } from "zmp-ui";
import useOA from "../../../hooks/useOA";
import { userState } from "../../../state";
import FlexBox from "../../common/FlexBox";
import SupportSvg from "../../svgs/SupportSvg";

const UserCard = () => {
  const user = useRecoilValue(userState);
  const { openChat } = useOA();

  return (
    <div className="p-4 w-full ">
      <FlexBox className="justify-between items-center">
        <FlexBox>
          <img
            src={
              user.avatar ||
              "https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg"
            }
            className="w-12 h-12 bg-gray-300 "
            style={{
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
          <div className="pl-4">
            <Text.Title className="text-lg text-white">
              Xin chào, {user.name}
            </Text.Title>

            <Text className="text-xs text-white">{user.phone}</Text>
          </div>
        </FlexBox>
        <FlexBox
          className="flex-col items-center"
          onClick={() => openChat("Tôi cần hỗ trợ")}
        >
          <div
            className="p-1"
            style={{
              borderRadius: "50%",
              background: "#BDCFF9",
            }}
          >
            {/* <SupportSvg /> */}
            <img
              src="https://inet.vn/public/img/svg/iNET-icon-splite-v1.svg#free-call-live-chat-icon"
              style={{
                height: "40px",
                width: "40px",
                maxWidth: "unset",
                objectFit: "contain",
              }}
              // className="shaking-animation"
            />
          </div>
          <Text className="text-xs text-white font-semibold">Hỗ trợ</Text>
        </FlexBox>
      </FlexBox>
    </div>
  );
};

export default UserCard;
