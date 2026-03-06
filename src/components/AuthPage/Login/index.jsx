import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import validator from "validator";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Box,
  Typography,
  Link as MuiLink
} from "@mui/material";
import {
  LockOutlined,
  MailOutlined,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import { clearAuthError, signIn } from "../../../store/actions";
import SmButtons from "../smButton/smButtons";
import { inputStyles } from "../styles";
import { Link } from "react-router-dom";

const Login = () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const loadingProp = useSelector(({ auth }) => auth.profile.loading);

  useEffect(() => setLoading(loadingProp), [loadingProp]);
  useEffect(() => {
    return () => clearAuthError()(dispatch);
  }, [dispatch]);

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

  const handleSubmit = async e => {
    e.preventDefault();
    if (validateEmail() && validatePassword()) {
      await signIn({ email, password })(firebase, dispatch);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", fontWeight: 700, mb: 2 }}
      >
        Login
      </Typography>
      <TextField
        variant="outlined"
        autoFocus
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
        sx={{ ...inputStyles, mb: "15px" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />
            </InputAdornment>
          )
        }}
      />
      <TextField
        placeholder="Enter your password"
        variant="outlined"
        value={password}
        onChange={e => setPassword(e.target.value)}
        onFocus={() => {
          setPasswordError(false);
          setPasswordErrorMsg("");
        }}
        helperText={passwordError ? passwordErrorMsg : null}
        error={passwordError}
        fullWidth
        required
        autoComplete="current-password"
        type={showPassword ? "text" : "password"}
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
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1, flexWrap: "wrap", gap: 1 }}
      >
        <Grid item>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="remember" color="primary" />}
              label="Remember me"
            />
          </FormGroup>
        </Grid>
        <Grid item>
          <MuiLink
            sx={{
              color: "#2563EB",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
                color: "#1741b0"
              }
            }}
            component={Link}
            to="/forgotpassword"
          >
            Forgot password
          </MuiLink>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
        data-testid="loginButton"
        sx={{ color: "white", borderRadius: "30px", padding: "10px" }}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
      <Divider sx={{ padding: "20px" }}>OR</Divider>
      <SmButtons />
    </Box>
  );
};

export default Login;
