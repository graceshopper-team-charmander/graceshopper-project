/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCartThunk } from "../store/cart";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "10px",
    marginBottom: "40px",
    height: "280px",
    width: "200px",
    border: "8px solid #fcd000",
    borderRadius: "10px",
    "&:hover": {
      boxShadow: "0 0 10px 5px #cccccc",
      transition: "all .4s ease"
    },
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFF3E0"
  },
  cardContent: {
    padding: "5px",
    display: "flex",
    flexDirection: "column",
    height: "70%"
  },
  cardImage: {
    borderRadius: "2px",
    border: "5px solid #fcd000"
  },
  button: {
    backgroundColor: "#fcd000",
    color: "white",
    "&:hover": {
      backgroundColor: "#e71e07",
      transition: "all .4s ease"
    },
    margin: "5x",
    width: "150px",
    alignSelf: "center"
  },
  cardBody: {
    display: "flex",
    flexGrow: "1",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cardPrice: {
    marginTop: "20px",
    color: "#484848",
    "&:hover": {
      color: "#616161"
    }
  },
  cardTitle: {
    color: "#484848",
    "&:hover": {
      color: "#616161"
    },
    marginLeft: "2px",
    fontWeight: "bold"
  }
}));

const ProductRow = (props) => {
  const { product } = props;
  const { id, name, description, price, imageUrl } = product;

  const styles = useStyles();

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCartThunk(id));
  };

  return (
    <Card className={styles.card}>
      <Link to={`/products/${id}`}>
        <CardContent className={styles.cardContent}>
          <Typography sx={{ fontSize: 10 }} className={styles.cardTitle}>
            {name}
          </Typography>
          <div className={styles.cardBody}>
            <CardMedia
              className={styles.cardImage}
              component="img"
              height="120"
              image={imageUrl}
              alt={name}
            />
            <Typography sx={{ mb: 1.5 }} className={styles.cardPrice}>
              ${price}
            </Typography>
          </div>
        </CardContent>
      </Link>
      <Button variant="contained" onClick={handleClick} className={styles.button}>
        ADD TO CART
      </Button>
    </Card>
  );
};

export default ProductRow;
