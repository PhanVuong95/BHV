import { unionBy } from "lodash";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getInsuranceServices } from "../../services/insurance";
import {
  globalState,
  insuranceServicesState,
  referrerState,
  userState,
} from "../../state";
import { DeepLinkStateType } from "../../hooks/useHandleDeeplink";
import { deleteStorage, setStorage } from "../../services/storage";
import { getAppConfig } from "../../services/config";
import { useNavigate } from "zmp-ui";
import useOA from "../../hooks/useOA";
import useRole from "../../hooks/useRole";
import { dynamicApiCall, getReferrerIdViaServer, loginViaZalo } from "../../services/user";
import api, { getUserInfo } from "zmp-sdk";
import { useLocation } from "react-router";
import { useToasts } from "react-toast-notifications";
import { EQrCodeType } from "../../enums";
import { followOA, getAccessToken } from "../../services/zalo";
// import { authorize  } from "zmp-sdk/apis";
import { getSetting } from "zmp-sdk/apis";
const KEY_CONFIRM_FOLLOW_OA = 'KEY_CONFIRM_FOLLOW_OA'
const Initial = () => {
  const [_referrer, setReferrerState] = useRecoilState(referrerState);
  const [checkConfirmFollowOA, setCheckConfirmFollowOA] = useState(localStorage.getItem(KEY_CONFIRM_FOLLOW_OA) !== null)

  //start
  // const setReferrerState = useSetRecoilState(referrerState);
  const [user, setUser] = useRecoilState(userState);
  const [global, setGlobal] = useRecoilState(globalState);
  const [loggedIn, setloggedIn] = useState(false);
  //after login
  const { search } = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const handleFollowOA = async () => {
    await followOA(() => {
      setCheckConfirmFollowOA(true)
      localStorage.setItem(KEY_CONFIRM_FOLLOW_OA, JSON.stringify(true))
      setCheckConfirmFollowOA(true)
    })
  }
  useEffect(() => {
   if(!checkConfirmFollowOA)handleFollowOA()
  }, [])
  const getUser = async () => {
    try {
      try {
        const data = await getSetting({});
      } catch (error) {
        // xử lý khi gọi api thất bại
        console.log(error);
      }

      // const data = await authorize({
      //   scopes: ["scope.userLocation", "scope.userPhonenumber","scope.getUserInfo"],
      // });

      const { userInfo } = await getUserInfo({});
      if (!loggedIn) {
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
            const refererId = await getReferrerIdViaServer();
            console.log(refererId);
            if (refererId?.id) {
              setReferrerState({ referrerId: refererId.id });
            }
          },
          fail: (error) => {
            console.log(error);
          },
        });
      }
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };
  useEffect(() => {
    getUser()
  }, [search, user, loggedIn]);
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
          setReferrerState({ referrerId: refID.id });
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
      setReferrerState({ referrerId: refID.id });
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
  const handleGetState = (state: string | DeepLinkStateType, stateName?: string) => {
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


  //end
  const [visible, setvisible] = useState(true);
  // const { user , loggedIn} = useLogin();
  // useHandleDeeplink(); // handel after login
  const { openChat } = useOA();
  const [_globalValue, setGlobalValue] = useRecoilState(globalState);
  const setInsuranceServices = useSetRecoilState(insuranceServicesState);
  // const follow = async () => {
  //   await followOA()

  // };
  // useEffect(() => {
  //   if (!user?.zaloOAId) follow()
  // }, [user?.zaloOAId])


  useEffect(() => {
    getInsuranceServices().then((res) => {
      setInsuranceServices((data) => ({
        ...data,
        groups: unionBy([...data.groups, ...res.groups], "value"),
        features: res.features,
      }));
    });
  }, []);
  useEffect(() => {
    deleteStorage<{
    }>("referrer").then((referrer) => {
      console.log("delete Storage");
    });
  }, []);

  useEffect(() => {
    getAppConfig().then((res) => {
      setGlobalValue((value) => ({
        ...value,
        config: {
          ...value.config,
          ...res,
        },
      }));
    });
  }, []);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const closeBanner = () => {
    setIsBannerVisible(false);
  };
  let { isAgency } = useRole();
  let data = {
    image: "https://i.ibb.co/yR10sm5/Added-Photo-2.png",
    secondHref: `https://youtube.com`,
    firstTile: `Mua bảo hiểm dễ dàng`,
    secondTile: `Mua bảo hiểm dễ dàng, nhận hỗ trợ \n online nhanh chóng 24/7 với ứng dụng Bảo hiểm Việt. `,
    mainBtnText: `Mua bảo hiểm ngay`,
    secondBtnText: `Tôi cần tư vấn`,
    customClass: '',
  }

  if (!isAgency) {
    data.image = "https://i.ibb.co/S0cznFW/Added-Photo-1.png";
    data.firstTile = ` HOA HỒNG LÊN TỚI 50%`,
      data.secondTile = `Khi đăng ký trở thành cộng tác viên của Bảo Hiểm Việt, mức hoa hồng được chiết khấu lên tới 50% `,
      data.mainBtnText = `Đăng ký làm cộng tác viên`;
    data.secondBtnText = `Tìm hiểu thêm`;
    data.customClass = '';
  }
  if (!user?.id) return null;
  if (user?.zaloId && visible)

    return (
      <>
        {/* <FollowOA /> */}
        {/* {user?.zaloOAId && (<Banner
          data={data}
          isAgency={isAgency}
          isBannerVisible={isBannerVisible}
          closeBanner={closeBanner}
        />)}
        <div className="fixed"
          style={{
            zIndex: 20,
            left: 'calc(100% - 64px)',
            bottom: '50%'
          }}>
          <div className="pulse-animation">
          </div>
          <div className="pulse-animation-2">
          </div>
          <div
            className=" bottom-20 left-4 p-2"
            style={{
              zIndex: 22,
              borderRadius: "34px 34px 34px  8px ",
              background: "transparent",

              left: '0',
              bottom: '-60px',
              position: "absolute"
            }}
          >
            <div
              className="absolute top-[-10px] right-[-10px]"
              onClick={(e) => {
                e.stopPropagation();
                setvisible(false);
              }}
              style={{ width: "max-content", height: "max-content" }}
            >
              <Icon icon="zi-close-circle-solid" />
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                openChat("Tôi cần hỗ trợ");
              }}
            >
              <img
                src="https://inet.vn/public/img/svg/iNET-icon-splite-v1.svg#free-call-live-chat-icon"
                style={{
                  height: "46px",
                  width: "40px",
                  maxWidth: "unset",
                  objectFit: "contain",
                }}
                className="img-conatct"
              />
            </div>
          </div>
        </div> */}
      </>
    );

  return null;
};

export default Initial;
