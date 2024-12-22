import {
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Paper,
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
  const { dataList, changeStatusReservation } = useSales({ page: "admin" });
  const [dataListFilter, setDataListFilter] = useState<IGetListSales[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
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

  const handleChangeStatus = (code: string, status: string) => {
    const changeStatus = dataList.findIndex(
      ({ CODE_RESERVATION }) => CODE_RESERVATION === code
    );
    // console.log(changeStatus, status, code);
    dataList[changeStatus].STATUS_RESERVATION = status;
    changeStatusReservation(
      code,
      status,
      format(new Date(), "YYYY-MM-DDTHH:mm:ss", "co")
    );
    handleClose();
  };

  useEffect(() => {
    console.log(dataList);

    setDataListFilter(dataList);
  }, [dataList]);
  return (
    <Box
      sx={{
        position: "relative",
        top: 15,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginBottom: 4,
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

      <Container>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
          }}
        >
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
                  paddingInline: "16px",
                  paddingBlock: "8px",
                  gap: 2,
                }}
              >
                <Icon
                  icon="solar:user-bold-duotone"
                  width={32}
                  height={32}
                  color={STATUS[item.STATUS_RESERVATION as keyof typeof STATUS]}
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
                <Box sx={{ height: "100%" }}>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    sx={{ height: "100%" }}
                    onClick={handleClick}
                    startIcon={
                      <Icon
                        icon="solar:pen-new-round-bold-duotone"
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
                      id={item.CODE_RESERVATION}
                      onClick={(e) => {
                        console.log(e.target.id);
                        console.log(e);
                        handleChangeStatus(item.CODE_RESERVATION, "confirmada");
                      }}
                    >
                      Confirmar
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleChangeStatus(item.CODE_RESERVATION, "cancelada");
                      }}
                    >
                      Cancelar
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* {dataList.length > 0 && <TableUI data={dataList} columns={columns} />} */}
      </Container>
    </Box>
  );
};

export default LIstOfCommissionAdmin;
