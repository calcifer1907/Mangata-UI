import { Box, Paper } from "@mui/material";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC } from "react";

const paginationModel = { page: 0, pageSize: 5 };

interface IProps {
  data: any[];
  columns: GridColDef[];
}

const TableUI: FC<IProps> = ({ data, columns }) => {
  return (
    <Box
      sx={{
        width: "100%",
        margin: "0 auto",
        marginTop: 2,
        display: { xs: "none", sm: "block" },
      }}
    >
      <Paper sx={{ height: 400, width: "100%" }}>
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
