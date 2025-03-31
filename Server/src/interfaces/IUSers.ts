export interface IUserName {
  user_name: string;
  id: number;
}

export interface IMessages {
  message: string;
}

export interface ISaveUSer {
  FIRST_NAME: string;
  LAST_NAME: string;
  EMAIL: string;
  BANK_ACCOUNT: string;
  PASSWORD: string;
  ROLE_ID: number;
  IS_ACTIVE: boolean;
  CREATED_AT: string;
}

export interface ISumCommission {
  sum_commission: number;
}

export interface IListBanks {
  id: number;
  description: string;
}
