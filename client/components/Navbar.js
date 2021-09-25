/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { logout } from "../store";
import { fetchCart } from "../store/cart";

import NavbarMenu from "./NavbarMenu";

import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "1%",
    paddingRight: "1%",
    boxShadow: "none",
    borderBottom: "2px solid gray"
  },
  toolBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row"
    // fontSize: "1.3rem"
  },
  link: {
    color: "#484848",
    margin: "2%",
    marginRight: "3%",
    "&:hover": {
      color: "#e71e07",
      textDecoration: "none",
      transition: "all .4s ease"
    },
    // width: "35%",
    display: "flex",
    flexFlow: "row nowrap",
    whiteSpace: "nowrap"
  },
  links: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 2
  },
  linkLeft: {
    display: "flex",
    width: "40%",
    justifyContent: "space-around",
    alignItems: "center"
  },
  logo: {
    width: "35%",
    marginRight: "3%"
  },
  linkRight: {
    display: "flex",
    width: "40%",
    justifyContent: "space-around",
    alignItems: "center"
  },
  badge: {
    marginRight: "4%",
    marginBottom: "15px"
  },
  total: {}
  // search: {
  //   width: "50%",
  //   display: "flex",
  //   alignItems: "center",
  //   flexShrink: 1
  // },
  // searchButton: {
  //   backgroundColor: "#e71e07",
  //   height: "40px",
  //   width: "40px",
  //   alignSelf: "flex-end",
  //   boxShadow: "none",
  //   padding: 0,
  //   borderTopLeftRadius: 0,
  //   borderBottomLeftRadius: 0
  // }
}));

const Navbar = ({ handleClick, isLoggedIn, cart }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  let total = 0;
  if (!cart.length) {
    total = 0;
  } else {
    let quantity = cart.map((item) => {
      return item.cart.quantity;
    });
    total = quantity.reduce((accum, current) => accum + current);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        className={styles.navbar}
        style={{ backgroundColor: "white !important" }}>
        <ToolBar className={styles.toolBar}>
          <img
            className={styles.logo}
            src="https://fontmeme.com/permalink/210922/7883c797940c9330ef88b87589f6212a.png"
          />
          {/* <div className={styles.search}>
            <TextField id="standard-basic" label="Search" variant="standard" />
            <Button variant="contained" className={styles.searchButton}>
              <i className="fas fa-search"></i>
            </Button>
          </div> */}
          <div className={styles.links}>
            <div className={styles.linkLeft}>
              <Link component={RouterLink} to="/" className={styles.link}>
                <i className="fas fa-home icon"></i>
                <div className="nav-link-text">Home</div>
              </Link>
              <Link component={RouterLink} to="/products" className={styles.link}>
                <i className="fas fa-gamepad"></i>
                <div className="nav-link-text">Products</div>
              </Link>
            </div>
            {isLoggedIn ? (
              <div className={styles.linkRight}>
                <Link component={RouterLink} to="/cart" className={styles.link}>
                  <Badge
                    badgeContent={total}
                    color="secondary"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left"
                    }}
                    className={styles.badge}></Badge>
                  <i className="fas fa-shopping-cart"></i>
                  <div className="nav-link-text">Cart</div>
                </Link>
                <NavbarMenu />
              </div>
            ) : (
              <div className={styles.linkRight}>
                <Link component={RouterLink} to="/login" className={styles.link}>
                  <i className="fas fa-sign-in-alt"></i>
                  <div className="nav-link-text">Login</div>
                </Link>

                <Link component={RouterLink} to="/signup" className={styles.link}>
                  <i className="fas fa-user-plus"></i>
                  <div className="nav-link-text">Sign Up</div>
                </Link>
              </div>
            )}
          </div>
        </ToolBar>
      </AppBar>
      <div className="poke-walk-box">
        <img className="poke-walk" src="/images/pokemon-walk.png" alt="pokemon-walk" />
      </div>
    </Box>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: state.auth.loggedIn,
    cart: state.cart.cart
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);
