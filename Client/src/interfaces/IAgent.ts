export interface IPaymentBold {
  message: string;
  data: {
    payload: string;
    url: string;
  };
}

export interface ICommission {
  sum_commission: number;
}
