import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/products";
import { FETCH_FAILED, FETCH_PENDING } from "../../constants";
import ProductRow from "./ProductRow";
import { useHistory, useLocation } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";
import LoadingBar from "./LoadingBar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Sort from "./Sort";
import { getQueryParam, setQueryParam } from "../utility-funcs/query";
import NotFound from "./NotFound";
import ListPagination from "./ListPagination";
import { fetchWishlist } from "../store/wishlist";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  formControlRoot: {
    width: "100%"
  },
  allProducts: {
    // backgroundImage: "url(/images/paper.jpeg)",
    // objectFit: "cover"
  }
}));

const AllProducts = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const fetchStatus = useSelector((state) => state.products.fetchStatus);
  const location = useLocation();
  const history = useHistory();
  const totalItems = useSelector((state) => state.products.totalItems);
  //on mount
  useEffect(() => {
    const page = getQueryParam(location, "page");
    if (!page) {
      let query = setQueryParam(location, "page", 1);
      query = setQueryParam(query, "sort", "name");
      query = setQueryParam(query, "dir", "asc");
      history.replace(`${location.pathname}?${query}`);
    } else {
      dispatch(fetchProducts(location));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, []);

  useEffect(() => {
    dispatch(fetchProducts(location));
  }, [location.search]);

  if (fetchStatus === FETCH_PENDING) {
    return (
      <div className="loading">
        <LoadingBar />
      </div>
    );
  } else if (fetchStatus === FETCH_FAILED) {
    const error = 500;
    const message = "OOPS! SERVER ERROR";
    return (
      <div>
        <NotFound error={error} message={message} />
      </div>
    );
  }

  return (
    <div className="all-products-page">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {/* <Paper elevation={1} className={styles.paperRoot}> */}
          <div className="all-products-header">
            <h4 className="all-products-title">Characters</h4>
            <div>
              <Sort />
            </div>
          </div>
          <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="center"
            className={styles.allProducts}>
            <div className="all-products-cat">
              <CategoryFilter location={location} history={history} />
            </div>
            <Grid item xs={12} className="all-products-container">
              {products.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
            </Grid>
            <Grid container direction="row" justifyContent="center" alignItems="flex-start">
              <ListPagination totalItems={totalItems} />
            </Grid>
          </Grid>
          {/* </Paper> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default AllProducts;
