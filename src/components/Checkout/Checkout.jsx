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

const steps = ["Shipping Address", "Paying Address"];

const Checkout = () => {
  const classes = useStyles();
  const [currentStep, setCurrentStep] = useState(0);

  const Confirmation = () => <div>Confirmation</div>;

  const Form = () => (currentStep === 0 ? <AddressForm /> : <PaymentForm />);
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
          {currentStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
