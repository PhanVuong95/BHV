import React, { PropsWithChildren } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../state";
import Loading from "../components/common/Loading";
import FlexBox from "../components/common/FlexBox";

const withLogin = (Comp) => {
  return (props: PropsWithChildren) => {
    const [user, setUser] = useRecoilState(userState);
    if (!user)
      return (
        <FlexBox
          className="w-full h-full bg-white"
          style={{ minHeight: "100vh" }}
        >
          <Loading />
        </FlexBox>
      );

    return <Comp {...props} />;
  };
};

export default withLogin;
