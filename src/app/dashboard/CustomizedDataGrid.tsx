"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { fetchDataFromFirestore } from "./firestorefetch";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CustomizedDataGrid() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [columns, setColumns] = React.useState<GridColDef[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadData = async () => {
      const data = await fetchDataFromFirestore("project"); // your Firestore collection
      if (data.length > 0) {
        // Dynamically create columns based on keys of first object
        const generatedColumns: GridColDef[] = Object.keys(data[0]).map((key) => ({
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
          width: 150,
          flex: 1,
        }));
        setColumns(generatedColumns);
      }
      setRows(data);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
