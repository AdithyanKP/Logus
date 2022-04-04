import React, { useState } from "react";
import { AppBar, Typography, Button } from "@material-ui/core";
import memories from "../../images/adhi.jpg";
import Toolbar from "@material-ui/core/Toolbar";

import useStyles from "./styles";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("Profile")));
  console.log(user);
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

          <Button
            variant="contained"
            color={user ? "secondary" : "primary"}
            component={Link}
            to="/auth"
          >
            {user ? "Log out" : "Sign In"}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
