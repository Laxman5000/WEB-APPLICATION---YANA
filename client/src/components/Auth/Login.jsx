import {
  Alert,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Cat from "../../cat.gif";
import "./login.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, useHistory } from "react-router-dom";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { clearState, loginUser, userSelector } from "../../services/AuthApi";
import { useDispatch, useSelector } from "react-redux";


function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    userSelector
  );

  useEffect(() => {
      dispatch(clearState());
  }, []);
  
  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      window.location.href = "/";
    }
    if (isError ) {
      setOpen(true);
      // dispatch(clearState());
    }
  }, [isSuccess, isError]);

  const [values, setValues] = React.useState({
    showPassword: false,
  });

  
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);


  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    console.log("login");
    dispatch(loginUser({ email, password }));
    // history.push("/");
  }
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Container>
      <div className="auth-wrapper">
        <div className="d-flex">
          <div className="auth-image">
            <img src={Cat} alt="auth" />
          </div>
          <div className="auth-form">
            <h1>Login into <span className="brand-color">YANA</span></h1>
            <form>
              <div className="form-group">
                <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-username">
                    Username or Email
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-username"
                    type={"text"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Username or Email"
                  />
                </FormControl>
              </div>
              <div className="form-group">
                <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={password}
                    onChange={ (e)=>setPassword(e.target.value) }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </div>
              <div className="form-group btn-area">
                <LoadingButton
                  loading={isFetching}
                  loadingPosition="start"
                  startIcon={<LockOpenIcon />}
                  variant="outlined"
                  color="error"
                  onClick={()=>handleLogin()}
                >
                  {" "}
                  Login{" "}
                </LoadingButton>
                <Link to="/register">Forgot your password?</Link>
              </div>
            </form>
            <Divider />
            <div className="auth-register-option">
                <Typography variant="body2">Dont have an account?</Typography>
                <div className="register-btn-area">
                    <Link to="/register">Register</Link>
                </div>
            </div>
          </div>
        </div>
      </div>
      { console.log(errorMessage) }
      <Snackbar open={open || errorMessage} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity={isError?"error":"success"} sx={{ width: '100%' }}>
   {errorMessage}
  </Alert>
</Snackbar>
    </Container>
  );
}



export default Login;
