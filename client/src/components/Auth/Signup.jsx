import {
  Container,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Cat from "../../cat.gif";
import "./login.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link } from "react-router-dom";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useSelector, useDispatch } from 'react-redux';
import { signupUser, userSelector, clearState } from '../../services/AuthApi';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';


function Signup() {
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
      history.push('/');
    }
    if (isError) {
      alert(errorMessage);
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError]);
  
  
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [full_name, setFullName] = React.useState("");

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegister = () => {
    dispatch(clearState());
    setValues({...values, loading: true});
   const _rr =  dispatch(signupUser({ email, password, username, full_name }));
  }
  return (
    <Container>
      <div className="auth-wrapper">
        <div className="d-flex">
          <div className="auth-image">
            <img src={Cat} alt="auth" />
          </div>
          <div className="auth-form">
            <h1>Register on <span className="brand-color">YANA</span></h1>
            <form>
              <div className="form-group">
                <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-email">
                    Email
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email"
                    type={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email"
                  />
                </FormControl>
              </div>
              <div className="form-group">
                <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-Full-Name">
                    Full Name
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-Full-Name"
                    type={"text"}
                    value={full_name}
                    onChange={(e) => setFullName(e.target.value)}
                    label="Full Name"
                  />
                </FormControl>
              </div>
              <div className="form-group">
                <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-username">
                    Username
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-username"
                    type={"text"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    label="Username"
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
                    onChange={(e)=> setPassword(e.target.value)}
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
                  onClick={()=>handleRegister()}
                >
                  {" "}
                  Register{" "}
                </LoadingButton>
                <Link to="/register">Forgot your password?</Link>
              </div>
            </form>
            <Divider />
            <div className="auth-register-option">
                <Typography variant="body2">Already have an account?</Typography>
                <div className="register-btn-area">
                    <Link to="/login">Login</Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Signup;
