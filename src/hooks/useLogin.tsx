import api from "zmp-sdk";

import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { globalState, referrerState, userState } from "../state";
import { getAccessToken } from "../services/zalo";
import { setStorage } from "../services/storage";
import { getReferrerIdViaServer, loginViaZalo } from "../services/user";
import useHandleDeeplink from "./useHandleDeeplink";
import { async } from "q";

const useLogin = () => {
  const setReferrerState = useSetRecoilState(referrerState);
  const [user, setUser] = useRecoilState(userState);
  const [global, setGlobal] = useRecoilState(globalState);
  const [loggedIn, setloggedIn] = useState(false);

  useEffect(() => {
    setGlobal((global) => ({
      ...global,
      logged: true,
    }));
    api.login({
      success: async () => {
        // accessToken
        const accessToken = await getAccessToken();

        const { user: validUserInfo, jwtAccessToken } = await loginViaZalo(
          accessToken
        );
        await setStorage("jwtAccessToken", jwtAccessToken);
        setUser((user) => ({ ...user, ...validUserInfo }));
        setloggedIn(true);
      },
      fail: (error) => {
        console.log(error);
      },
    });
  }, []);
  // useEffect( () => {
  //   async function afterLogin() {
  //     console.log('After login')
  //     try {
  //       useHandleDeeplink();
  //       const refererId = await getReferrerIdViaServer();
  //       setReferrerState({ referrerId: refererId.id });
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   }
  //   afterLogin();
  // }, [loggedIn]);
  return {
    user,
    loggedIn
  };
};

export default useLogin;
