import React, { useEffect, useState } from "react";
import { Page, Spinner, Text, useNavigate } from "zmp-ui";
import FlexBox from "../components/common/FlexBox";
import LayoutHeader from "../components/layouts/LayoutHeader";

import Steps from "../components/views/welcome/Steps";
import useRole from "../hooks/useRole";
import { getStorage } from "../services/storage";

const WelcomePage: React.FunctionComponent = () => {
  const [loading, setloading] = useState(true);
  const { userData } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.id) return;

    const stateStr = new URL(window.location.href).searchParams.get(
      "state"
    ) as string;
    if (!stateStr) {
      // new user
      if (new Date(userData.createdAt).getTime() > Date.now() - 60 * 1000) {
        setloading(false);
      } else navigate("/home"); // old user
    } else {
      // hold
    }
  }, [userData]);

  if (loading)
    return (
      <Page className="page">
        <FlexBox
          className="body bg-white pl-9 pr-9 items-center justify-center"
          style={{}}
        >
          <Spinner />
        </FlexBox>
      </Page>
    );

  return (
    <Page className="page">
      <LayoutHeader />

      <div className="body bg-white pl-9 pr-9" style={{}}>
        <Text className="text-right mt-4 text-xs text-gray-600 italic"></Text>
        <Steps />
        <div
          className=" pt-8 text-center pr-0 text-blue-400"
          onClick={() => navigate("/home")}
        >
          Bỏ qua &gt;&gt;
        </div>
      </div>
    </Page>
  );
};

export default WelcomePage;
