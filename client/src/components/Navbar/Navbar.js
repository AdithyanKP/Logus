import React, { useState, useEffect } from "react";
import { AppBar, Typography, Button } from "@material-ui/core";
import memories from "../../images/adhi.jpg";
import Toolbar from "@material-ui/core/Toolbar";

import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("Profile")));
  console.log(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("Profile")));
  }, [location]);

  //logout
  const logoutHandle = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth");
    setUser(null);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <img
            className={classes.image}
            src={memories}
            alt="logo"
            height="80"
            width="80"
          />
          <Typography variant="h3" className={classes.title}>
            C-Share
          </Typography>
          {user && (
            <Typography variant="h6" className={classes.userName}>
              {user.result.name}
            </Typography>
          )}
          {user ? (
            <Button
              variant="contained"
              color={user ? "secondary" : "primary"}
              onClick={logoutHandle}
            >
              logout
            </Button>
          ) : (
            <Button
              variant="contained"
              color={user ? "secondary" : "primary"}
              component={Link}
              to="/auth"
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
