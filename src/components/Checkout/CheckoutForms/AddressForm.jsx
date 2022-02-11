import React from "react";
import {
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";

import { useForm, FormProvider } from "react-hook-form";

import TextInput from "./TextField";

const AddressForm = () => {
  const methods = useForm();
  return (
    <>
      <Typography variant="h6" align="center" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit="">
          <Grid container spacing={3}>
            <TextInput name="firstName" label="First Name" required />
            <TextInput name="lastName" label="Last Name" required />
            <TextInput name="address" label="Address" required />
            <TextInput name="country" label="Country" required />
            <TextInput name="city" label="City" required />
            <TextInput name="postCode" label="Post Code" required />
            <TextInput name="email" label="Email" required />
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
