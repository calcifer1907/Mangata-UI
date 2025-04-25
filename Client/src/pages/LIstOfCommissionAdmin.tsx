/**
 * @author Carlos Taborda
 * @description This component is the loader to display the administrator commissions and reserve them per day.
 * @version 1.0
 *
 */

import { useEffect, useState, MouseEvent } from "react";

/**Libreries */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Icon } from "@iconify/react";
import FlatwareIcon from "@mui/icons-material/Flatware";

/**Hooks */
import { useSales } from "../hooks/useSales";

/**Component */
import DialogListAccompanist from "../components/Dialogs/DialogListAccompanist";
// import CalendarPage from "../components/Calendar/CalendarPage/CalendarPage";
import Loading from "../components/Loading/Loading";
import DialogUserInfo from "../components/Dialogs/DialogUserInfo";

/**Functions */
import { formatPrice } from "../generalFunctions/formaters";
import { formatDate } from "../generalFunctions/formatDate";

/**Interface */
import { IGetListSales, IAccompanistListSales } from "../interfaces/IUser";
import { STATUS_COLOR } from "../generalFunctions/status";

import TableUI from "../components/TableUI/TableUI";
import { GridColDef } from "@mui/x-data-grid";
import Checkbox from "@mui/material/Checkbox";
import MenuLeft from "../components/Calendar/CalendarPage/MenuLeft";
import { DateRange } from "react-date-range";
import ButtonComponent from "../components/Buttons/ButtonComponent";
import { InitialCalendar } from "../constant/Calendar";

const FORMAT_DATE = "YYYY/MM/DD";

const LIstOfCommissionAdmin = () => {
  const {
    dataList,
    setDataList,
    changeStatusReservation,
    loading,
    dateChange,
    setDateChange,
    updatePaymentEmployee,
  } = useSales({
    page: "admin",
  });

  const columns: GridColDef[] = [
    {
      field: "EMPLOYEE",
      headerName: "Creado por",
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
          <Box>
            <Typography
              style={{
                textAlign: "center",
                textTransform: "uppercase",
                opacity: 0.8,
                color: "white",
                fontWeight: 600,
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
      field: "BANK_ACCOUNT",
      headerName: "Cuenta Bancaria",
      sortable: false,
      flex: 3,
    },
    {
      field: "created_at",
      headerName: "Fecha Creación",
      sortable: true,
      valueGetter: (value) => formatDate(value, FORMAT_DATE),
      flex: 3,
    },
    {
      field: "pay",
      headerName: "Pago Empleado",
      flex: 3,
      renderCell: (params) =>
        params.row.EMPLOYEE !== "Mangata system" && (
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
  ];

  const [dataListFilter, setDataListFilter] = useState<IGetListSales[]>([]);
  // const [_maxHeight, setMaxHeight] = useState<number>(window.innerHeight);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDialogUserInfo, setOpenDialogUserInfo] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<IGetListSales | null>(null);
  const [changeRangeDate, setChangeRangeDate] = useState<{
    startDate: Date;
    endDate: Date;
    key: string;
  }>(InitialCalendar);

  const [arrayShowAccompanist, setArrayShowAccompanist] = useState<
    IAccompanistListSales[]
  >([]);
  const open = Boolean(anchorEl);

  const [codeRe, setCodeRe] = useState<string>("");

  const handleClick = (event: MouseEvent<HTMLButtonElement>, code: string) => {
    setAnchorEl(event.currentTarget);
    setCodeRe(code);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   const filter = dataList.filter((item) => {
  //     return `${item.code_reservation}${item.ACCOMPANIST[0].name_accompanist}`
  //       .toLowerCase()
  //       .includes(value.toLowerCase());
  //   });
  //   setDataListFilter(value ? filter : dataList);
  // };

  const handleChangeStatus = (status: string) => {
    const changeStatus = dataList.findIndex(
      ({ code_reservation }) => code_reservation === codeRe
    );
    changeStatusReservation(codeRe, status).then(() => {
      dataList[changeStatus].status_reservation = status;
      handleClose();
    });
  };

  const handleApllyRangeDate = () => {
    if (changeRangeDate) {
      setDateChange(changeRangeDate);
    }
  };

  useEffect(() => {
    setDataListFilter(dataList);
  }, [dataList]);

  // const updateMaxHeight = () => {
  //   setMaxHeight(window.innerHeight); // Usamos el alto del viewport
  // };

  // useEffect(() => {
  //   // Actualizar al cargar
  //   updateMaxHeight();

  //   // Escuchar cambios de tamaño del viewport
  //   window.addEventListener("resize", updateMaxHeight);

  //   // Limpiar el listener al desmontar el componente
  //   return () => {
  //     window.removeEventListener("resize", updateMaxHeight);
  //   };
  // }, []);

  const MenuOptions = () => {
    return (
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleChangeStatus("approved")}>
          Confirmar
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleChangeStatus("cancel");
          }}
        >
          Cancelar
        </MenuItem>
      </Menu>
    );
  };

  return (
    <Box className="d-flex " style={{ height: "100vh" }}>
      <MenuLeft />
      <Box m={2} className="wd-100">
        <Box className="d-flex flex-row gap-8 wd-100 flex-dirrection-row ">
          <TableUI data={dataList} columns={columns} dateChange={dateChange} />
          <Box>
            <Paper className="margin-buttom-8" sx={{ p: 2 }} elevation={3}>
              <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                  const { startDate, endDate } = item.selection;
                  // setChangeRangeDate();
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
                  {dataListFilter.map((item) => (
                    <Paper
                      key={item.code_reservation}
                      elevation={4}
                      sx={{
                        borderLeft: `2px solid ${
                          STATUS_COLOR[
                            item.status_reservation as keyof typeof STATUS_COLOR
                          ]
                        }`,
                        width: "auto",
                        maxHeight: "100px",
                        marginBlock: 1,
                      }}
                    >
                      <Box
                        className="d-flex flex-dirrection-row  justify-content-between hg-100 gap-8"
                        sx={{
                          padding: "8px",
                        }}
                      >
                        <FlatwareIcon
                          sx={{
                            width: 24,
                            height: 24,
                            alignSelf: "center",
                            color: "var(--color-theme-ligth-blue)",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setOpenDialog(true);
                            setArrayShowAccompanist(item.ACCOMPANIST);
                          }}
                        />

                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>
                            {item.code_reservation}
                          </Typography>
                          <Typography>
                            {formatDate(item.created_at, FORMAT_DATE)} -{" "}
                            <Typography
                              component="span"
                              sx={{ fontWeight: 600 }}
                            >
                              {formatPrice(
                                Number(item.commission_employee) *
                                  item.ACCOMPANIST.length
                              )}
                            </Typography>
                          </Typography>
                          <Box className="d-flex flex-dirrection-row align-items-center gap-8">
                            <Icon
                              icon="solar:user-bold-duotone"
                              style={{ height: "100%", cursor: "pointer" }}
                              width={16}
                              height={16}
                              onClick={() => {
                                setCurrentItem(item);
                                setOpenDialogUserInfo(true);
                              }}
                              color={
                                STATUS_COLOR[
                                  item.status_reservation as keyof typeof STATUS_COLOR
                                ]
                              }
                            />
                            <Typography
                              className="ellipsisText"
                              style={{ width: "190px" }}
                            >
                              {item.ACCOMPANIST[0].name_accompanist}
                            </Typography>
                          </Box>
                        </Box>
                        {
                          <Box sx={{ height: "100%" }}>
                            <Button
                              id="basic-button"
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              sx={{ height: "100%" }}
                              onClick={(e) => {
                                if (item.status_reservation !== "approved")
                                  handleClick(e, item.code_reservation);
                              }}
                              startIcon={
                                <Icon
                                  icon={
                                    item.status_reservation !== "approved"
                                      ? "solar:pen-new-round-bold-duotone"
                                      : "solar:unread-bold-duotone"
                                  }
                                  width={24}
                                  height={24}
                                  color="#2B3D5E"
                                />
                              }
                            />
                            <MenuOptions />
                          </Box>
                        }
                      </Box>
                    </Paper>
                  ))}
                </>
              )}
            </Paper>
          </Box>
        </Box>
        {/* <CalendarPage /> */}
      </Box>
      <DialogListAccompanist
        open={openDialog}
        setOpen={setOpenDialog}
        accompanist={arrayShowAccompanist}
      />
      {openDialogUserInfo && (
        <DialogUserInfo
          open={openDialogUserInfo}
          setOpen={setOpenDialogUserInfo}
          currentItem={currentItem}
        />
      )}
    </Box>
  );
};

export default LIstOfCommissionAdmin;
