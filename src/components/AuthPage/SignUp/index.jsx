import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import {
  LockOutlined,
  MailOutlined,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import validator from "validator";
import { clearAuthError, signUp } from "../../../store/actions";
import SmButtons from "../smButton/smButtons";
import { inputStyles } from "../styles";
import { useState, useEffect } from "react";

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

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [confirmError, setConfirmError] = useState(false);
  const [confirmErrorMsg, setConfirmErrorMsg] = useState("");

  const errorProp = useSelector(({ auth }) => auth.profile.error);
  const loadingProp = useSelector(({ auth }) => auth.profile.loading);

  useEffect(() => setLoading(loadingProp), [loadingProp]);
  useEffect(() => {
    return () => clearAuthError()(dispatch);
  }, [dispatch]);

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
        minSymbols: 1
      })
    ) {
      setPasswordError(true);
      setPasswordErrorMsg(
        "Password must be 8+ chars with uppercase, lowercase, number & symbol."
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
      await signUp({ email, password })(firebase, dispatch);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Typography
        sx={{ textAlign: "center", fontWeight: 700, mb: 2, fontSize: "1.8rem" }}
      >
        Create Account
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onFocus={() => {
          setEmailError(false);
          setEmailErrorMsg("");
        }}
        helperText={emailError ? emailErrorMsg : null}
        error={emailError}
        fullWidth
        autoComplete="email"
        required
        data-testid="signUpEmail"
        sx={{ ...inputStyles, mb: "15px", mt: "4px" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />
            </InputAdornment>
          )
        }}
      />

      <TextField
        variant="outlined"
        value={password}
        placeholder="Enter your password"
        onChange={e => setPassword(e.target.value)}
        onFocus={() => {
          setPasswordError(false);
          setPasswordErrorMsg("");
        }}
        helperText={passwordError ? passwordErrorMsg : null}
        error={passwordError}
        fullWidth
        required
        autoComplete="new-password"
        type={showPassword ? "text" : "password"}
        data-testid="signUpPassword"
        sx={{ ...inputStyles, mb: "15px" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={e => e.preventDefault()}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <TextField
        placeholder="Confirm your password"
        variant="outlined"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        onFocus={() => {
          setConfirmError(false);
          setConfirmErrorMsg("");
        }}
        helperText={confirmError ? confirmErrorMsg : null}
        error={confirmError}
        fullWidth
        required
        type={showConfirmPassword ? "text" : "password"}
        data-testid="signUpConfirmPassword"
        sx={{ ...inputStyles, mb: "15px" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                onMouseDown={e => e.preventDefault()}
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={agreed}
            onChange={() => {
              setAgreed(!agreed);
              setAgreedError(false);
            }}
            color="primary"
            data-testid="TnC"
          />
        }
        label="By creating an account, you agree to our terms and conditions."
      />

      {agreedError && !agreed && (
        <div
          style={{ color: "red", fontSize: "0.82rem", padding: "4px 0 8px" }}
        >
          You must agree to the terms and conditions to register.
        </div>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
        onClick={handleSubmit}
        data-testid="signUpButton"
        sx={{ color: "white", borderRadius: "30px", padding: "10px", mt: 1 }}
      >
        {loading ? "Creating your account..." : "Create an account"}
      </Button>
      <Divider sx={{ padding: "10px", mx: 0 }}>OR</Divider>

      <SmButtons />
    </Box>
  );
};

export default SignUp;
