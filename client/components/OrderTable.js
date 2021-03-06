/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartThunk } from "../store/cart";
import { checkQuantity } from "./ProductRow";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    }
  },
  orderTable: {
    marginLeft: "40px",
    marginRight: "40px",
    marginTop: "1rem",
    width: "94%"
  }
});

function convertDate(timestamp) {
  const d = new Date(timestamp);
  const date = d.toDateString() + ", " + d.toLocaleTimeString("en-US");
  return date;
}

function priceTotal(products) {
  const total = products.reduce((accum, current) => {
    return accum + current.price * current.cart.cartQuantity;
  }, 0);
  return total / 100;
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const [snackBarWarningOpen, setSnackBarWarningOpen] = useState(false);

  const classes = useRowStyles();
  const dispatch = useDispatch();

  const products = row.products;
  const date = convertDate(row.updatedAt);
  const total = priceTotal(products);
  const status = row.status.toLowerCase();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarOpen(false);
  };

  const handleWarningClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarWarningOpen(false);
  };

  const productsInCart = useSelector((state) => state.cart.cart);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{date}</TableCell>
        <TableCell align="right">${total}</TableCell>

        <TableCell align="right">{status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Products
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell component="th" scope="row">
                        <Snackbar
                          open={snackBarOpen}
                          autoHideDuration={3000}
                          onClose={handleClose}
                          anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                          <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                            Added to Cart!
                          </Alert>
                        </Snackbar>
                        <Snackbar
                          open={snackBarWarningOpen}
                          autoHideDuration={3000}
                          onClose={handleWarningClose}
                          anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                          <Alert
                            onClose={handleWarningClose}
                            severity="warning"
                            sx={{ width: "100%" }}>
                            {/* There are no {product.name}s left to add to your cart! */}
                            This product is out of stock! Unable to add to cart!
                          </Alert>
                        </Snackbar>
                        <Button
                          variant="contained"
                          onClick={() => {
                            if (checkQuantity(product, productsInCart)) {
                              setSnackBarOpen(true);
                              dispatch(addToCartThunk(product.id));
                            } else {
                              setSnackBarWarningOpen(true);
                              // alert(`There are no ${product.name}'s left to add to your cart!`);
                            }
                          }}>
                          <div className="button-font">ADD TO CART</div>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                      </TableCell>
                      <TableCell align="right">{product.cart.cartQuantity}</TableCell>
                      <TableCell align="right">${product.cart.priceAtCheckout / 100}</TableCell>
                      <TableCell align="right">
                        ${Math.round(product.cart.cartQuantity * product.price) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function OrderTable({ orders }) {
  const styles = useRowStyles();
  return (
    <TableContainer component={Paper} elevation={3} className={styles.orderTable}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order Number</TableCell>
            <TableCell align="right">Order Placed</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <Row key={order.id} row={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
