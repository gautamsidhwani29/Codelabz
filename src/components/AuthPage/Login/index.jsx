import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { useLocation, Link } from "react-router-dom";
import validator from "validator";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  IconButton,
  InputAdornment,
  Box,
  Typography,
  Alert,
  Collapse,
} from "@mui/material";
import {
  LockOutlined,
  MailOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { clearAuthError, signIn } from "../../../store/actions";
import SmButtons from "../smButton/smButtons";
import ViewAlerts from "./ViewAlerts";
import { inputStyles, authStyles } from "../styles";

const Login = () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [signupMessage, setSignupMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const errorProp = useSelector(({ auth }) => auth.profile.error);
  const loadingProp = useSelector(({ auth }) => auth.profile.loading);

  useEffect(() => setError(errorProp), [errorProp]);
  useEffect(() => setLoading(loadingProp), [loadingProp]);
  useEffect(() => () => clearAuthError()(dispatch), [dispatch]);
  useEffect(() => {
    setSignupMessage(location.state?.successMessage || "");
  }, [location.state]);

  const validateEmail = () => {
    if (validator.isEmpty(email)) {
      setEmailError(true);
      setEmailErrorMsg("Please enter your email!");
      return false;
    }
    if (!validator.isEmail(email)) {
      setEmailError(true);
      setEmailErrorMsg("Please enter a valid email!");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (validator.isEmpty(password)) {
      setPasswordError(true);
      setPasswordErrorMsg("Please enter your password!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (validateEmail() && validatePassword()) {
      await signIn({ email, password })(firebase, dispatch);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <ViewAlerts
        error={error}
        email={email}
        successMessage={signupMessage}
      />

      {/* Email */}
      <Typography sx={authStyles.fieldLabel}>Email address</Typography>
      <TextField
        variant="outlined"
        fullWidth
        autoFocus
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => { setEmailError(false); setEmailErrorMsg(""); }}
        error={emailError}
        helperText={emailError ? emailErrorMsg : undefined}
        autoComplete="email"
        required
        sx={inputStyles}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailOutlined style={{ color: "#9ca3af", fontSize: 18 }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Password */}
      <Typography sx={authStyles.fieldLabel}>Password</Typography>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onFocus={() => { setPasswordError(false); setPasswordErrorMsg(""); }}
        error={passwordError}
        helperText={passwordError ? passwordErrorMsg : undefined}
        autoComplete="current-password"
        type={showPassword ? "text" : "password"}
        required
        sx={inputStyles}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlined style={{ color: "#9ca3af", fontSize: 18 }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((s) => !s)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
                size="small"
              >
                {showPassword
                  ? <Visibility style={{ fontSize: 18, color: "#9ca3af" }} />
                  : <VisibilityOff style={{ fontSize: 18, color: "#9ca3af" }} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Remember me + Forgot */}
      <Box sx={authStyles.rowSplit}>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              sx={{ color: "#d1d5db", "&.Mui-checked": { color: "#2563eb" } }}
            />
          }
          label={
            <Typography sx={{ fontSize: "13px", color: "#4b5563" }}>
              Remember me
            </Typography>
          }
        />
        <Link to="/forgotpassword" style={{ textDecoration: "none" }}>
          <Typography sx={authStyles.forgotLink}>
            Forgot password?
          </Typography>
        </Link>
      </Box>

      {/* Submit */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        data-testid="loginButton"
        sx={{
          background: "#2563eb",
          borderRadius: "8px",
          padding: "11px",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          boxShadow: "none",
          "&:hover": { background: "#1d4ed8", boxShadow: "none" },
          "&:active": { background: "#1e40af" },
          "&.Mui-disabled": { background: "#93c5fd", color: "#fff" },
        }}
      >
        {loading ? "Logging in…" : "Login"}
      </Button>

      {/* Divider */}
      <Box sx={authStyles.divider}>or continue with</Box>

      {/* Social */}
      <SmButtons />
    </Box>
  );
};

export default Login;