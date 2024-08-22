export enum EQrCodeType {
  CALL_API = "CALL_API",
  LOGIN_PORTAL = "LOGIN_PORTAL",
  REFER = "REFER",
}
export enum EBank {
  BIDV = "BIDV",
}
export enum ETransactionStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum ETagType {
  COMMING_SOON,
  HOT,
  NEW,
}

export enum EGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
export const OptionGender = [
  {
    value: EGender.MALE,
    label: 'Nam'
  },
  {
    value: EGender.FEMALE,
    label: 'Nữ'
  }
]
export enum EInstructionGroup {
  APP_01 = "APP_01",
  APP_02 = "APP_02",
  APP_03 = "APP_03",

  AFFILIATE_01 = "AFFILIATE_01",
  AFFILIATE_02 = "AFFILIATE_02",

  OTHER = "OTHER",
}
