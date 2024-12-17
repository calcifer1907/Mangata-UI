export interface ILogin {
  email: string;
  password: string;
}

interface IMenu {
  TITLE: string;
  PATH: string;
}

export interface IUserInfo {
  TOKEN: string;
  USER_NAME: string;
  ROLE: string;
  MENU: IMenu[];
}
