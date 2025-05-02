import { IRangaDate } from "./ICalendar";
import { ISalesData } from "./IReservation";

export interface IAccompanistListSales {
  name_accompanist: string;
  description: string;
}

export interface IGetListSales {
  code_reservation: string;
  email: string;
  telephone: string;
  commission_employee: string;
  created_at: string;
  created_on: Date;
  current_commission: string;
  DIFF: string;
  EMPLOYEE: string;
  ID_EMPLOYEE: string;
  name_accompanist: string;
  status_reservation: string;
  ACCOMPANIST: IAccompanistListSales[];
  id: number;
}

export interface ISales {
  dataList: IGetListSales[];
  setDataList: (data: IGetListSales[]) => void;
  dataChartList: ISalesData[];
  setDataChartList: (data: ISalesData[]) => void;
  setDateChange: (date: IRangaDate) => void;
  dateChange: IRangaDate;
  setLoading: (loading: boolean) => void;
  loading: boolean;
  dataListFilter: IGetListSales[];
  setDataListFilter: (data: IGetListSales[]) => void;
  setArrayShowAccompanist: (data: IAccompanistListSales[]) => void;
  arrayShowAccompanist: IAccompanistListSales[];
}
