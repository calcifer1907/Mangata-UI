import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { DateRange } from "react-date-range";
import ButtonComponent from "../../components/Buttons/ButtonComponent";
import SalesChart from "../../components/Charts/SalesChart";
import Loading from "../../components/Loading/Loading";
import TableUI from "../../components/TableUI/TableUI";
import BoxSales from "./BoxSales";
import SaleList from "./SaleList";
import { GridColDef } from "@mui/x-data-grid";
import Checkbox from "@mui/material/Checkbox";

import { useContextSales } from "../../hooks/useSales/useSalesContex";

import { useSales } from "../../hooks/useSales/useSales";
import { STATUS_COLOR } from "../../generalFunctions/status";
import { formatPrice } from "../../generalFunctions/formaters";
import { formatDate } from "../../generalFunctions/formatDate";
import { InitialCalendar } from "../../constant/Calendar";
import { IGetListSales } from "../../interfaces/ISales";

const FORMAT_DATE = "YYYY/MM/DD";

interface IProps {
  setCurrentItem: (item: IGetListSales | null) => void;
  setOpenDialog: (open: boolean) => void;
  setOpenDialogUserInfo: (open: boolean) => void;
}

const Sales = ({
  setCurrentItem,
  setOpenDialog,
  setOpenDialogUserInfo,
}: IProps) => {
  const {
    dataList,
    dataChartList,
    loading,
    setDataList,
    dataListFilter,
    dateChange,
    setDateChange,
  } = useContextSales();

  const { updatePaymentEmployee, totalSaleStatus, changeStatusReservation } =
    useSales({
      page: "admin",
    });

  const [changeRangeDate, setChangeRangeDate] = useState<{
    startDate: Date;
    endDate: Date;
    key: string;
  }>(InitialCalendar);

  const columns: GridColDef[] = [
    {
      field: "pay",
      headerName: "Pago Empleado",
      flex: 2,
      renderCell: (params) =>
        params.row.EMPLOYEE !== "Mangata system" &&
        params.row.status_reservation === "approved" && (
          <Checkbox
            checked={params.value}
            onChange={(event) => {
              const { code_reservation } = params.row;
              updatePaymentEmployee(code_reservation, event.target.checked);
              const updatedRows = dataList.map((row) =>
                row.code_reservation === code_reservation
                  ? { ...row, pay: event.target.checked }
                  : row
              );
              setDataList(updatedRows);
            }}
          />
        ),
    },
    {
      field: "EMPLOYEE",
      headerName: "Creado por",
      sortable: false,
      flex: 3,
    },
    {
      field: "BANK_ACCOUNT",
      headerName: "Cuenta Bancaria",
      sortable: false,
      flex: 3,
    },
    {
      field: "status_reservation",
      headerName: "Estado reserva",
      sortable: false,
      flex: 3,
      renderCell: (params) => {
        const status = params.value as string;
        return (
          <Box style={{ alignContent: "center", height: "100%" }}>
            <Typography
              style={{
                textAlign: "center",
                textTransform: "uppercase",
                opacity: 0.8,
                color: "white",
                fontWeight: 600,
                borderRadius: 100,
                fontSize: 12,
                padding: "4px 8px",
                backgroundColor:
                  STATUS_COLOR[status as keyof typeof STATUS_COLOR],
              }}
            >
              {status}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "commission_employee",
      headerName: "Precio venta",
      sortable: true,
      valueGetter: (value) => formatPrice(value as number),
      flex: 3,
    },

    {
      field: "created_at",
      headerName: "Fecha Creación",
      sortable: true,
      valueGetter: (value) => formatDate(value, FORMAT_DATE),
      flex: 3,
    },
  ];

  const handleApllyRangeDate = () => {
    if (changeRangeDate) {
      setDateChange(changeRangeDate);
    }
  };

  return (
    <Box m={2} className="wd-100">
      <Box className="d-flex flex-row gap-8 wd-100 flex-dirrection-row ">
        <Box className="d-flex flex-direction-column gap-8 wd-100">
          <Box className="d-flex  gap-8 wd-100">
            <Paper sx={{ width: "80%" }} elevation={3}>
              <SalesChart salesData={dataChartList} />
            </Paper>
            <Box className="d-flex flex-direction-column gap-8">
              <BoxSales totalSales={totalSaleStatus} />
            </Box>
          </Box>
          <TableUI
            data={dataListFilter}
            columns={columns}
            dateChange={dateChange}
          />
        </Box>
        <Box>
          <Paper className="margin-buttom-8" sx={{ p: 1 }} elevation={3}>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => {
                const { startDate, endDate } = item.selection;
                setChangeRangeDate({
                  startDate: startDate || new Date(),
                  endDate: endDate || new Date(),
                  key: "selection",
                });
              }}
              moveRangeOnFirstSelection={false}
              ranges={[changeRangeDate]}
            />
            <Box slot="end" className="d-flex justify-content-end">
              <ButtonComponent
                iconName=""
                title="Aplicar"
                onClick={handleApllyRangeDate}
                background="background-color-button-dark-blue"
              />
            </Box>
          </Paper>
          <Paper
            elevation={3}
            className="d-flex flex-direction-column hg-100 gap-8"
            sx={{
              padding: 1,
              maxHeight: "415px",
              overflowY: "auto",
            }}
          >
            {loading ? (
              <Loading />
            ) : (
              <>
                {dataListFilter.length > 0 ? (
                  <SaleList
                    changeStatusReservation={changeStatusReservation}
                    setOpenDialog={setOpenDialog}
                    setOpenDialogUserInfo={setOpenDialogUserInfo}
                    setCurrentItem={setCurrentItem}
                  />
                ) : (
                  <Box
                    style={{}}
                    className="d-flex justify-content-center align-items-center hg-100"
                  >
                    <Typography>No Hay Datos</Typography>
                  </Box>
                )}
              </>
            )}
          </Paper>
        </Box>
      </Box>
      {/* <CalendarPage /> */}
    </Box>
  );
};

export default Sales;
