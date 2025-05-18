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

export interface IValidEmail {
  message: string;
  status: number;
}
