import { useCallback, useEffect, useState } from "react";
import { getLIstForTable, getAdmin } from "../utils/api/agent";
import { format } from "@formkit/tempo";

import { IGetListSales } from "../interfaces/IUser";

interface IProps {
  page: string;
}

interface IBodyListData {
  date: string;
  id_employee?: number | undefined;
}

const PATH_ADMIN = "mySales";
const PATH_EMPLOYEE = "mycommissions";

export const useSales = ({ page }: IProps) => {
  const today = format(new Date(), "YYYY-MM-DD", "co");
  const [dataList, setDataList] = useState<IGetListSales[]>([]);
  const [dateChange, setDateChange] = useState<string>(today);
  const [loading, setLoading] = useState<boolean>(false);

  const responseData = useCallback(async () => {
    const body: IBodyListData = { date: dateChange };
    setLoading(true);
    let data: IGetListSales[] = [];
    if (page.includes("admin")) {
      data = await getLIstForTable.getListData(body, PATH_ADMIN);
    } else {
      const info = localStorage.getItem("info");
      const idEmployee = info ? JSON.parse(info) : null;
      if (idEmployee) {
        body.id_employee = idEmployee.USER_INFO.ID_EMPLOYEE;
      }
      data = await getLIstForTable.getListData(body, PATH_EMPLOYEE);
    }

    setDataList(data);
    setLoading(false);
  }, [page, dateChange]);

  const changeStatusReservation = async (
    id: string,
    status: string,
    updated: string
  ) => {
    const data = await getAdmin.changeStatus({ id, status, updated });
    return data;
  };

  useEffect(() => {
    responseData();
  }, [responseData]);

  return {
    dataList,
    loading,
    changeStatusReservation,
    setDateChange,
    dateChange,
  };
};
