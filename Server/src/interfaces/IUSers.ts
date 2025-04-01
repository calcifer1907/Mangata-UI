export interface IUserName {
  user_name: string;
  id: number;
}

export interface IMessages {
  message: string;
  status?: number;
}

export interface ISaveUSer {
  FIRST_NAME: string;
  LAST_NAME: string;
  EMAIL: string;
  IDENTITY: string | null;
  ROLE_ID: number;
  PASSWORD: string;
  IS_ACTIVE: boolean;
  CREATED_AT: string;
  BANK_TYPE_ACCOUNT: string | null;
  BANK_ACCOUNT: string | null;
  BANK_NAME: number | null;
}

export interface ISumCommission {
  sum_commission: number;
}

export interface IListBanks {
  id: number;
  description: string;
}
