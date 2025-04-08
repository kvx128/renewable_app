"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AppTheme from "../components/theme/AppTheme";
import ColorModeSelect from "../components/theme/ColorModeSelect";
import CustomizedDataGrid from "../dashboard/CustomizedDataGrid";
import { FixedSizeList as List } from "react-window";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "900px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const DashboardContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

// Simulating large data set for infinite scroll
const dummyData = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  name: `Renewable Project ${index + 1}`,
  type: ["Solar", "Wind", "Hydro"][index % 3],
  location: ["California", "Texas", "Colorado"][index % 3],
  capacity: `${(index % 50) + 10} MW`,
}));

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true); // Assume logged in state

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <DashboardContainer direction="column" justifyContent="space-between">
        {/* Account Status */}
        <Box sx={{ textAlign: "right", pr: 2 }}>
          <Typography variant="body1" color={isLoggedIn ? "green" : "red"}>
            {isLoggedIn ? "✅ Logged In" : "❌ Logged Out"}
          </Typography>
          <Button onClick={() => setIsLoggedIn(!isLoggedIn)} size="small">
            {isLoggedIn ? "Log Out" : "Log In"}
          </Button>
        </Box>

        {/* Main Dashboard Card */}
        <Card variant="outlined">
          <Typography component="h1" variant="h4" sx={{ fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
            Dashboard
          </Typography>
          <Typography variant="body1">Welcome to your renewable energy projects dashboard.</Typography>

          {/* Infinite Scroll Grid */}
          <Grid container spacing={2} sx={{ mt: 2 }}>{
            <Grid item xs={12} component={<div />}>
              <Box sx={{ height: 400, width: "100%" }}>
                <List
                  height={400}
                  itemCount={dummyData.length}
                  itemSize={50}
                  width="100%"
                >
                  {({ index, style }) => (
                    <div style={style}>
                      <CustomizedDataGrid data={[dummyData[index]]} />
                    </div>
                  )}
                </List>
              </Box>
            </Grid>}
          </Grid>
        </Card>
      </DashboardContainer>
    </AppTheme>
  );
}













/*
import * as React from 'react';
import { DataGrid, GridValidRowModel } from '@mui/x-data-grid';
import { columns, fetchRows, rows } from './gridOrdersData'; //rows
// import { db } from "../firebase"; // your Firebase config
// import { collection, getDocs } from "firebase/firestore";
import { database } from '../firebase'; // Import your Firebase initialization
import { ref, get } from "firebase/database";
import { useState, useEffect } from 'react';

export default function CustomizedDataGrid() {

  //var [rows, setRows] = useState([]);
  const [rows, setRows] = useState<GridValidRowModel[]>([]);
  useEffect(() => {
    fetchRows().then(setRows);
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, 'https://renewable-energy-project-1c67f-default-rtdb.firebaseio.com/'); // Replace 'products' with your database path
      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Format the data to match your GridRowsProp structure
          const formattedRows = Object.keys(data).map(key => ({
            id: key, // Use the key as the ID
            Power_station: data[key].Power_station,
            Status: data[key].Status,
            Country: data[key].Country,
            Capacity_MW: data[key].Capacity_MW,
            Region: data[key].Region,
            Year_operational: data[key].Year_operational,
            Year_construction_start: data[key].Year_construction_start,
          }));
          //setRows(formattedRows);
          console.log("Data fetched successfully:", formattedRows);
        } else {
          console.log("No data available");
          setRows([]); // Ensure rows is an empty array if there's no data
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setRows([]); // Ensure rows is an empty array in case of error
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <DataGrid
        checkboxSelection
        rows={rows}
        columns={columns}
        getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        sx={(theme) => ({
          borderColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
          '& .MuiDataGrid-cell': {
            borderColor:
              theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
          },
        })}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: {
                variant: 'outlined',
                size: 'small',
              },
              columnInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              operatorInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: 'outlined',
                  size: 'small',
                },
              },
            },
          },
        }}
      />
    </div>
  );
}*/

