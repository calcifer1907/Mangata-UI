import {
  Box,
  Button,
  CircularProgress,
  Container,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import TableUI from "../components/TableUI/TableUI";

import { useSales } from "../hooks/useSales";
import { GridColDef } from "@mui/x-data-grid";
import { format } from "@formkit/tempo";
import { Icon } from "@iconify/react";

import { formatPrice } from "../generalFunctions/formaters";

import searchIcon from "../../src/assets/searchIcon.svg";

import { IGetListSales } from "../interfaces/IUser";
import { useEffect, useState, ChangeEvent, MouseEvent } from "react";

const FORMAT_DATE = "YYYY/MM/DD";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    sortable: false,
    flex: 1,
  },
  {
    field: "CODE_RESERVATION",
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
    field: "STATUS_RESERVATION",
    headerName: "Estado reserva",
    sortable: false,
    flex: 3,
  },
  {
    field: "CURRENT_COMMISSION",
    headerName: "Precio Min",
    sortable: false,
    valueGetter: (value) => formatPrice(value as number),
    flex: 3,
  },
  {
    field: "COMMISSION_EMPLOYEE",
    headerName: "Se Vendio en",
    sortable: false,
    valueGetter: (value) => formatPrice(value as number),
    flex: 3,
  },
  {
    field: "DIFF",
    headerName: "Comision",
    sortable: false,
    valueGetter: (value) => formatPrice(value as number),
    flex: 3,
  },
  {
    field: "CREATED_AT",
    headerName: "Fecha Creación",
    sortable: false,
    valueGetter: (value) => format(value, FORMAT_DATE),
    flex: 3,
  },
];

const STATUS = {
  pendiente: "#7D1C80",
  cancelada: "#A93D3F",
  confirmada: "#46AE32",
};

const LIstOfCommissionAdmin = () => {
  const {
    dataList,
    changeStatusReservation,
    loading,
    dateChange,
    setDateChange,
  } = useSales({
    page: "admin",
  });

  const [maxHeight, setMaxHeight] = useState<number>(window.innerHeight);
  const [dataListFilter, setDataListFilter] = useState<IGetListSales[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const [codeRe, setCodeRe] = useState<string>("");

  const handleClick = (event: MouseEvent<HTMLButtonElement>, code: string) => {
    setAnchorEl(event.currentTarget);
    setCodeRe(code);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterCode = () => {
    const searchInput = document.getElementById(
      "searchInput"
    ) as HTMLInputElement;
    const value = searchInput.value;
    const filter = dataList.filter((item) =>
      item.CODE_RESERVATION.includes(value)
    );
    setDataListFilter(filter);
  };

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filter = dataList.filter((item) =>
      item.CODE_RESERVATION.includes(value)
    );
    setDataListFilter(filter.length > 0 ? filter : dataList);
  };

  const handleChangeStatus = (status: string) => {
    const changeStatus = dataList.findIndex(
      ({ CODE_RESERVATION }) => CODE_RESERVATION === codeRe
    );
    // console.log(changeStatus, status, code);
    dataList[changeStatus].STATUS_RESERVATION = status;
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
    <Box>
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

          <Box
            sx={{
              backgroundColor: "#2B3D5E",
              height: 40,
              width: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
              gap: 10,
            }}
          >
            <Button
              size="small"
              sx={{
                textTransform: "none",
                fontSize: 14,
                color: "#FFFFFF",
              }}
              onClick={handleFilterCode}
            >
              Buscar
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            height: 48,
            backgroundColor: "#EAE7EF",
            width: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "28px",
            border: "1px solid #454559",
            maxWidth: 520,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingInline: { xs: "8px", sm: "16px" },
              gap: 1,
              borderRight: "1px solid #454559",
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
              borderRight: "1px solid #454559",
            }}
          >
            <Icon
              icon="solar:user-bold-duotone"
              width={24}
              height={24}
              color="#A93D3F"
            />
            <Typography>Cancelada</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingInline: { xs: "6px", sm: "16px" },
              gap: 1,
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
          height: "auto",
          overflowY: "auto",
          maxHeight: maxHeight - 250,
          paddingBottom: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {loading ? (
            <Box
              sx={{
                position: "absolute",
                letf: "50%",
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
                  key={item.CODE_RESERVATION}
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
                        STATUS[item.STATUS_RESERVATION as keyof typeof STATUS]
                      }
                      style={{ height: "100%" }}
                    />
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>
                        {item.CODE_RESERVATION}
                      </Typography>
                      <Typography>
                        {format(item.CREATED_AT, FORMAT_DATE, "co")}-{" "}
                        <Typography component="span" sx={{ fontWeight: 600 }}>
                          {formatPrice(Number(item.COMMISSION_EMPLOYEE))}
                        </Typography>
                      </Typography>
                      <Typography>{item.NAME_ACCOMPANIST}</Typography>
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
                            if (item.STATUS_RESERVATION !== "confirmada")
                              handleClick(e, item.CODE_RESERVATION);
                          }}
                          startIcon={
                            <Icon
                              icon={
                                item.STATUS_RESERVATION !== "confirmada"
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
                            onClick={() => handleChangeStatus("confirmada")}
                          >
                            Confirmar
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleChangeStatus("cancelada");
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

        {/* {dataList.length > 0 && <TableUI data={dataList} columns={columns} />} */}
      </Container>
    </Box>
  );
};

export default LIstOfCommissionAdmin;
