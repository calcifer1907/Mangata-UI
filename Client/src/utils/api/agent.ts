import { requestApis } from "./Request";

import { ILogin, IUserInfo } from "../../interfaces/ILogin";
import {
  IGetUserId,
  IUsers,
  IGetListSales,
  IValidEmail,
} from "../../interfaces/IUser";
import { ILunches, IMinMaxResponse } from "../../interfaces/IAccompanist";
import { IBanksList } from "../../interfaces/IMercadoPago";
import {
  IBodyChangeStatus,
  IBodySales,
  IBodyStatusReservation,
  ISalesData,
  ISaveCodeGenerate,
} from "../../interfaces/IReservation";
import { ICommission, IPaymentBold } from "../../interfaces/IAgent";
import { IBodyBlockDay } from "../../interfaces/ICalendar";

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
  getListData: (body: IBodySales, uri: string): Promise<IGetListSales[]> =>
    requestApis.post(`/api/${uri}`, body),
};

export const getMinMax = {
  getListData: (): Promise<IMinMaxResponse> => requestApis.get(`/api/MimMax`),
};

export const getAdmin = {
  changeStatus: (body: IBodyChangeStatus): Promise<IResponseApi> =>
    requestApis.post(`/api/changeStatusReservation`, body),
  paymentUpdate: (body: object): Promise<IResponseApi> =>
    requestApis.put(`/api/updatePaymentEmployee`, body),
};

export const apisMercadoPago = {
  createOrderPSE: (body: object): Promise<unknown> =>
    requestApis.post("/PSEPayment", body),
  createOrderCreditCard: (body: object): Promise<object> =>
    requestApis.post("/mercadoPagoCreditCard", body),
  getListBanks: (): Promise<IBanksList[]> => requestApis.get("/getListBanks"),
};

export const requestExportData = {
  exportDataSales: (body: object): Promise<unknown> =>
    requestApis.post(`/api/download-excel`, body, {
      responseType: "arraybuffer",
    }),
};

export const checkReservation = {
  statusReservation: (body: object): Promise<IBodyStatusReservation> =>
    requestApis.post(`/api/check-reservation`, body),
};

export const paymentBold = (body: object): Promise<IPaymentBold> => {
  return requestApis.post("/paymentsBold", body);
};

export const getSumCommission = (id_employee: number): Promise<ICommission> =>
  requestApis.get(`/api/commission/${id_employee}`);

export const saveGenerateCode = (
  body: ISaveCodeGenerate
): Promise<ISaveCodeGenerate> =>
  requestApis.post("/api/saveGenerateCode", body);

export const getCodeReservation = (body: {
  code: number;
}): Promise<ISaveCodeGenerate> =>
  requestApis.post("/api/getCodeReservation", body);

export const getOrderIdBold = (body: { order_id: string }): Promise<unknown> =>
  requestApis.post("/api/getOrderId", body);

export const getListBanks = (): Promise<IBanksList[]> =>
  requestApis.get("/api/getListBanks");

export const getValidEmail = (email: string): Promise<IValidEmail> =>
  requestApis.post("/api/validEmail", { email });

export const getIsDayBlocked = (): Promise<IBodyBlockDay[]> =>
  requestApis.get("/api/isDayBlocked");

export const getCharListSales = (body: {
  startDate: string;
  endDate: string;
}): Promise<ISalesData[]> => requestApis.post("/api/charListSales", body);
