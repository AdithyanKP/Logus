import React from "react";
import { AppBar, Typography, Button } from "@material-ui/core";
import memories from "../../images/adhi.jpg";
import Toolbar from "@material-ui/core/Toolbar";

import useStyles from "./styles";
const Navbar = () => {
  const user = null;
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

          <Button variant="contained" color="primary">
            {user ? "Log out" : "Sign In"}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
