export interface ILogin {
  email: string;
  password: string;
}

interface IMenu {
  title: string;
  path: string;
}

export interface IUserInfo {
  TOKEN: string;
  USER_INFO: { USER_NAME: string; ROLE: string; ID_EMPLOYEE: number };
  MENU: IMenu[];
}
