import React, { useState, useEffect } from "react";
import {
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";

import { Link } from "react-router-dom";

import { useForm, FormProvider } from "react-hook-form";

import TextInput from "./TextField";

import { commerce } from "../../../lib/commerce";

const AddressForm = ({ checkoutToken, next }) => {
  const methods = useForm();

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  // the reason that I made countries and subdivisions like that is because they are not accessible as array so I map through them and return them as an array to simpily use the data insisde it
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  console.log(countries);

  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );
  console.log(subdivisions);
  // options are shown as an array by default so I jst mapped through the shippingOptions to get the name of the country and also the tax that the customer should pay for that :)
  const options = shippingOptions.map((shippingOption) => ({
    id: shippingOption.id,
    label: `${shippingOption.description} - (${shippingOption.price.formatted_with_symbol})`,
  }));

  // fetching Shipping countries
  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    console.log(countries);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  // fetching Shipping Subdivisions

  const fetchShippingSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    console.log(subdivisions);
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions[0]));
  };

  //fetching shipping option

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  // use Effect for shipping countries, it doesnt need any dependency so it starts fetching data when the pag loads
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  // this one is a bit different we want to fetch subdivions when our country is loaded so we pass shippingCountry as dependecy so it will wait for the shipping country to be chosen and then it starts to show the subdivions
  useEffect(() => {
    if (shippingCountry) fetchShippingSubdivisions(shippingCountry);
  }, [shippingCountry]);

  //this one is also uses the prevois method, first we need to get the subdivions so we define it as a dependency in useEffect Hook :)
  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);
  return (
    <>
      <Typography variant="h6" align="center" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <TextInput name="firstName" label="First Name" required />
            <TextInput name="lastName" label="Last Name" required />
            <TextInput name="country" label="Country" required />
            <TextInput name="city" label="City" required />
            <TextInput name="address" label="Address" required />
            <TextInput name="postCode" label="Post Code" required />
            <TextInput name="phoneNumber" label="Phone Number" required />
            <TextInput name="email" label="Email" required />
            {/* Shipping Country Section */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Shiping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/* Shipping Subdivision Section */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Shiping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/* Shipping Subdivision Section */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Shiping Option</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to cart
            </Button>

            <Button type="submit" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
