import { Link } from "react-router-dom"; // Removed useLocation, useState, useEffect
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { authStyles } from "./styles";
import Login from "./Login";
import SignUp from "./SignUp";
import { UserIsNotAuthenticated } from "../../auth";

const LogoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="9" height="9" rx="2" fill="white" />
    <rect
      x="13"
      y="2"
      width="9"
      height="9"
      rx="2"
      fill="white"
      fillOpacity="0.7"
    />
    <rect
      x="2"
      y="13"
      width="9"
      height="9"
      rx="2"
      fill="white"
      fillOpacity="0.7"
    />
    <rect
      x="13"
      y="13"
      width="9"
      height="9"
      rx="2"
      fill="white"
      fillOpacity="0.4"
    />
  </svg>
);

const AuthPage = ({ type }) => {
  return (
    <Box sx={authStyles.page}>
      <Box sx={authStyles.card}>
        <Box sx={authStyles.logoWrap}>
          <Box sx={authStyles.logoBox}>
            <LogoIcon />
          </Box>
        </Box>
        <Typography sx={authStyles.heading}>
          {type === "login" ? "Welcome back" : "Welcome to CodeLabz"}
        </Typography>

        <Typography sx={authStyles.subheading}>
          {type === "login"
            ? "Log in to your account"
            : "Join our developer community"}
        </Typography>

        <Box sx={authStyles.tabRow}>
          <Box
            component={Link}
            to="/login"
            sx={{
              ...authStyles.tab(type === "login"),
              textDecoration: "none"
            }}
          >
            Login
          </Box>
          <Box
            component={Link}
            to="/signup"
            sx={{
              ...authStyles.tab(type === "signup"),
              textDecoration: "none"
            }}
          >
            Sign Up
          </Box>
        </Box>

        {type === "login" ? <Login /> : <SignUp />}
      </Box>
    </Box>
  );
};

export default UserIsNotAuthenticated(AuthPage);
