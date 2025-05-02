import { cloneElement, isValidElement, useMemo, useState } from "react";

/**Context */
import { CreateContext } from "./CreateContext";
import { IRangaDate } from "../../interfaces/ICalendar";
import { ISalesData } from "../../interfaces/IReservation";
import { IAccompanistListSales, IGetListSales } from "../../interfaces/ISales";

interface IContextProps {
  children: React.ReactNode;
}

const useContextSales = (props: IContextProps) => {
  const childrenWithProps = isValidElement(props.children)
    ? cloneElement(props.children, {
        ...props,
      })
    : props.children;
  const [dataListFilter, setDataListFilter] = useState<IGetListSales[]>([]);
  const [dataChartList, setDataChartList] = useState<ISalesData[]>([]);
  const [dataList, setDataList] = useState<IGetListSales[]>([]);
  const [arrayShowAccompanist, setArrayShowAccompanist] = useState<
    IAccompanistListSales[]
  >([]);
  const [dateChange, setDateChange] = useState<IRangaDate>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const values = useMemo(
    () => ({
      dataList,
      setDataList,
      dataChartList,
      setDataChartList,
      dateChange,
      setDateChange,
      loading,
      setLoading,
      dataListFilter,
      setDataListFilter,
      arrayShowAccompanist,
      setArrayShowAccompanist,
    }),
    [
      dataList,
      dataChartList,
      dateChange,
      loading,
      dataListFilter,
      arrayShowAccompanist,
    ]
  );

  return (
    <CreateContext.Provider value={values}>
      {childrenWithProps}
    </CreateContext.Provider>
  );
};

export default useContextSales;
