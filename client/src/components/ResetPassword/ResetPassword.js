import React, { useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import styles from "./ResetPassword.module.css";
import { resetPassword } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  //react-router-dom navigate
  const navigate = useNavigate();

  //taking id and token via params
  const { id, token } = useParams();

  const dispatch = useDispatch();

  const initialState = {
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialState);

  //reset button click
  const handleClick = () => {
    dispatch(resetPassword(formData, id, token));
    navigate("/auth");
  };
  return (
    <div className={styles.container}>
      <Typography style={{ fontSize: 25, color: "black", marginTop: 20 }}>
        Reset Password
      </Typography>

      <TextField
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        id="standard-basic"
        label="New-Password"
        variant="standard"
        style={{ color: "white", marginTop: 10 }}
      />
      <TextField
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        id="standard-basic"
        label="Re-Enter Password"
        variant="standard"
        style={{ color: "white", marginTop: 10 }}
      />
      <Button
        onClick={handleClick}
        variant="contained"
        style={{ color: "blue", backgroundColor: "#a7c4f2", marginTop: 30 }}
      >
        Confirm
      </Button>
    </div>
  );
};

export default ResetPassword;
