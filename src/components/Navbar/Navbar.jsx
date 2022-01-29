import React from "react";
import {
  Appbar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";

import logo from "../../assets/game-control.png";

const Navbar = () => {
  return (
    <>
      <Appbar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit">
            <img src={logo} />
            Store Name
          </Typography>
        </Toolbar>
      </Appbar>
    </>
  );
};

export default Navbar;
