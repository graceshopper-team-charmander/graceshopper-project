import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/products";
import { FETCH_FAILED, FETCH_PENDING } from "../constants";
import ProductRow from "./ProductRow";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useHistory, useLocation } from "react-router-dom";
import { getQueryParam, setQueryParam } from "../utility-funcs/query";
import { snakeCase } from "../../utility-funcs/string-manip";
import CategoryFilter from "./CategoryFilter";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  formControlRoot: {
    width: "100%"
  }
}));

const AllProducts = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const fetchStatus = useSelector((state) => state.products.fetchStatus);
  const location = useLocation();
  const history = useHistory();
  //on mount
  useEffect(() => {
    dispatch(fetchProducts(location));
  }, []);

  if (fetchStatus === FETCH_PENDING) return <div>Loading</div>;
  else if (fetchStatus === FETCH_FAILED) return <div>Error!</div>;

  return (
    <div className="all-products-page">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {/* <Paper elevation={1} className={styles.paperRoot}> */}
          <div className="all-products-header">
            <h4 className="all-products-title">Characters</h4>
            <CategoryFilter location={location} history={history} />
          </div>

          <Grid item xs={12} className="all-products-container">
            {products.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </Grid>
          {/* </Paper> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default AllProducts;
