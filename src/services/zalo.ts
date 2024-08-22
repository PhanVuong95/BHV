import api, { createShortcut, OpenShareSheetReturns } from "zmp-sdk";
import config from "../contants/config";
import { EQrCodeType } from "../enums";
import { getStorage } from "./storage";
import { IUser } from "./user";

export const { version, apiVersion, zaloVersion, platform, language } =
  api.getSystemInfo();

export const getAccessToken = () =>
  new Promise((resolve, reject) => {
    api.getAccessToken({
      success: (token) => {
        if (
          (!token || token === "DEFAULT ACCESS TOKEN") &&
          config.DEFAULT_ACCESS_TOKEN
        ) {
          // eslint-disable-next-line no-param-reassign
          token = config.DEFAULT_ACCESS_TOKEN; // For testing purpose only
        }
        resolve(token);
      },
      fail: (error) => {
        reject(error);
      },
    });
  });

export const updateFollower = async (): Promise<IUser> => {
  const res = await fetch(`${config.API_HOST}/my/user/follow-OA`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
  });
  return await res.json();
};

export const followOA = async (cb): Promise<IUser> =>
  new Promise((resolve, reject) => {
    api.followOA({
      id: config.OA_ID,
      success: async () => {
        if(cb){
          cb()
        }
        console.log("followed");
        const updatedUser = await updateFollower();

        resolve(updatedUser);
      },
      fail: (err) => {
        console.log("Failed to follow OA. Details: ", err);
        // reject(err);
      },
    });
  });

export const getUser = (): Promise<IUser> =>
  new Promise((resolve, reject) => {
    api.getUserInfo({
      success: (data) => {
        const { userInfo } = data;
        resolve(userInfo);
      },
      fail: (err) => {
        console.log("Failed to follow OA. Details: ", err);
        reject(err);
      },
    });
  });

export const openChatScreen = async (
  zaloUserId: string,
  type: "user" | "oa" = "oa",
  message = "Xin chào"
) => {
  try {
    await api.openChat({
      type,
      id: zaloUserId,
      message,
    });
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};

export const saveImage = async (base64: string) => {
  try {
    await api.saveImageToGallery({
      imageBase64Data: base64,
    });
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
    throw error;
  }
};

export const scanQR = async (): Promise<
  | {
    type: EQrCodeType;
    data: any;
  }
  | string
> => {
  try {
    const { content } = await api.scanQRCode({});
    return JSON.parse(content);
  } catch (error) {
    const { content } = await api.scanQRCode({});
    // xử lý khi gọi api thất bại
    console.log(error);
    return content;
  }
};

export const shareCurrentPage = async (data: {
  title: string;
  description: string;
  thumbnail: string;
  path?: string;
}): Promise<OpenShareSheetReturns | null> => {
  try {
    const link = await api.getShareableLink({
      path: data.path,
      thumbnail: data.thumbnail,
      title: data.title,
      description: data.description.substr(0, 250),
    });
    const res = await api.openShareSheet({
      type: "link",
      data: {
        link,
      },
    });

    return res;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const shareLink = async (link: string) => {
  try {
    await api.openShareSheet({
      type: "link",
      data: {
        link,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const openUrlInWebview = async (url: string) => {
  try {
    await api.openOutApp({
      url,
    });
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log("Open out app error: ", error);
    try {
      await api.openWebview({ url });
    } catch (error) {
      console.log("Open in app error: ", error);
    }
  }
};

export const createMiniAppShortcut = async () => {
  try {
    await createShortcut({
      params: {
        utm_source: "shortcut",
      },
    });
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};

export const getZaloTagFollower = async (): Promise<string[]> => {
  const res = await fetch(`${config.API_HOST}/public/user/get-zalo-tag`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
  });
  return await res.json();
};
