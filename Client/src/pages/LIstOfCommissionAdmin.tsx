/**
 * @author Carlos Taborda
 * @description This component is the loader to display the administrator commissions and reserve them per day.
 * @version 1.0
 *
 */

import { useEffect, useState, ChangeEvent, MouseEvent } from "react";

/**Libreries */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { format } from "@formkit/tempo";
import { Icon } from "@iconify/react";

/**Hooks */
import { useSales } from "../hooks/useSales";

/**Component */
import DialogListAccompanist from "../components/Dialogs/DialogListAccompanist";

/**Functions */
import { formatPrice } from "../generalFunctions/formaters";

/**Icon */
import searchIcon from "../../src/assets/searchIcon.svg";

/**Interface */
import { IGetListSales, IAccompanistListSales } from "../interfaces/IUser";
import { STATUS_COLOR } from "../generalFunctions/status";

import TableUI from "../components/TableUI/TableUI";
import { GridColDef } from "@mui/x-data-grid";
import Checkbox from "@mui/material/Checkbox";

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
      field: "id",
      headerName: "Id",
      sortable: false,
      flex: 1,
    },
    {
      field: "code_reservation",
      headerName: "Id Reserva",
      sortable: false,
      flex: 3,
    },
    {
      field: "EMPLOYEE",
      headerName: "Empleado",
      sortable: false,
      flex: 3,
    },
    {
      field: "status_reservation",
      headerName: "Estado reserva",
      sortable: false,
      flex: 3,
    },
    {
      field: "current_commission",
      headerName: "Precio Min",
      sortable: true,
      valueGetter: (value) => formatPrice(value as number),
      flex: 3,
    },
    {
      field: "commission_employee",
      headerName: "Se Vendio en",
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
      valueGetter: (value) => format(value, FORMAT_DATE),
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
  const [maxHeight, setMaxHeight] = useState<number>(window.innerHeight);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filter = dataList.filter((item) => {
      return `${item.code_reservation}${item.ACCOMPANIST[0].name_accompanist}`
        .toLowerCase()
        .includes(value.toLowerCase());
    });
    setDataListFilter(value ? filter : dataList);
  };

  const handleChangeStatus = (status: string) => {
    const changeStatus = dataList.findIndex(
      ({ code_reservation }) => code_reservation === codeRe
    );
    // console.log(changeStatus, status, code);
    dataList[changeStatus].status_reservation = status;
    const updated = format(new Date(), "YYYY-MM-DDTHH:mm:ss", "co");
    changeStatusReservation(codeRe, status, updated);
    handleClose();
  };

  useEffect(() => {
    setDataListFilter(dataList);
  }, [dataList]);

  const updateMaxHeight = () => {
    setMaxHeight(window.innerHeight); // Usamos el alto del viewport
  };

  useEffect(() => {
    // Actualizar al cargar
    updateMaxHeight();

    // Escuchar cambios de tamaño del viewport
    window.addEventListener("resize", updateMaxHeight);

    // Limpiar el listener al desmontar el componente
    return () => {
      window.removeEventListener("resize", updateMaxHeight);
    };
  }, []);

  return (
    <Box sx={{ paddingTop: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginBottom: 2,
          paddingInline: { xs: "10px", md: "40px", lg: "40px" },
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box
            sx={{
              height: 48,
              backgroundColor: "#EAE7EF",
              width: "100%",
              maxWidth: "390px",
              minWidth: "200px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "28px",
            }}
          >
            <input
              id="searchInput"
              type="text"
              placeholder="Buscar..."
              onChange={handleOnchange}
            />
            <img src={searchIcon} style={{ paddingInlineEnd: "18px" }} />
          </Box>
        </Box>

        <Box sx={{ height: "auto", width: "auto" }}>
          <Box
            sx={{
              backgroundColor: "#EAE7EF",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "28px",
              border: "1px solid #454559",
              flexWrap: "wrap",
              maxWidth: 612,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingInline: { xs: "8px", sm: "16px" },
                gap: 1,
                height: "100%",
                minHeight: 48,
              }}
            >
              <Icon
                icon="solar:user-bold-duotone"
                width={24}
                height={24}
                color="#7D1C80"
              />
              <Typography>Sin pago</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingInline: { xs: "8px", sm: "16px" },
                gap: 1,
                height: "100%",
                minHeight: 48,
              }}
            >
              <Icon
                icon="solar:user-bold-duotone"
                width={24}
                height={24}
                color="#C6A02F"
              />
              <Typography>Cancelada</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingInline: { xs: "8px", sm: "16px" },
                gap: 1,
                height: "100%",
                minHeight: 48,
              }}
            >
              <Icon
                icon="solar:user-bold-duotone"
                width={24}
                height={24}
                color="#A93D3F"
              />
              <Typography>Rechazada Bank.</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingInline: { xs: "6px", sm: "16px" },
                gap: 1,
                height: "100%",
                minHeight: 48,
              }}
            >
              <Icon
                icon="solar:user-bold-duotone"
                width={24}
                height={24}
                color="#46AE32"
              />
              <Typography>Confirmada</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          paddingInline: { xs: "10px", md: "40px", lg: "40px" },
          height: "56px",
          marginBottom: 2,
          maxWidth: "390px",
          minWidth: "200px",
        }}
      >
        <TextField
          fullWidth
          label="Fecha"
          variant="filled"
          margin="none"
          type="date"
          value={dateChange}
          onChange={(e) => setDateChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon="solar:calendar-bold-duotone"
                    width="24"
                    height="24"
                    style={{ color: "#2B3D5E" }}
                  />
                </InputAdornment>
              ),
            },
          }}
          InputLabelProps={{
            shrink: true, // Asegura que la etiqueta permanezca arriba
          }}
          sx={{
            background: "#FFFFFF",
            borderRadius: "8px 8px 0 0",
          }}
        />
      </Box>
      <Container
        sx={{
          height: "100%",
          paddingBottom: 1,
        }}
      >
        <Box
          sx={{
            height: "100%",
            overflowY: "auto",
            maxHeight: maxHeight - 250,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: { xs: "center", lg: "flex-start" },
            gap: 2,
          }}
        >
          {loading ? (
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              {dataListFilter.map((item) => (
                <Paper
                  key={item.code_reservation}
                  elevation={3}
                  sx={{
                    display: "flex",
                    gap: 2,
                    width: "auto",
                    height: "auto",
                    flexWrap: "wrap",
                    backgroundColor: "#E5E1E9",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      paddingBlock: "8px",
                      gap: 2,
                    }}
                  >
                    <Icon
                      icon="solar:user-bold-duotone"
                      width={32}
                      height={32}
                      color={
                        STATUS_COLOR[
                          item.status_reservation as keyof typeof STATUS_COLOR
                        ]
                      }
                      onClick={() => {
                        setOpenDialog(true);
                        setArrayShowAccompanist(item.ACCOMPANIST);
                      }}
                      style={{ height: "100%", cursor: "pointer" }}
                    />
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>
                        {item.code_reservation}
                      </Typography>
                      <Typography>
                        {format(item.created_at, FORMAT_DATE, "co")} -{" "}
                        <Typography component="span" sx={{ fontWeight: 600 }}>
                          {formatPrice(
                            Number(item.commission_employee) *
                              item.ACCOMPANIST.length
                          )}
                        </Typography>
                      </Typography>
                      <Typography>
                        {item.ACCOMPANIST[0].name_accompanist}
                      </Typography>
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
                              width={32}
                              height={32}
                              color="#2B3D5E"
                            />
                          }
                        />
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem
                            onClick={() => handleChangeStatus("approved")}
                          >
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
                      </Box>
                    }
                  </Box>
                </Paper>
              ))}
            </>
          )}
        </Box>
        <TableUI data={dataList} columns={columns} dateChange={dateChange} />
        <DialogListAccompanist
          open={openDialog}
          setOpen={setOpenDialog}
          accompanist={arrayShowAccompanist}
        />
      </Container>
    </Box>
  );
};

export default LIstOfCommissionAdmin;
