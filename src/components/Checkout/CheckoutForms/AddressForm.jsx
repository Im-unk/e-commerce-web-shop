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
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit="">
          <Grid container spacing={3}>
            <TextInput name="firstName" label="First Name" required />
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
