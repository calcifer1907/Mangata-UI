export interface IPaymentBold {
  message: string;
  data: {
    error: unknown;
    payload: {
      payload: string;
      url: string;
    };
  };
}

export interface ICommission {
  sum_commission: number;
}
