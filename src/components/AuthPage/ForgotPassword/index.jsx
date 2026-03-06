import React, { useEffect, useState } from "react";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { Link } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, sendPasswordResetEmail } from "../../../store/actions";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import { inputStyles } from "../styles";

const ForgotPassword = () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(true);

  const errorProps = useSelector(({ auth }) => auth.profile.error);
  const loadingProps = useSelector(({ auth }) => auth.profile.loading);

  useEffect(() => setError(errorProps), [errorProps]);
  useEffect(() => setLoading(loadingProps), [loadingProps]);
  useEffect(() => setOpen(true), [loadingProps]);
  useEffect(() => {
    if (errorProps === false && loadingProps === false) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [errorProps, loadingProps]);
  useEffect(() => {
    return () => clearAuthError()(dispatch);
  }, [dispatch]);

  const handleChange = e => {
    const val = e.target.value;
    setEmail(val);
    setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+\s*$/.test(val));
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError("");
    await sendPasswordResetEmail(email)(firebase, dispatch);
  };

  return (
    // Same page wrapper as AuthPage
    <Box sx={pageStyle}>
      <Box sx={cardStyle}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, textAlign: "center", mb: 1 }}
        >
          Trouble logging in?
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#6b7280",
            fontSize: "0.9rem",
            mb: 3
          }}
        >
          Enter your email and we'll send you a link to reset your password.
        </Typography>

        {error && (
          <Collapse in={open}>
            <Alert
              severity="error"
              onClose={() => setOpen(false)}
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          </Collapse>
        )}

        {success && (
          <Collapse in={open}>
            <Alert
              severity="success"
              onClose={() => setOpen(false)}
              sx={{ mb: 2 }}
            >
              We've sent you an email with a link to reset your password. Please
              check your inbox and spam folder.
            </Alert>
          </Collapse>
        )}

        {/* Email input — same pill style as Login/SignUp */}
        <OutlinedInput
          placeholder="Enter your email"
          autoComplete="email"
          onChange={handleChange}
          fullWidth
          data-testid="forgotPasswordEmail"
          sx={{
            ...inputStyles["& .MuiOutlinedInput-root"],
            mb: 2
          }}
          startAdornment={
            <InputAdornment position="start">
              <MailOutlineOutlinedIcon style={{ color: "rgba(0,0,0,.25)" }} />
            </InputAdornment>
          }
        />

        {/* Same pill button as Login/SignUp */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          onClick={onSubmit}
          disabled={!isValidEmail || loading}
          data-testid="forgotPasswordButton"
          sx={{
            color: "white",
            borderRadius: "50px",
            padding: "10px",
            mb: 2
          }}
        >
          {loading ? "Sending..." : "Send me the link"}
        </Button>

        <Divider sx={{ my: 1, color: "#9ca3af", fontSize: "0.8rem" }}>
          or
        </Divider>

        <Box
          sx={{
            textAlign: "center",
            mt: 2,
            fontSize: "0.875rem",
            color: "#6b7280"
          }}
        >
          <Link
            to="/auth"
            style={{
              color: "#2563EB",
              textDecoration: "none",
              fontWeight: 600
            }}
          >
            Back to Login
          </Link>
        </Box>

        <Box
          sx={{
            textAlign: "center",
            mt: 1.5,
            fontSize: "0.875rem",
            color: "#6b7280"
          }}
        >
          New to <strong>CodeLabz</strong>?{" "}
          <Link
            to={{ pathname: "/auth", state: { mode: "signup" } }}
            style={{
              color: "#2563EB",
              textDecoration: "none",
              fontWeight: 600
            }}
          >
            Create an account
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

const pageStyle = {
  minHeight: "100vh",
  background: "#f0f2f5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  p: { xs: "16px", md: "24px 16px" },
  fontFamily: "'Segoe UI', sans-serif",
  boxSizing: "border-box"
};

const cardStyle = {
  width: "100%",
  maxWidth: 440,
  background: "#fff",
  borderRadius: "20px",
  boxShadow: "0 28px 80px rgba(0,0,0,0.13)",
  p: "48px 40px",
  boxSizing: "border-box"
};

export default ForgotPassword;
