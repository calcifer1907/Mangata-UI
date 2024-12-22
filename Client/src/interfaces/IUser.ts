export interface IUsers {
  first_name: string;
  last_name: string;
  email: string;
  account_bank: string;
  role: string;
  password: string;
  is_active: boolean;
  created_at: string;
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
