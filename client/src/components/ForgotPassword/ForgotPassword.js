import { Typography, TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import { forgotPassword } from "../../actions/auth";
import { useDispatch } from "react-redux";
const ForgotPassword = () => {
  const initialState = {
    email: "",
  };
  const [email, setEmail] = useState(initialState);
  const dispatch = useDispatch();

  //forgot password submit action
  const handleClick = () => {
    console.log(email);
    dispatch(forgotPassword(email));
  };
  return (
    <div className={styles.container}>
      <Typography style={{ fontSize: 25, color: "black", marginTop: 20 }}>
        Forgot Password
      </Typography>
      <Typography
        style={{
          fontSize: 20,
          color: "black",
          marginTop: 20,
          justifyContent: "center",
        }}
      >
        Lost your password? Please enter your username or email address. You
        will receive a link to create a new password via email.
      </Typography>
      <TextField
        onChange={(e) => setEmail({ email: e.target.value })}
        id="standard-basic"
        label="Email"
        variant="standard"
        style={{ color: "white", marginTop: 10 }}
      />
      <Button
        onClick={handleClick}
        variant="contained"
        style={{ color: "blue", backgroundColor: "#a7c4f2", marginTop: 30 }}
      >
        Reset Password
      </Button>
    </div>
  );
};

export default ForgotPassword;
