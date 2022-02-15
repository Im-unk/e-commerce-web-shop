import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";

import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/game-control.png";
import useStyles from "./styles";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            color="inherit"
            component={Link}
            to="/"
          >
            <Link to="/">
              <img src={logo} className={classes.image} height="25px" />
            </Link>
            Store Name
          </Typography>

          <div className={classes.grow} />
          <Link to="/cart">
            <div className={classes.button}>
              <IconButton
                element={Link}
                to="/cart"
                aria-label="Show cart items"
                color="inherit"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
