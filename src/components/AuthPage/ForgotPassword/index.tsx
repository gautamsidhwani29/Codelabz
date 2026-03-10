import React, { useEffect, useState } from "react";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { Link } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import type { Dispatch } from "redux";
import { clearAuthError, sendPasswordResetEmail } from "../../../store/actions";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import { inputStyles, pageStyle, cardStyle } from "../styles";

interface RootState {
  auth: {
    profile: {
      error: string | false | null;
      loading: boolean;
    };
  };
}

const ForgotPassword = (): JSX.Element => {
  const firebase = useFirebase();
  const dispatch = useDispatch<Dispatch>();

  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | false | null>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);

  const errorProps = useSelector(({ auth }: RootState) => auth.profile.error);
  const loadingProps = useSelector(
    ({ auth }: RootState) => auth.profile.loading
  );

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
    return () => {
      clearAuthError()(dispatch);
    };
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    setEmail(val);
    setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+\s*$/.test(val));
  };

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    setError("");
    await sendPasswordResetEmail(email)(firebase, dispatch);
  };

  return (
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

export default ForgotPassword;
