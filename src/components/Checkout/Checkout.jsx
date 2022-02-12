import { React, useState } from "react";
import {
  Paper,
  Stepper,
  Typography,
  Step,
  StepLabel,
  CircularProgress,
  Button,
  Divider,
} from "@material-ui/core";

import useStyles from "./styles";

import AddressForm from "../Checkout/CheckoutForms/AddressForm";

import PaymentForm from "../Checkout/CheckoutForms/PaymentForm";

import { commerce } from "../../lib/commerce";

import { useEffect } from "react";

const steps = ["Shipping Address", "Paying Address"];

const Checkout = ({ cart }) => {
  const classes = useStyles();
  const [currentStep, setCurrentStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        console.log(token);
        setCheckoutToken(token);
      } catch (error) {}
    };

    generateToken();
  }, [cart]);

  const Confirmation = () => <div>Confirmation</div>;

  const Form = () =>
    currentStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} />
    ) : (
      <PaymentForm />
    );
  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={currentStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {currentStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
