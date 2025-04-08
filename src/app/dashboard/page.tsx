"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../components/theme/AppTheme";
import ColorModeSelect from "../components/theme/ColorModeSelect";
import CustomizedDataGrid from "./CustomizedDataGrid";
import { AccountBoxOutlined } from "@mui/icons-material";
import Button from "@mui/material/Button";
//import gridOrdersData from "./gridOrdersData";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "1900px",
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




export default function Dashboard(props: { disableCustomTheme?: boolean }) {

  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock login state
  const router = useRouter();

  const handleSignOut = () => {
    setIsLoggedIn(false);
    //router.push("/SignIn"); // Navigate to SignIn page
  };

  const handleSignIn = () => {
    setIsLoggedIn(true);
    router.push("/SignIn"); // Navigate to Dashboard page
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <DashboardContainer direction="column" justifyContent="space-between">
        {/*TODO: Add an account info for sign in status/ account status and log out too*/}
        {/* <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <AccountBoxOutlined />
        <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
        </Box> */}

        {/* Top bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccountBoxOutlined />
            <Typography variant="body1">
              {isLoggedIn ? "Logged In" : "Logged Out"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <ColorModeSelect />
            {isLoggedIn && (
              <Button variant="outlined" color="error" onClick={handleSignOut}>
                Sign Out
              </Button>
            )}
            {!isLoggedIn && (
              <Button variant="outlined" color="primary" onClick={handleSignIn}>
                Sign In
              </Button>)}
          </Box>
        </Box>

        {/* Dashboard body */}

        <Card variant="outlined">
          <Typography component="h1" variant="h4" sx={{ fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
            Dashboard
          </Typography>
          <Typography variant="body1">Welcome to your renewable energy projects dashboard.</Typography>
          <CustomizedDataGrid /> {/* data={dummyData}*/}
        </Card>
      </DashboardContainer>
    </AppTheme>
  );
}
