import { createContext } from "react";
import { IAccompanistContext } from "../../interfaces/IReservation";

const initialState: IAccompanistContext = {
  optionsLunches: [],
  setOptionsLunches: () => {},
  minmax: { MIN: 0, MAX: 0 },
  dataCodeReservation: null,
  setDataCodeReservation: () => {},
  getUserId: null,
  setGetUserId: () => {},
  fields: [{ name: "", lunch: { label: "", value: 0 } }],
  setFields: () => {},
  errors: [],
  setErrors: () => {},
  valueCel: "",
  setValueCel: () => {},
  valueEmail: "",
  setValueEmail: () => {},
  dateChange: "",
  setDateChange: () => {},
  openModal: false,
  setOpenModal: () => {},
  openDialogPayment: false,
  setOpenDialogPayment: () => {},
  loading: false,
  setLoading: () => {},
};

export const CreateContext = createContext<IAccompanistContext>(initialState);
