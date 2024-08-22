import config from "../contants/config";
import { EGamePlatform, EGameType } from "../interfaces/game";
import { getStorage } from "./storage";

export const getGameConfig = async (data: {
  type: EGameType;
}): Promise<any> => {
  const url = `${config.API_HOST}/public/games/config?${new URLSearchParams(
    data as any
  ).toString()}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await res.json();
  if (res.ok) return resData;
  else throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
};

export const getGameTurn = async (data: { type: EGameType }): Promise<any> => {
  const url = `${config.API_HOST}/my/games/turn?${new URLSearchParams(
    data as any
  ).toString()}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
  });
  const resData = await res.json();
  if (res.ok) return resData;
  else throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
};
export const getUserLog = async (data: { type: EGameType }): Promise<any> => {
  const url = `${config.API_HOST}/my/games/log?${new URLSearchParams(
    data as any
  ).toString()}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
  });
  const resData = await res.json();
  if (res.ok) return resData;
  else throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
};
export const submitGameLog = async (data: {
  gameType: EGameType;
  reward: string;
  platform: EGamePlatform;
}): Promise<{
  phone: string;
}> => {
  const res = await fetch(`${config.API_HOST}/my/games/log`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
  });
  const resData = await res.json();
  if (res.ok) return resData;

  throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
};
