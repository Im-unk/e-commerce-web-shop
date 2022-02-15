import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
  CardNumberElement,
} from "@stripe/react-stripe-js";

import { Link } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";

import Review from "../Review";

const stripePromise = loadStripe("...");

const PaymentForm = ({ checkoutToken, backStep, next }) => {
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography
        variant="h6"
        gutterBottom
        align="center"
        style={{ margin: "20px 0" }}
      >
        Payment Method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form>
              <CardElement />
              <br /> <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                  onClick={next}
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
