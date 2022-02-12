import React, { useState, useEffect } from "react";
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

import { commerce } from "../../../lib/commerce";

const AddressForm = ({ checkoutToken }) => {
  const methods = useForm();

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const countries = Object.entries(shippingCountries).map(([code, label]) => ({
    id: code,
    label: label,
  }));

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    console.log(countries);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

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
            <TextInput name="country" label="Country" required />
            <TextInput name="city" label="City" required />
            <TextInput name="address" label="Address" required />
            <TextInput name="postCode" label="Post Code" required />
            <TextInput name="phoneNumber" label="Phone Number" required />
            <TextInput name="email" label="Email" required />

            <Grid item xs={12} sm={6}>
              <InputLabel>Shiping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/*
            <Grid item xs={12} sm={6} >
              <InputLabel>Shiping Subdividion</InputLabel>
              <Select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                Select Me
                </MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} sm={6} >
              <InputLabel>Shiping Option</InputLabel>
              <Select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                Select Me
                </MenuItem>
              </Select>
            </Grid> */}
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
