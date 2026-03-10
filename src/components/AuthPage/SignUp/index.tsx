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
import type { Dispatch } from "redux";
import { clearAuthError, signUp } from "../../../store/actions";
import SmButtons from "../smButton/smButtons";
import { inputStyles } from "../styles";
import React, { useState, useEffect } from "react";

interface RootState {
  auth: {
    profile: {
      error: string | false | null;
      loading: boolean;
    };
  };
}

const SignUp = (): JSX.Element => {
  const dispatch = useDispatch<Dispatch>();
  const firebase = useFirebase();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [agreed, setAgreed] = useState<boolean>(false);
  const [agreedError, setAgreedError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>("");
  const [confirmError, setConfirmError] = useState<boolean>(false);
  const [confirmErrorMsg, setConfirmErrorMsg] = useState<string>("");

  const errorProp = useSelector(({ auth }: RootState) => auth.profile.error);
  const loadingProp = useSelector(
    ({ auth }: RootState) => auth.profile.loading
  );

  useEffect(() => setLoading(loadingProp), [loadingProp]);
  useEffect(() => {
    return () => {
      clearAuthError()(dispatch);
    };
  }, [dispatch]);

  useEffect(() => {
    if (errorProp === false && loadingProp === false) {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAgreed(false);
    }
  }, [errorProp, loadingProp]);

  const validateEmail = (): boolean => {
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

  const validatePassword = (): boolean => {
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

  const validateConfirmPassword = (): boolean => {
    if (password !== confirmPassword) {
      setConfirmError(true);
      setConfirmErrorMsg("Passwords do not match!");
      return false;
    }
    setConfirmError(false);
    setConfirmErrorMsg("");
    return true;
  };

  const handleSubmit = async (): Promise<void> => {
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
                onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
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
                onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
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
