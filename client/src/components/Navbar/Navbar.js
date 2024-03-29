import React, { useState, useEffect } from "react";
import { AppBar, Typography, Button } from "@material-ui/core";
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
      <AppBar
        position="static"
        color="inherit"
        style={{ backgroundColor: "white" }}
      >
        <Toolbar>
          <Typography
            variant="h3"
            className={classes.title}
            style={{ fontWeight: 500, fontFamily: "cursive" }}
          >
            Logus
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
