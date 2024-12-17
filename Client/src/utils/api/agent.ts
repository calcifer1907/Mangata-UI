import { requestApis } from "./Request";

import { ILogin, IUserInfo } from "../../interfaces/ILogin";
import { IUsers } from "../../interfaces/IUser";
import { ILunches } from "../../interfaces/IAccompanist";

const URI_LOGIN = "/auth/login";

export const login = {
  loginPage: (body: ILogin): Promise<IUserInfo> =>
    requestApis.post(URI_LOGIN, body),
};

export const getAccompanist = {
  getLunches: (): Promise<ILunches[]> => requestApis.get("/api/lunches"),
  saveReservation: (data: object): Promise<object> =>
    requestApis.post("/api/reservations", data),
};

export const methodUser = {
  createUser: (body: IUsers): Promise<object> =>
    requestApis.post("/api/createUser", body),
};

interface IGetListData {
  date: string;
}

export const getLIstForTable = {
  getListData: (body: IGetListData, uri: string): Promise<any> =>
    requestApis.post(`/api/${uri}`, body),
};
