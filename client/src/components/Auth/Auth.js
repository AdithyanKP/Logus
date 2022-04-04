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

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const classes = useStyle();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //form submission
  const handleSubmit = () => {};

  //handlechange
  const handleChange = () => {};

  //handle show password

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  //swich mode
  const switchMode = () => {
    setIsSignup((prev) => !prev);
    handleShowPassword(false);
  };

  //google success
  const successResponse = (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  //google failed
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
                <Input name="first name" label="First name" autofocus Half />
                <Input name="last name" label="Last name" Half />
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
                name="confirm password"
                label="Repeat Password"
                handleChange={handleChange}
              />
            )}
          </Grid>
          <Button
            color="primary"
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
