import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserIsNotAuthenticated } from "../../auth";
import Login from "./Login";
import SignUp from "./SignUp";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { authStyles } from "./styles";

const AuthPage = ({ type }) => {
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(
    location.state?.mode === "signup" ? false : type !== "signup"
  );
  useEffect(() => {
    setIsLogin(location.state?.mode === "signup" ? false : type !== "signup");
  }, [type, location.state]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  if (isMobile) {
    return (
      <Box sx={authStyles.page}>
        <Box sx={authStyles.mobileCard}>
          {isLogin ? <Login /> : <SignUp />}

          <Box sx={authStyles.mobileSwitch}>
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <Box
                  component="span"
                  sx={authStyles.mobileSwitchLink}
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </Box>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Box
                  component="span"
                  sx={authStyles.mobileSwitchLink}
                  onClick={() => setIsLogin(true)}
                >
                  Log In
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={authStyles.page}>
      <Box sx={authStyles.card}>
        <Box sx={authStyles.half}>
          <Login />
        </Box>

        <Box sx={authStyles.half}>
          <SignUp />
        </Box>
        <Box
          sx={{
            ...authStyles.overlay,
            transform: isLogin ? "translateX(100%)" : "translateX(0%)"
          }}
        >
          <Box
            sx={{
              ...authStyles.face,
              opacity: isLogin ? 1 : 0,
              pointerEvents: isLogin ? "all" : "none"
            }}
          >
            <Box sx={authStyles.overlayInner}>
              <Box
                component="h2"
                sx={{ ...authStyles.overlayTitle, fontSize: "2.2rem" }}
              >
                Welcome back to <br />
                CodeLabz!
              </Box>
              <Box component="p" sx={{ fontSize: "1.2rem" }}>
                New here? Click below to join us!
              </Box>
              <Box
                component="button"
                sx={authStyles.overlayBtn}
                onClick={() => setIsLogin(false)}
              >
                CREATE YOUR ACCOUNT
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              ...authStyles.face,
              opacity: isLogin ? 0 : 1,
              pointerEvents: isLogin ? "none" : "all"
            }}
          >
            <Box sx={authStyles.overlayInner}>
              <Box
                component="h2"
                sx={{ ...authStyles.overlayTitle, fontSize: "2.2rem" }}
              >
                Welcome to CodeLabz!
              </Box>
              <Box component="p" sx={{ fontSize: "1.2rem" }}>
                Already signed up? <br /> Click below to login with your
                credentials
              </Box>
              <Box
                component="button"
                sx={authStyles.overlayBtn}
                onClick={() => setIsLogin(true)}
              >
                LOGIN
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserIsNotAuthenticated(AuthPage);
