import { Box, Paper } from "@mui/material";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC } from "react";

import { requestExportData } from "../../utils/api/agent";
import { IRangaDate } from "../../interfaces/ICalendar";

const paginationModel = { page: 0, pageSize: 5 };

interface IProps {
  data: any[];
  columns: GridColDef[];
  dateChange: IRangaDate;
}

const TableUI: FC<IProps> = ({ data, columns, dateChange }) => {
  const exportToExcel = async () => {
    const dataBlob = await requestExportData.exportDataSales({
      startDate: dateChange.startDate,
      endDate: dateChange.endDate,
    });
    if (dataBlob instanceof ArrayBuffer) {
      const blob = new Blob([dataBlob], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);

      // Crear un enlace temporal
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reservations.xlsx"); // Nombre del archivo a descargar
      document.body.appendChild(link);

      // Simular un clic en el enlace para iniciar la descarga
      link.click();

      // Eliminar el enlace y liberar la URL del blob
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } else {
      console.error("Error: dataBlob no es un ArrayBuffer");
    }
  };

  return (
    <Box className="wd-100">
      <Box
        className="d-flex align-items-center justify-content-end gap-8 wd-100"
        style={{
          textAlign: "end",
          color: "#FFFFFF",
          marginBottom: "10px",
        }}
      >
        <Box
          onClick={() => exportToExcel()}
          component="a"
          download
          style={{
            height: 40,
            borderRadius: 100,
            backgroundColor: "#2B3D5E",
            width: 178,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            cursor: "pointer",
          }}
        >
          Exportar.xls
        </Box>
      </Box>
      <Paper
        sx={{
          height: 300,
          width: "100%",
          display: { xs: "none", sm: "block" },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
};

export default TableUI;
