import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import React, { FC } from "react";

interface ITableHead {
  headcell: any;
}

const TableHeadUI = ({ headCell }: any) => (
  <TableHead>
    <TableRow>
      {headCell.map((item) => (
        <TableCell>
          <TableSortLabel>{item.header_name}</TableSortLabel>
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

export default TableHeadUI;
