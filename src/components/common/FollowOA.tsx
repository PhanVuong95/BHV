import React, { useEffect, useState } from "react";
import { Button, Page, Text } from "zmp-ui";
import useRole from "../../hooks/useRole";
import FlexBox from "./FlexBox";
import useOA from "../../hooks/useOA";

type Props = {};

const FollowOA = (props: Props) => {
  const { userData } = useRole();
  const { handleFollow, needFollow } = useOA();

  const [visible, setvisible] = useState<undefined | boolean>();

  useEffect(() => {
    if (location.pathname === "/") return;
    if (!userData) return;

    if (visible !== undefined) return;
    if (needFollow) setvisible(true);
  }, [needFollow, userData]);

  if (!visible) return null;

  return (
    <div style={{ background: "#000000b5", position: "absolute", height: "100vh", width: "100vw", zIndex: "9998" }}>
      <div
        style={{ zIndex: 99999, background: "#fff", maxWidth: "343px", margin: "auto", maxHeight: "207px", top: "50%", left: "50%", transform: "translate(-50%, -50%)", borderRadius: "8px", boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.4)", }}
        className="fixed top-0 left-0 flex justify-center w-full h-full bg-full"
      >
        {/* <img
          src="https://i.ibb.co/ky7wwch/giffycanvas-1.gif"
          style={{
            width: "100vw",
            height: "100vh",
            maxWidth: "100vw",
          }}
        /> */}
        <div className="absolute top-0 left-0 flex justify-center w-full h-full">

          <FlexBox className="absolute bottom-[10%] flex-col items-center pl-2 pr-2 pt-5 text-center">
            <Text className="text-white">
              <span className="text-follow-oa">
                Để trải nghiệm toàn bộ tính năng(nhận giấy chứng nhận, thông báo thanh toán), vui lòng cho phép Bảo Hiểm Việt theo dõi và cấp quyền đọc SĐT của bạn.
              </span>{" "}
            </Text>

          </FlexBox>

          <Button
            type="highlight"
            className="absolute top-[50%]"
            style={{ fontSize: "15px", }}
            onClick={() => {
              handleFollow();
              setvisible(false);
            }}
          >
            Theo dõi và cấp quyền đọc SĐT
          </Button>

          <div
            className="pt-8 absolute bottom-[5%] text-xs"
            style={{ color: "#006AF5", fontSize: "15px", }}
            onClick={() => setvisible(false)}
          >
            Bỏ qua
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowOA;
