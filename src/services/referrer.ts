import config from "../contants/config";
import {
  ICommissionReportDataType,
  IListResponseDto,
  IReportDataType,
} from "../interfaces/response";
import { getStorage } from "./storage";
import { IUser } from "./user";

export interface IReferrerSetting {
  commissionPercentDirectRefer: number;
  commissionPercentIndirectRefer: number;
  basePriceTax: number;
  commissionTax: number;
  createdAt: string;
  updatedAt: string;
}

export interface IVoucher {
  agencyId: string;

  planName: string;

  description: string;

  value: number;

  code: string;

  qty: number;

  remainingQty: number;

  startDate: Date;

  endDate: Date;
}

export interface IReportFilterQuery {
  from?: string | number;
  to?: string | number;
}

export const becomeAgency = async (email?: string): Promise<IUser> => {
  const res = await fetch(`${config.API_HOST}/my/referrer/become-agency`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
  });
  const resData = await res.json();
  if (res.ok) return resData;

  throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
};

export const getReferrerSetting = async (): Promise<IReferrerSetting> => {
  const res = await fetch(`${config.API_HOST}/my/referrer/setting`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
    },
  });
  const resData = await res.json();
  if (res.ok) return resData;

  throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
};

export const getReferrerAccessLogReport = async (
  data: IReportFilterQuery
): Promise<
  IListResponseDto<IReportDataType> & { accumulate: IReportDataType }
> => {
  const res = await fetch(
    `${config.API_HOST}/my/referrer/access-log/report?${new URLSearchParams(
      data as any
    )}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
      },
    }
  );
  const resData = await res.json();
  if (res.ok) return resData;

  throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
};

export const getMyCommissionLogReport = async (
  data: IReportFilterQuery
): Promise<
  IListResponseDto<ICommissionReportDataType> & {
    accumulate: ICommissionReportDataType;
  }
> => {
  const res = await fetch(
    `${config.API_HOST}/my/referrer/commission-log/report?${new URLSearchParams(
      data as any
    ).toString()}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
      },
    }
  );
  const resData = await res.json();
  if (res.ok) return resData;

  throw new Error(resData?.message?.join() || "Có lỗi xảy ra!");
};

export const checkDiscountCode = async (
  code: string,
  referrerId?: string
): Promise<IVoucher | null> => {
  try {
    if (!code) return null;
    const res = await fetch(
      `${config.API_HOST}/my/promotion/voucher/exists?${new URLSearchParams({
        code,
        ...(referrerId && { referrerId }),
      }).toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${await getStorage("jwtAccessToken")}`,
        },
      }
    );
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
