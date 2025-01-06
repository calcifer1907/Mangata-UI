export interface IUsers {
  FIRST_NAME: string;
  LAST_NAME: string;
  EMAIL: string;
  BANK_ACCOUNT: string;
  ROLE_ID: number;
  PASSWORD: string;
  IS_ACTIVE: boolean;
  CREATED_aT: string;
}

export interface IGetUserId {
  ID: number;
  USER_NAME: string;
}

export interface IGetListSales {
  CODE_RESERVATION: string;
  COMMISSION_EMPLOYEE: string;
  CREATED_AT: string;
  CURRENT_COMMISSION: string;
  DIFF: string;
  EMPLOYEE: string;
  ID_EMPLOYEE: string;
  NAME_ACCOMPANIST: string;
  STATUS_RESERVATION: string;
  id: number;
}

export interface IGetListData {
  date: string;
}
