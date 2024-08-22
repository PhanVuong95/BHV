export interface IListResponseDto<T = any> {
  pagingCounter: number;

  offset: number;

  hasNextPage: boolean;

  hasPrevPage: boolean;

  totalDocs: number;

  totalPages: number;

  limit: number;

  page: number;

  docs: T[];

  [customLabel: string]: number | boolean | any[];
}

export interface IReportDataType {
  accessCount?: number;

  createCount?: number;

  paidCount?: number;
  successCount?: number;

  date: string;
}

export interface ICommissionReportDataType {
  amount: number;
  preCalcAmount: number;
  commissionFromAgent: number;
  originalAmount: number;
  revenueCalcCommission: number;
  revenueCalcFromAgent: number;
  discount: number;
  tax: number;

  date: string;
}
