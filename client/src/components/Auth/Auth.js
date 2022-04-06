import React, { useState } from "react";
import useStyle from "./styles";
import GoogleLogin from "react-google-login";
import Icon from "./Icon";
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  Button,
} from "@material-ui/core";
import LockOutLinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn, signUp } from "../../actions/auth";

const Auth = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  //style
  const classes = useStyle();

  //redux dispatch
  const dispatch = useDispatch();

  //react-router-dom navigate
  const navigate = useNavigate();

  //form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signUp(formData, navigate));
    } else {
      dispatch(signIn(formData, navigate));
    }
  };

  //handlechange
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle show password

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  //swich mode
  const switchMode = () => {
    setIsSignup((prev) => !prev);
    setShowPassword(false);
  };

  //google authetication success
  const successResponse = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  //google authentication  failed
  const failedResponse = () => {
    console.log("google auth error");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutLinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First name"
                  autofocus
                  Half
                  handleChange={handleChange}
                />
                <Input
                  name="lastName"
                  label="Last name"
                  Half
                  handleChange={handleChange}
                />
              </>
            )}
            <>
              <Input
                name="email"
                label="Email"
                autofocus
                type="email"
                handleChange={handleChange}
              />
              <Input
                name="password"
                label="Password"
                autofocus
                type={showPassword ? "text" : "password"}
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
              />
            </>
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                type={showPassword ? "text" : "password"}
                handleChange={handleChange}
              />
            )}
          </Grid>
          <Button
            color="primary"
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="829717512930-li64362c8ni3mjphkfos9lhmn08vrdmu.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                style={{ backgroundColor: "#39bd6b" }}
                className={classes.googleButton}
                fullWidth
                variant="contained"
                onClick={renderProps.onClick}
                /*  disabled={renderProps.disabled} */
                startIcon={<Icon />}
              >
                Google Sign in
              </Button>
            )}
            onSuccess={successResponse}
            onFailure={failedResponse}
            cookiePolicy={"single_host_origin"}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account ? Sign In"
                  : "Don't have an acoount? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
