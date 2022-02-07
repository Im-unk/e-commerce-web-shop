import React from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./style";

// we got a general grid here (it is defined as Container) which we are going to show our products inisde it(which they are defined as Items).

// we map through the products object that we just defined it as props and we recieved it and now we are maping through it
// then our products from commerce.js are going to show up in the grid as our products
// so we defined a prop called products and we set it to Products and how we are going to get data from that?
//well, we just defined our commerce.js in App.js file and we also set a setState which our products are inside it and we are going to get our products feom that so every thing is defined in the App.js file and we are going to get our products as props inside our products :)
//then inside Products we map through the products that we got that as props so and define the name of the items as product
// and inside the Product componnet we also defined another prop and we get it and use it in the Product and it comes from the map that we had inside the products :)
const Products = ({ products, onAddToCart }) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};
export default Products;
