import { createContext } from "react";
import { ISales } from "../../interfaces/ISales";
import { InitialCalendar } from "../../constant/Calendar";

const initialState: ISales = {
  dataList: [],
  setDataList: () => {},
  dataChartList: [],
  setDataChartList: () => {},
  dateChange: InitialCalendar,
  setDateChange: () => {},
  loading: false,
  setLoading: () => {},
  arrayShowAccompanist: [],
  setArrayShowAccompanist: () => {},
  dataListFilter: [],
  setDataListFilter: () => {},
};

export const CreateContext = createContext(initialState);
