import { EBank, ETransactionStatus } from "../enums";

export interface IPaymentTransaction {
  id: string;

  userId: string;

  status: ETransactionStatus;

  billId: string;

  amount: number;

  expireAt: number;

  customerId: string;

  accountNumber: string;

  bank: EBank;

  rawData?: any;

  metaData?: any;
}
