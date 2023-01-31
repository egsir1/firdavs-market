import React from "react";
import { Grid } from "@mui/material";
import Product from "./Product";
import useStyle from "./ProductsStyle";

/* const products = [
  {
    id: 1,
    name: "Guruch",
    description: "Basmati rice",
    price: "$5",
    image:
      "https://ourshopkorea.com/37-medium_default/india-gate-sella-basmati-rice-1kg.jpg",
  },
  {
    id: 2,
    name: "Nutella",
    description: "Choco",
    price: "$11",
    image: "https://m.media-amazon.com/images/I/61h44cYTynL.jpg",
  },
]; */

const Products = ({ marketProducts, isLoading }) => {
  const classes = useStyle();
  if (isLoading) {
    return (
      <main className={classes.loader}>
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

      <Grid container justifyContent="center" spacing={4}>
        {marketProducts.map((product) => (
          <Grid item key={product.id} sm={6} xs={12} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
