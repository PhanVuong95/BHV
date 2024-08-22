import config from "../contants/config";
import {
  ECategory,
  EInsuranceFeature,
  EInsuranceGroup,
  EInsuranceSource,
  EInsuranceStatus,
} from "../enums/insurance";
import {
  ICategoryResponse,
  ICreateAutoInsuranceParams,
  ICreateMotorInsuranceParams,
  IInsuranceFeatureResponse,
  IInsuranceFee,
  IInsuranceGroupResponse,
  IInsuranceResponse,
} from "../interfaces/insurance";
import { IPaymentTransaction } from "../interfaces/payment";
import { IListResponseDto } from "../interfaces/response";
import { IVoucher } from "./referrer";
import { getStorage } from "./storage";
import { IUser } from "./user";

const publicApiCache: { [key: string]: any } = {};

export const createInsuranceRequest = async (
  feature: EInsuranceFeature,
  body: ICreateAutoInsuranceParams | ICreateMotorInsuranceParams
): Promise<{
  paymentIntent: IPaymentTransaction;
  insuranceDraft: IInsuranceResponse;
}> => {
  const res = await fetch(`${config.API_HOST}/my/insurance/request`, {
    method: "POST",
    body: JSON.stringify({
      ...body,
      feature,
    }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
  });
  const resData = await res.json();
  if (res.ok) return resData;

  throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
};

export const updateInsuranceRequest = async (
  id: string,
  feature: EInsuranceFeature,
  body: ICreateAutoInsuranceParams | ICreateMotorInsuranceParams
): Promise<{
  paymentIntent: IPaymentTransaction;
  insuranceDraft: IInsuranceResponse;
}> => {
  const res = await fetch(`${config.API_HOST}/my/insurance/${id}/request`, {
    method: "PUT",
    body: JSON.stringify({
      ...body,
      feature,
    }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
  });
  const resData = await res.json();
  if (res.ok) return resData;

  throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
};

export const retryPay = async (
  id: string
): Promise<{
  paymentIntent: { amount: number; billId: string };
  insuranceDraft: IInsuranceResponse;
}> => {
  const url = `${config.API_HOST}/my/insurance/${id}/payment-intent`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
  });
  return await res.json();
};

export const getInsuranceFee = async (
  feature: EInsuranceFeature,
  body: ICreateAutoInsuranceParams | ICreateMotorInsuranceParams
): Promise<{
  fee: IInsuranceFee;
  discount: number;
}> => {
  const res = await fetch(`${config.API_HOST}/my/insurance/fee/details`, {
    method: "POST",
    body: JSON.stringify({
      ...body,
      feature,
    }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
  });
  return await res?.json();
};

export const getAvailableVoucher = async (
  feature: EInsuranceFeature,
  referrerId: string
): Promise<undefined> => {
  // const res = await fetch(
  //   `${config.API_HOST}/my/promotion/voucher?${new URLSearchParams({
  //     feature,
  //     referrerId,
  //   }).toString()}`,
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
  //     },
  //   }
  // );
  return undefined;
};

export const purchasedAtLeast1Insurance = async (): Promise<{
  purchased: boolean;
  policyUrl: string;
  referrer?: IUser;
}> => {
  const url = `${config.API_HOST}/my/insurance/purchased`;

  if (!publicApiCache[url]) {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
      },
    });
    const resData = await res.json();
    if (res.ok) publicApiCache[url] = resData;
    else throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
  }
  return publicApiCache[url];
};

export const getInsuranceCategory = async <T = ICategoryResponse>(
  name: ECategory,
  params?: {
    source?: EInsuranceSource;
    userIntent?: string;
    selectedValue?: string;
  }
): Promise<T[]> => {
  const url = `${
    config.API_HOST
  }/public/insurance/category?${new URLSearchParams({
    name,
    ...params,
  }).toString()}`;

  if (!publicApiCache[url]) {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
      },
    });
    const resData = await res.json();
    if (res.ok) publicApiCache[url] = resData;
    else throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
  }
  return publicApiCache[url];
};

export const getInsuranceServices = async (): Promise<{
  features: IInsuranceFeatureResponse[];
  groups: IInsuranceGroupResponse[];
}> => {
  const url = `${config.API_HOST}/public/insurance/config`;
  const EXCLUDES_ARR_PARTNER: string[] = [];
  if (!publicApiCache[url]) {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
      },
    });
    let resData = await res.json();
    resData["features"] = resData["features"].map((itemMap) => {
      const filterPartner =
        itemMap?.sources?.length > 0
          ? itemMap?.sources?.filter(
              (itemFilter) => !EXCLUDES_ARR_PARTNER.includes(itemFilter)
            )
          : [];
      return {
        ...itemMap,
        sources: filterPartner,
      };
    });

    if (res.ok) publicApiCache[url] = resData;
    else throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
  }
  return publicApiCache[url];
};

export const getMyInsurances = async (data: {
  page: number;
  limit: number;
  status: EInsuranceStatus;
}): Promise<IListResponseDto<IInsuranceResponse>> => {
  const url = `${config.API_HOST}/my/insurance?${new URLSearchParams({
    ...data,
  } as any).toString()}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
  });
  const resData = await res.json();
  if (res.ok) return resData;

  throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
};
export const getInsuranceById = async (
  id: string
): Promise<IInsuranceResponse> => {
  const url = `${config.API_HOST}/my/insurance/${id}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
  });
  const resData = await res.json();
  if (res.ok) return resData;

  throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
};

export const getAutoInsuranceCategoryCode = async (
  userIntent: string
): Promise<ICategoryResponse[]> => {
  const url = `${
    config.API_HOST
  }/public/insurance/auto/category-code?${new URLSearchParams({
    userIntent,
  }).toString()}`;

  if (!publicApiCache[url]) {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
      },
    });
    const resData = await res.json();
    if (res.ok) publicApiCache[url] = resData;
    else throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
  }
  return publicApiCache[url];
};

export const confirmPaymentIntentPaid = async (body: {
  billID: string;
}): Promise<{
  paymentIntent: { amount: number };
  insuranceDraft: any;
}> => {
  const res = await fetch(`${config.API_HOST}/public/webhook/payment`, {
    method: "POST",
    body: JSON.stringify({ ...body, status: "success" }),
    headers: {
      "Content-Type": "application/json",
      "x-wh-key": `bypass backend`,
    },
  });
  const resData = await res.json();
  if (res.ok) return resData;

  throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
};

//insuran volunteer
export const updateTempInsuranceRequest = async (
  id: string,
  feature: EInsuranceFeature,
  body: ICreateAutoInsuranceParams | ICreateMotorInsuranceParams
): Promise<{
  paymentIntent: IPaymentTransaction;
  insuranceDraft: IInsuranceResponse;
}> => {
  const res = await fetch(`${config.API_HOST}/my/insurance/request-bhxh`, {
    method: "Post",
    body: JSON.stringify({
      ...body,
      feature,
    }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
  });
  const resData = await res.json();
  if (res.ok) return resData;

  throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
};
