import { useCallback, useEffect, useState } from "react";
import {
  getLIstForTable,
  getAdmin,
  getSumCommission,
} from "../utils/api/agent";
import { format } from "@formkit/tempo";

import { useContextUser } from "../hooks/useContextUser";

import { enqueueSnackbar } from "notistack";

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
  const { userInfo } = useContextUser();
  const today = format(new Date(), "YYYY-MM-DD", "co");
  const [dataList, setDataList] = useState<IGetListSales[]>([]);
  const [dateChange, setDateChange] = useState<string>(today);
  const [loading, setLoading] = useState<boolean>(false);

  const [sumCommissionState, setSumCommissionState] = useState<number>(0);

  const responseData = useCallback(async () => {
    const body: IBodyListData = { date: dateChange };
    setLoading(true);
    let data: IGetListSales[] = [];
    if (page.includes("admin")) {
      data = await getLIstForTable.getListData(body, PATH_ADMIN);
    } else {
      const idEmployee = userInfo.USER_INFO.ID_EMPLOYEE;
      if (idEmployee) {
        body.id_employee = idEmployee;
      }
      data = await getLIstForTable.getListData(body, PATH_EMPLOYEE);
    }

    setDataList(data);
    setLoading(false);
  }, [page, dateChange]);

  const changeStatusReservation = async (id: string, status: string) => {
    const body = { id, status };
    try {
      const data = await getAdmin.changeStatus(body);
      enqueueSnackbar(data.message, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      const er = (error as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      enqueueSnackbar(er, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      throw new Error("Error Update Status Reservation");
    }
  };

  const updatePaymentEmployee = async (id: string, pay: boolean) => {
    const body = { id, pay };
    try {
      const data = await getAdmin.paymentUpdate(body);
      enqueueSnackbar(data.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      const er = (error as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      enqueueSnackbar(er, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  const fetchSumCommission = useCallback(async () => {
    const idEmployee = userInfo.USER_INFO.ID_EMPLOYEE;
    if (idEmployee) {
      const data = await getSumCommission(idEmployee);
      setSumCommissionState(data.sum_commission);
    }
  }, [userInfo.USER_INFO.ID_EMPLOYEE]);

  useEffect(() => {
    responseData();
  }, [responseData]);

  useEffect(() => {
    fetchSumCommission();
  }, [fetchSumCommission]);

  return {
    dataList,
    setDataList,
    loading,
    sumCommissionState,
    changeStatusReservation,
    setDateChange,
    updatePaymentEmployee,
    dateChange,
  };
};
