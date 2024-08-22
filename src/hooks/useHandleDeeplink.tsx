import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useRecoilValue, useSetRecoilState } from "recoil";
import config from "../contants/config";
import { EQrCodeType } from "../enums";
import { setStorage } from "../services/storage";
import { dynamicApiCall } from "../services/user";
import { referrerState, userState } from "../state";

export interface IDeepLinkCallApiState {
  type: EQrCodeType.CALL_API;
  data: { pathname: string; body: any; callback: string };
}
export interface IDeepLinkReferState {
  type: EQrCodeType.REFER;
  data: { referrerId: string; callback: string };
}

export interface IDeepLinkLoginPortalState {
  type: EQrCodeType.LOGIN_PORTAL;
  data: { pathname: string; body: any; callback: string };
}

export type DeepLinkStateType = (
  | IDeepLinkCallApiState
  | IDeepLinkReferState
  | IDeepLinkLoginPortalState
) & { disableCallback?: boolean };

const useHandleDeeplink = () => {
  const user = useRecoilValue(userState);
  const { search } = useLocation();

  const setReferrerState = useSetRecoilState(referrerState);
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const handleQrCodeType = async (state: DeepLinkStateType) => {
    switch (state?.type) {
      case EQrCodeType.CALL_API:
        {
          if (state?.data.pathname.includes("login")) break;
          const { message } = await dynamicApiCall(
            state?.data.pathname,
            "POST",
            { ...state?.data.body, dynamicApiCall: true }
          );

          if (message) {
            addToast(message, {
              autoDismiss: true,
              appearance: "info",
            });
          }
        }
        break;

      case EQrCodeType.REFER:
        {
          await dynamicApiCall("/my/referrer/access-log/deeplink", "PUT", {
            referrerId: state.data.referrerId,
          });
          const refID = await dynamicApiCall("/my/user/checkParentAgency", "POST", {
            referrerId: state.data.referrerId,
          }) as any
          setReferrerState({ referrerId: refID.id});
          // await setStorage("referrer", {
          //   referrerId: refID.id,
          //   // expire: ~~(Date.now() / 1000) + config.EXPIRE_INVITE,
          // });
        }
        break;
      default:
        break;
    }
    console.log(JSON.stringify(state.data));
    if (state.disableCallback) return;
    if (state.data.callback) {
      navigate(state.data.callback);
    } else {
      navigate("/home");
    }
  };
  const handleUTMSOurce = async (state: string) => {
    if (state) {
      const refID = await dynamicApiCall("/my/user/checkUTMSource", "POST", {
        referrerId: state,
      }) as any
      setReferrerState({ referrerId: refID.id});
      // await setStorage("referrer", {
      //   referrerId: refID.id,
      //   // expire: ~~(Date.now() / 1000) + config.EXPIRE_INVITE,
      // });
    }
  };
  const handleTag = async (state: string) => {
    if (state && state?.length > 0) {
      await dynamicApiCall("/my/user/addTagFollower", "POST", {
        tag: state,
      })
    }
  };
  const handleGetState = (state: string | DeepLinkStateType,stateName?: string) => {
    console.log(state, "deep Link");

    if (typeof state == "object") {
      console.log("contentData", state);
      return state;
    }

    if (typeof state == "string") {
      // deeplink
      if (stateName) {
      const stateStr = new URL(state).searchParams.get(stateName) as string;
      return JSON.parse(atob(stateStr));
      } else {
        const stateStr = new URL(state).searchParams.get("state") as string;
      return JSON.parse(atob(stateStr));
      }
    }
  };
  const handleStringState = (state: string, stateName: string) => {
    const stateStr = new URL(state).searchParams.get(stateName) as string;
    return stateStr;
  };
  const handleDeeplink = async (state: string | DeepLinkStateType, stateName) => {
    // object

    console.log("handle deeplink");

    try {
      await handleQrCodeType(handleGetState(state, stateName));
    } catch (error) {
      console.error("handleDeeplink error:", error);

      navigate("/home");
    }
  };
  useEffect(() => {
    if (user && search.includes("utmSource")) {
      console.log("handle utmsource");
      try {
        handleUTMSOurce(handleStringState(window.location.href, 'utmSource')).catch((error) => {
          console.log(error);
        })
      } catch (error) {
        console.error("handle utmSource error:", error);
        navigate("/home");
      }
    } else {
      if (user && search.includes("state"))
        handleDeeplink(window.location.href, 'state').catch((error) => {
          console.error(error);
        });
    }
    if (user && search.includes("tags")) {
      try {
        handleTag(handleStringState(window.location.href, 'tags')).catch((error) => {
          console.log(error);
        })
      } catch (error) {
        console.error("handle tag error:", error);
        navigate("/home");
      }
    }
  }, [search, user]);

  return {
    handleDeeplink,
    handleGetState,
  };
};

export default useHandleDeeplink;
