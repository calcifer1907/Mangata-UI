export interface IBodyChangeStatus {
  id: string;
  status: string;
  updated: string;
}

export interface IBodyStatusReservation {
  code_reservation: string;
  status_reservation: string;
  email: string;
  created_at: string;
  total_payment: number;
}

export interface ISaveCodeGenerate {
  id: number;
  code: string;
  status: number;
  min_price: number;
  agreed_price: number;
  created_at: string;
}
