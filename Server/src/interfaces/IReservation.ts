export interface ISaveCodeReservation {
  id: number;
  code: string;
  min_price: number;
  agreed_price: number;
  created_at: string;
  user_name?: string;
}

export interface IBodyBlockDay {
  id: number;
  valid_date: Date;
}

export interface IChartListSalesEmployee {
  commission_employee: number;
  code_reservation: string;
  created_at: string;
  WHO_SALE: string;
}

export interface ICountPersonReservation {
  number_persons: number;
  id_reservation: string;
}
