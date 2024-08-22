import { followOA, openChatScreen } from "../services/zalo";
import config from "../contants/config";
import useRole from "./useRole";
import { useSetRecoilState } from "recoil";
import { userState } from "../state";
import { getPhoneNumber } from "zmp-sdk";
import { getPhoneNumberViaServer } from "../services/user";

const useOA = () => {
  const { userData } = useRole();

  const setUser = useSetRecoilState(userState);

  const needFollow =
    //(userData && !userData?.zaloOAId) ||
    userData && (!userData?.phone || userData?.phone?.includes("-"));

  const handleFollow = async () => {
    try {
      if (!userData.phone || userData?.phone?.includes("-")) {
        // phone
        await getPhoneNumber({
          success: async (data) => {
            const { phone } = await getPhoneNumberViaServer(data);

            setUser((user) => ({
              ...user,
              phone: phone || "",
            }));
          },
          fail: (error) => {
            console.log(error);
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
    try {
      if (!userData.zaloOAId) {
        const updatedUser = await followOA();
        setUser((user) => ({
          ...user,
          ...updatedUser,
        }));
      }
    } catch (error) {
      console.error(error);
    }

  };

  const openChat = async (message = "") => {
    if (needFollow) await followOA();
    await openChatScreen(config.OA_ID, "oa", message);
  };

  return { openChat, handleFollow, needFollow };
};

export default useOA;
