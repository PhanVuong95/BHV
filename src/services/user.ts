import { GetPhoneNumberReturns } from "zmp-sdk";
import config from "../contants/config";
import { EUserRole } from "../hooks/useRole";
import { getStorage } from "./storage";

export interface IUser {
  birthday: string;
  fullName: string;
  id: string;
  zaloId?: string;
  name: string;
  avatar: string;
  zaloOAId?: string;
  phone?: string;
  roles?: EUserRole[];
  email?: string;
  password?: "pwd" | "";
  commingSoonFeatures?: string[];
  createdAt: Date;
}
export interface IUserDetails {
  signImage: string;
  address: string;
  IDCardNum: string;
  dateOfIssue: string;
  issuedBy: string;
  dueDate: Date;
  bankAccNum: string;
  bankAccName: string;
  bankName: string;
  taxCode: string;
  gender: any;
  IDCardImages: string[];
  cardImages: string[];
  birthday: Date;
  fullName: string;
  id: string;
  zaloId?: string;
  name: string;
  avatar: string;
  zaloOAId?: string;
  phone?: string;
  roles?: EUserRole[];
  email?: string;
  password?: "pwd" | "";
  commingSoonFeatures?: string[];
  createdAt: Date;
}
export const loginViaZalo = async (
  accessToken
): Promise<{
  user: IUser;
  jwtAccessToken: string;
}> => {
  const res = await fetch(`${config.API_HOST}/public/user/login`, {
    method: "POST",
    body: JSON.stringify({ accessToken }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await res.json();
  if (res.ok) return resData;

  throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
};

export const createSignLoginPortal = async (): Promise<{
  signedStr: string;
}> => {
  const res = await fetch(`${config.API_HOST}/my/user/login-portal/signed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
  });
  const resData = await res.json();
  if (res.ok) return resData;

  throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
};

export const dynamicApiCall = async (
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "POST",
  body?: Record<string, any>
): Promise<{ message?: string }> => {
  const res = await fetch(`${config.API_HOST}${path}`, {
    ...(body && { method, body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
  });
  const resData = await res.json();
  if (res.ok) return resData;

  throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
};

export const getPhoneNumberViaServer = async (
  data: GetPhoneNumberReturns
): Promise<{
  phone: string;
}> => {
  const res = await fetch(`${config.API_HOST}/my/user/phone`, {
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

export const changePassword = async (data: {
  email: string;
  newPassword: string;
}): Promise<IUser> => {
  const res = await fetch(`${config.API_HOST}/my/user/change-pwd`, {
    method: "POST",
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
  });
  const resData = await res.json();
  if (res.ok) return resData;

  throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
};
export const getReferrerIdViaServer = async (
): Promise<{id : string}> => {
  const res = await fetch(`${config.API_HOST}/my/user/referrerId`, {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
  });
  const resData = await res.json();
  if (res.ok) return resData;
  throw new Error(resData?.message?.join() || "Có lỗi xảy ra! Lấy mã người giới thiệu");
};
export const getUserinfo = async (): Promise<IUserDetails> => {
  const res = await fetch(`${config.API_HOST}/my/user/details`, {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
  });
  const resData = await res.json();
  if (res.ok) return resData;
  throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
  
};
export const changeUserinfo = async (data: any): Promise<IUserDetails> => {
  const res = await fetch(`${config.API_HOST}/my/user/details`, {
    method: "Put",
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
  });
  const resData = await res.json();


  if (res.ok) return resData;


  throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
  
};

export const useLazyGetSingedUploadImageUrlQuery = async (fileName: string): Promise<any> => {
  const res = await fetch(`${config.API_HOST}/my/storage/image?fileName=${fileName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
  });
  const resData = await res.json();
  if (res.ok) return resData;

  throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
};

