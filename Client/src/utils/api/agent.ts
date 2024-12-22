import { requestApis } from "./Request";

import { ILogin, IUserInfo } from "../../interfaces/ILogin";
import {
  IGetUserId,
  IUsers,
  IGetListSales,
  IGetListData,
} from "../../interfaces/IUser";
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
  getUserId: (body: { date: string }): Promise<IGetUserId> =>
    requestApis.post("/api/getuserid", body),
};

export const getLIstForTable = {
  getListData: (body: IGetListData, uri: string): Promise<IGetListSales[]> =>
    requestApis.post(`/api/${uri}`, body),
};

export const getMinMax = {
  getListData: (): Promise<IMinMax> => requestApis.get(`/api/MimMax`),
};

interface IBodyChangeStatus {
  id: string;
  status: string;
  updated: string;
}

export const getAdmin = {
  changeStatus: (body: IBodyChangeStatus): Promise<any> =>
    requestApis.post(`/api/changeStatusReservation`, body),
};
