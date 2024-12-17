import { Box, Container } from "@mui/material";
import TableUI from "../components/TableUI/TableUI";

import { useSales } from "../hooks/useSales";
import { GridColDef } from "@mui/x-data-grid";
import { format } from "@formkit/tempo";

import { formatPrice } from "../generalFunctions/formaters";

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
    <Box sx={{ position: "relative", top: 70 }}>
      <Box style={{ marginTop: 28, marginBottom: 30 }}>
        <h2
          style={{
            fontSize: 36,
            color: "#2B3D5E",
            fontWeight: 800,
            paddingInlineStart: 15,
          }}
        >
          Reservas
        </h2>
        <Box
          style={{
            backgroundColor: "#2B3D5E",
            height: 6,
            position: "absolute",
            top: 50,
            width: "85%",
            left: 0,
          }}
        />
      </Box>
      <Container>
        {dataList.length > 0 && <TableUI data={dataList} columns={columns} />}
      </Container>
    </Box>
  );
};

export default LIstOfCommissionAdmin;
