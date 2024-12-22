import { Box, Container } from "@mui/material";
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
    <Box sx={{ position: "relative", top: 15, left: 20 }}>
      <Box style={{ marginBottom: 30 }}>
        <Box>
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
        </Box>
      </Box>
      <Container>
        {dataList.length > 0 && <TableUI data={dataList} columns={columns} />}
      </Container>
    </Box>
  );
};

export default LIstOfCommissionAdmin;
