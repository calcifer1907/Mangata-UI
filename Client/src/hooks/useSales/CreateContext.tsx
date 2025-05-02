import { createContext } from "react";
import { ISales } from "../../interfaces/ISales";

const initialState: ISales = {
  dataList: [],
  setDataList: () => {},
  dataChartList: [],
  setDataChartList: () => {},
  dateChange: { startDate: new Date(), endDate: new Date(), key: "selection" },
  setDateChange: () => {},
  loading: false,
  setLoading: () => {},
  arrayShowAccompanist: [],
  setArrayShowAccompanist: () => {},
  dataListFilter: [],
  setDataListFilter: () => {},
};

export const CreateContext = createContext(initialState);
