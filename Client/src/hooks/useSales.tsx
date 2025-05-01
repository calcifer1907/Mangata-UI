import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getLIstForTable,
  getAdmin,
  getSumCommission,
  getCharListSales,
} from "../utils/api/agent";

import { useContextUser } from "../hooks/useContextUser";

import { enqueueSnackbar } from "notistack";

import { IGetListSales } from "../interfaces/IUser";
import { IRangaDate } from "../interfaces/ICalendar";
import { formatDate } from "../generalFunctions/formatDate";
import { IBodySales, ISalesData } from "../interfaces/IReservation";
import { formatPrice } from "../generalFunctions/formaters";

interface IProps {
  page: string;
}

const PATH_ADMIN = "mySales";
const PATH_EMPLOYEE = "mycommissions";

export const useSales = ({ page }: IProps) => {
  const { userInfo } = useContextUser();

  const [dataChartList, setDataChartList] = useState<ISalesData[]>([]);
  const [dataList, setDataList] = useState<IGetListSales[]>([]);
  const [dateChange, setDateChange] = useState<IRangaDate>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const [sumCommissionState, setSumCommissionState] = useState<number>(0);

  const responseData = useCallback(async () => {
    const body: IBodySales = {
      startDate: formatDate(dateChange.startDate, "YYYY-MM-DD"),
      endDate: formatDate(dateChange.endDate, "YYYY-MM-DD"),
    };
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
  }, [page, dateChange, userInfo.USER_INFO.ID_EMPLOYEE]);

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

  const fetchGetChartList = useCallback(async () => {
    const body: IBodySales = {
      startDate: formatDate(dateChange.startDate, "YYYY-MM-DD"),
      endDate: formatDate(dateChange.endDate, "YYYY-MM-DD"),
    };
    const data = await getCharListSales(body);
    setDataChartList(data);
  }, [dateChange]);

  const totalSaleStatus = useMemo(() => {
    const totalApproved = dataChartList.filter(
      ({ status_reservation }) => status_reservation === "approved"
    ).length;
    const totalPendding = dataChartList.filter(
      ({ status_reservation }) => status_reservation === "pending"
    ).length;
    const totalSaleApproved = dataChartList.reduce(
      (acc, reservation) =>
        acc +
        (reservation.status_reservation === "approved"
          ? reservation.suma_sale
          : 0),
      0
    );
    const totalSalePendding = dataChartList.reduce(
      (acc, reservation) =>
        acc +
        (reservation.status_reservation === "pending"
          ? reservation.suma_sale
          : 0),
      0
    );
    return {
      totalMoneyApproved: formatPrice(totalSaleApproved),
      totalMoneyPendding: formatPrice(totalSalePendding),
      totalApproved,
      totalPendding,
    };
  }, [dataChartList]);

  useEffect(() => {
    fetchGetChartList();
  }, [fetchGetChartList]);

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
    dataChartList,
    totalSaleStatus,
  };
};
