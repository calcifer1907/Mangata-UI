import { requestApis } from "./Request";

import { ILogin, IUserInfo } from "../../interfaces/ILogin";
import { IGetUserId, IUsers } from "../../interfaces/IUser";
import { ILunches, IMinMax } from "../../interfaces/IAccompanist";

const URI_LOGIN = "/auth/login";

export const login = {
  loginPage: (body: ILogin): Promise<IUserInfo> =>
    requestApis.post(URI_LOGIN, body),
};

interface IResponseApi {
  message: string;
}

export const getAccompanist = {
  getLunches: (): Promise<ILunches[]> => requestApis.get("/api/lunches"),
  saveReservation: (data: object): Promise<IResponseApi> =>
    requestApis.post("/api/reservations", data),
};

export const methodUser = {
  createUser: (body: IUsers): Promise<IResponseApi> =>
    requestApis.post("/api/createUser", body),
  getUserId: (body: any): Promise<IGetUserId> =>
    requestApis.post("/api/getuserid", body),
};

interface IGetListData {
  date: string;
}

export const getLIstForTable = {
  getListData: (body: IGetListData, uri: string): Promise<any> =>
    requestApis.post(`/api/${uri}`, body),
};

export const getMinMax = {
  getListData: (): Promise<IMinMax> => requestApis.get(`/api/MimMax`),
};
