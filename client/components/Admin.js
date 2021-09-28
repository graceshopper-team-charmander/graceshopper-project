import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminUsers, fetchAdminProducts } from "../store/admin";
import { FETCH_FAILED, FETCH_PENDING } from "../../constants";
import AllUsers from "./AllUsers";
import AllAdminProducts from "./AllAdminProducts";
import LoadingBar from "./LoadingBar";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AdminTabSelector from "./AdminTabSelector";
import WishlistProduct from "./WishlistProduct";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "1em 0"
  },
  adminPage: {
    width: "80%",
    margin: "0 auto"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  adminTable: {
    width: "100%",
    margin: "0 0 2em 0"
  },
  subHeader: {
    padding: "1em 0 1.2em 0",
    fontSize: "1.2em"
  },
  tableTitle: {
    backgroundColor: "#484848",
    color: "white",
    padding: ".5em 1em",
    height: "50px",
    fontSize: "1.2em"
  },
  adminLinks: {
    color: "#484848",
    "&:hover": {
      color: "#e71e07",
      textDecoration: "none",
      transition: "all .4s ease"
    }
  }
}));

const Admin = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);
  const products = useSelector((state) => state.admin.products);

  const fetchUsersStatus = useSelector((state) => state.admin.fetchUsersStatus);
  const fetchProductsStatus = useSelector((state) => state.admin.fetchProductsStatus);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAdminUsers());
  }, []);

  if (fetchUsersStatus === FETCH_PENDING || fetchProductsStatus === FETCH_PENDING)
    return (
      <div className="loading">
        <LoadingBar />
      </div>
    );

  if (fetchUsersStatus === FETCH_FAILED || fetchProductsStatus === FETCH_FAILED)
    return <div>Error!</div>;

  return (
    <Grid item xs={12} className="page">
      <div className="page-header">
        <div className="page-title">Administration</div>
      </div>
      <div className="page-body">
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <AdminTabSelector />
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

/*

 <div className={classes.root}>
      <Grid container direction="row" justifyContent="flex-start" className="admin-header">
        <Grid container direction="row" justifyContent="flex-start" className="admin-title">
          Administration
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={classes.adminPage}>

        <Paper elevation={3} className={classes.adminTable}>
          <Grid container direction="column" justifyContent="center">
            <Grid id="users" className={classes.tableTitle} container alignItems="center">
              Users
            </Grid>
            <AllUsers users={users} />
          </Grid>
        </Paper>
        <Paper elevation={3} className={classes.adminTable}>
          <Grid container direction="column" justifyContent="center">
            <Grid id="products" className={classes.tableTitle} container alignItems="center">
              Products
            </Grid>
            <AllAdminProducts products={products} />
          </Grid>
        </Paper>
      </Grid>
    </div>
 */

export default Admin;

// Get all products
// Get all users
// If products have 0 - delete from database
// Promo codes? - probably not
