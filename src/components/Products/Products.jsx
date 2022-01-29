import React from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./style";

// here is an object that holds our products
const products = [
  {
    id: 1,
    name: "Macbook",
    description: "One of the best products that you can even imagine",
    price: "$290",
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-macbook-air-silver-m1-202010?wid=1144&hei=1144&fmt=jpeg&qlt=80&.v=1634145618000",
  },
  {
    id: 2,
    name: "Apple Watch",
    description: "More than a watch !",
    price: "$220",
    image:
      "https://cdn.pocket-lint.com/r/s/970x/assets/images/158682-smartwatches-review-apple-watch-series-7-all-about-the-screen-image2-ggnlijys37.jpg",
  },
];

// we got a general grid here (it is defined as Container) which we are going to show our products inisde it(which they are defined as Items).

// we map through the products object and show them inside the grid as items!
const Products = () => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify-content="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};
export default Products;
