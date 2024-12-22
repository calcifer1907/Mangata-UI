import { useCallback, useEffect, useState } from "react";
import { getLIstForTable, getAdmin } from "../utils/api/agent";
import { format } from "@formkit/tempo";

import { IGetListSales } from "../interfaces/IUser";

interface IProps {
  page: string;
}

const PATH_ADMIN = "mySales";
const PATH_EMPLOYEE = "mycommissions";

export const useSales = ({ page }: IProps) => {
  const [dataList, setDataList] = useState<IGetListSales[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const responseData = useCallback(async () => {
    //format(new Date(), "YYYY-MM-DD", "co")
    const body = { date: "2024-12-21" };
    let data: IGetListSales[] = [];
    if (page.includes("admin")) {
      data = await getLIstForTable.getListData(body, PATH_ADMIN);
    } else {
      data = await getLIstForTable.getListData(body, PATH_EMPLOYEE);
    }
    setDataList(data);
    setLoading(false);
  }, [page]);

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

  return { dataList, loading, changeStatusReservation };
};
