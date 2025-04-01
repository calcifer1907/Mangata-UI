export interface IUsers {
  FIRST_NAME: string;
  LAST_NAME: string;
  EMAIL: string;
  ROLE_ID: number;
  PASSWORD: string;
  IDENTITY: string;
  IS_ACTIVE: boolean;
  CREATED_AT: string;
  BANK_TYPE_ACCOUNT: string | null;
  BANK_ACCOUNT: string | null;
  BANK_NAME: number | null;
}

export interface IGetUserId {
  id: number;
  user_name: string;
}

export interface IAccompanistListSales {
  name_accompanist: string;
  description: string;
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
  ACCOMPANIST: IAccompanistListSales[];
  id: number;
}

export interface IGetListData {
  date: string;
}

export interface IValidEmail {
  message: string;
  status: number;
}
