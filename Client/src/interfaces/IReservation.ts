import {
  IErrorFieldAccompanist,
  IFields,
  IMinMax,
  IOptions,
} from "./IAccompanist";
import { CountryType } from "./ICountry";
import { IGetUserId } from "./IUser";

export interface IBodyChangeStatus {
  id: string;
  status: string;
}

export interface IBodyStatusReservation {
  code_reservation: string;
  status_reservation: string;
  email: string;
  created_at: string;
  total_payment: number;
  payment_method?: string;
}

export interface ISaveCodeGenerate {
  id: number;
  code: string;
  status: number;
  min_price: number;
  agreed_price: number;
  created_at: string;
  user_name?: string;
}

export interface IAccompanistContext {
  optionsLunches: IOptions[];
  setOptionsLunches: React.Dispatch<React.SetStateAction<IOptions[]>>;
  minmax: IMinMax;
  dataCodeReservation: ISaveCodeGenerate | null;
  setDataCodeReservation: React.Dispatch<
    React.SetStateAction<ISaveCodeGenerate | null>
  >;
  getUserId: IGetUserId | null;
  setGetUserId: React.Dispatch<React.SetStateAction<IGetUserId | null>>;
  fields: IFields[];
  setFields: React.Dispatch<React.SetStateAction<IFields[]>>;
  errors: IErrorFieldAccompanist[];
  setErrors: React.Dispatch<React.SetStateAction<IErrorFieldAccompanist[]>>;
  valueCel: string;
  setValueCel: React.Dispatch<React.SetStateAction<string>>;
  valueEmail: string;
  setValueEmail: React.Dispatch<React.SetStateAction<string>>;
  dateChange: string;
  setDateChange: React.Dispatch<React.SetStateAction<string>>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openDialogPayment: boolean;
  setOpenDialogPayment: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCountry: CountryType | null;
  setSelectedCountry: React.Dispatch<React.SetStateAction<CountryType | null>>;
}

export interface IBodySales {
  id_employee?: number;
  startDate: string;
  endDate: string;
}
