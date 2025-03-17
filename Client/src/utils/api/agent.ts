import { requestApis } from "./Request";

import { ILogin, IUserInfo } from "../../interfaces/ILogin";
import {
  IGetUserId,
  IUsers,
  IGetListSales,
  IGetListData,
} from "../../interfaces/IUser";
import { ILunches, IMinMaxResponse } from "../../interfaces/IAccompanist";
import { IBanksList } from "../../interfaces/IMercadoPago";
import {
  IBodyChangeStatus,
  IBodyStatusReservation,
} from "../../interfaces/IReservation";

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
  getUserId: (body: { id: number }): Promise<IGetUserId> =>
    requestApis.post("/api/getuserid", body),
};

export const getLIstForTable = {
  getListData: (body: IGetListData, uri: string): Promise<IGetListSales[]> =>
    requestApis.post(`/api/${uri}`, body),
};

export const getMinMax = {
  getListData: (): Promise<IMinMaxResponse> => requestApis.get(`/api/MimMax`),
};

export const getAdmin = {
  changeStatus: (body: IBodyChangeStatus): Promise<unknown> =>
    requestApis.post(`/api/changeStatusReservation`, body),
};

export const apisMercadoPago = {
  createOrderPSE: (body: object): Promise<unknown> =>
    requestApis.post("/PSEPayment", body),
  createOrderCreditCard: (body: object): Promise<any> =>
    requestApis.post("/mercadoPagoCreditCard", body),
  getListBanks: (): Promise<IBanksList[]> => requestApis.get("/getListBanks"),
};

export const requestExportData = {
  exportDataSales: (body: object): Promise<unknown> =>
    requestApis.post(`/api/download-excel`, body),
};

export const checkReservation = {
  statusReservation: (body: object): Promise<IBodyStatusReservation> =>
    requestApis.post(`/api/check-reservation`, body),
};

interface IPaymentBold {
  message: string;
  data: {
    error: any;
    payload: {
      payload: string;
      url: string;
    };
  };
}

export const paymentBold = (body: object): Promise<IPaymentBold> => {
  return requestApis.post("/paymentsBold", body);
};

interface ICommission {
  sum_commission: number;
}

export const getSumCommission = (id_employee: number): Promise<ICommission> =>
  requestApis.get(`/api/commission/${id_employee}`);
