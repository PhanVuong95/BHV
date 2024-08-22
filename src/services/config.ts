import config from "../contants/config";
import { IAppConfig } from "../interfaces";

export const getAppConfig = async (): Promise<IAppConfig> => {
  const url = `${config.API_HOST}/config`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await res.json();
  if (res.ok) return resData;
  else throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
};
