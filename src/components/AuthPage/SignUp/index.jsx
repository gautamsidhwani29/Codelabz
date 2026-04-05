import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import validator from "validator";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
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
  ShieldOutlined,
  Visibility,
  VisibilityOff,
  Close as CloseIcon,
} from "@mui/icons-material";
import { clearAuthError, signUp } from "../../../store/actions";
import SmButtons from "../smButton/smButtons";
import { inputStyles, authStyles } from "../styles";

const SignUp = () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [agreedError, setAgreedError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorOpen, setErrorOpen] = useState(true);

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [confirmError, setConfirmError] = useState(false);
  const [confirmErrorMsg, setConfirmErrorMsg] = useState("");

  const errorProp = useSelector(({ auth }) => auth.profile.error);
  const loadingProp = useSelector(({ auth }) => auth.profile.loading);

  useEffect(() => setError(errorProp), [errorProp]);
  useEffect(() => setLoading(loadingProp), [loadingProp]);
  useEffect(() => () => clearAuthError()(dispatch), [dispatch]);
  useEffect(() => {
    if (errorProp === false && loadingProp === false) {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAgreed(false);
    }
  }, [errorProp, loadingProp]);

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
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setPasswordError(true);
      setPasswordErrorMsg(
        "8+ chars with uppercase, lowercase, number & symbol."
      );
      return false;
    }
    return true;
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmError(true);
      setConfirmErrorMsg("Passwords do not match!");
      return false;
    }
    setConfirmError(false);
    setConfirmErrorMsg("");
    return true;
  };

  const handleSubmit = async () => {
    const emailOk = validateEmail();
    const passwordOk = validatePassword();
    const confirmOk = validateConfirmPassword();

    if (!agreed) {
      setAgreedError(true);
      return;
    }

    if (emailOk && passwordOk && confirmOk) {
      try {
        await signUp({ email, password })(firebase, dispatch);
      } catch (err) {
        setError(err.message);
        setErrorOpen(true);
      }
    }
  };

  return (
    <Box>
      {/* Error alert */}
      {error && (
        <Collapse in={errorOpen}>
          <Alert
            severity="error"
            sx={{ mb: 2, borderRadius: "8px", fontSize: "13px" }}
            action={
              <IconButton size="small" onClick={() => setErrorOpen(false)}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {error}
          </Alert>
        </Collapse>
      )}

      {/* Email */}
      <Typography sx={authStyles.fieldLabel}>Email address</Typography>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => { setEmailError(false); setEmailErrorMsg(""); }}
        error={emailError}
        helperText={emailError ? emailErrorMsg : undefined}
        autoComplete="email"
        required
        data-testid="signUpEmail"
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
      <Typography sx={authStyles.fieldLabel}>Create password</Typography>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Min. 8 chars, uppercase &amp; symbol"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onFocus={() => { setPasswordError(false); setPasswordErrorMsg(""); }}
        error={passwordError}
        helperText={passwordError ? passwordErrorMsg : undefined}
        autoComplete="new-password"
        type={showPassword ? "text" : "password"}
        required
        data-testid="signUpPassword"
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

      {/* Confirm password */}
      <Typography sx={authStyles.fieldLabel}>Confirm password</Typography>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Repeat your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onFocus={() => { setConfirmError(false); setConfirmErrorMsg(""); }}
        error={confirmError}
        helperText={confirmError ? confirmErrorMsg : undefined}
        autoComplete="new-password"
        type={showConfirmPassword ? "text" : "password"}
        required
        data-testid="signUpConfirmPassword"
        sx={inputStyles}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ShieldOutlined style={{ color: "#9ca3af", fontSize: 18 }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPassword((s) => !s)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
                size="small"
              >
                {showConfirmPassword
                  ? <Visibility style={{ fontSize: 18, color: "#9ca3af" }} />
                  : <VisibilityOff style={{ fontSize: 18, color: "#9ca3af" }} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Terms */}
      <Box sx={authStyles.termsRow}>
        <Checkbox
          checked={agreed}
          onChange={() => { setAgreed((a) => !a); setAgreedError(false); }}
          size="small"
          data-testid="TnC"
          sx={{
            padding: "2px 6px 0 0",
            color: agreedError ? "#dc2626" : "#d1d5db",
            "&.Mui-checked": { color: "#2563eb" },
          }}
        />
        <Typography sx={{ fontSize: "12px", color: "#4b5563", lineHeight: 1.5 }}>
          By creating an account, you agree to our{" "}
          <Box
            component="a"
            href="#"
            sx={{ color: "#2563eb", fontWeight: 500, textDecoration: "none",
              "&:hover": { textDecoration: "underline" } }}
          >
            terms and conditions
          </Box>
          .
        </Typography>
      </Box>

      {agreedError && !agreed && (
        <Typography sx={{ ...authStyles.errorText, mb: "12px" }}>
          You must agree to the terms to register.
        </Typography>
      )}

      {/* Submit */}
      <Button
        variant="contained"
        fullWidth
        disabled={loading}
        onClick={handleSubmit}
        data-testid="signUpButton"
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
        {loading ? "Creating account…" : "Create an Account"}
      </Button>

      {/* Divider */}
      <Box sx={authStyles.divider}>or continue with</Box>

      {/* Social */}
      <SmButtons />
    </Box>
  );
};

export default SignUp;