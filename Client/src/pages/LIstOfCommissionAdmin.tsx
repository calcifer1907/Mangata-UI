import { Box, Button, Container, Typography } from "@mui/material";
import TableUI from "../components/TableUI/TableUI";

import { useSales } from "../hooks/useSales";
import { GridColDef } from "@mui/x-data-grid";
import { format } from "@formkit/tempo";
import { Icon } from "@iconify/react";
import { formatPrice } from "../generalFunctions/formaters";

import searchIcon from "../../src/assets/searchIcon.svg";

const FORMAT_DATE = "YYYY-MM-DD";

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

const LIstOfCommissionAdmin = () => {
  const { dataList } = useSales({ page: "admin" });

  return (
    <Box
      sx={{
        position: "relative",
        top: 15,
      }}
    >
      <Box
        style={{
          marginBottom: 30,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingInline: 40,
        }}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box
            sx={{
              height: 48,
              backgroundColor: "#EAE7EF",
              width: "390px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "28px",
            }}
          >
            <input id="searchInput" type="text" placeholder="Buscar..." />
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
              onClick={() => {}}
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
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingInline: 4,
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
              paddingInline: 4,
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
              paddingInline: 4,
              gap: 1,
            }}
          >
            <Icon
              icon="solar:user-bold-duotone"
              width={24}
              height={24}
              color="#2B3D5E"
            />
            <Typography>Realizada</Typography>
          </Box>
        </Box>
      </Box>

      <Container>
        {dataList.length > 0 && <TableUI data={dataList} columns={columns} />}
      </Container>
    </Box>
  );
};

export default LIstOfCommissionAdmin;
