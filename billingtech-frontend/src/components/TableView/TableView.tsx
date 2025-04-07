import React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

interface Column {
  accessorKey: string;
  header: string;
}

interface TableViewProps {
  data: { [key: string]: string | number }[];
  columns: Column[];
}

const TableView: React.FC<TableViewProps> = ({ data, columns }) => {
  // Transform columns to GridColDef format
  const gridColumns: GridColDef[] = columns.map((column) => ({
    field: column.accessorKey,
    headerName: column.header,
    flex: 1,
  }));

  // Transform data to GridRowsProp format
  const gridRows: GridRowsProp = data.map((row, index) => ({
    id: index, // DataGrid requires a unique `id` field
    ...row,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={gridRows}
        columns={gridColumns}
        checkboxSelection // Enable checkbox selection
        sx={{
          "& .MuiDataGrid-cell:focus": {
            outline: "none", // Remove the active border
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none", // Remove the active border when focused within
          },
        }}
      />
    </div>
  );
};

export default TableView;
