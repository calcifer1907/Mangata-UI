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
  id: number;
  user_name: string;
}

export interface IGetListSales {
  code_reservation: string;
  commission_employee: string;
  created_at: string;
  current_commission: string;
  DIFF: string;
  EMPLOYEE: string;
  ID_EMPLOYEE: string;
  name_accompanist: string;
  status_reservation: string;
  id: number;
}

export interface IGetListData {
  date: string;
}
