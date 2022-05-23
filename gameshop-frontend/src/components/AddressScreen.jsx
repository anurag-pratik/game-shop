import React, { useState, useContext, useEffect } from "react";
import "../styles/AddressScreen.css";
import Fade from "react-reveal/Fade";
import { Helmet } from "react-helmet-async";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";

function AddressScreen() {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { address },
    userInfo,
  } = state;

  const [addressInput, setAddressInput] = useState(
    address || {
      name: "",
      address: "",
      city: "",
      pincode: "",
      country: "",
    }
  );

  const addressInputChangeHandler = async (e) => {
    const { name, value } = e.target;
    setAddressInput({ ...addressInput, [name]: value.toString() });
  };

  const addressSubmitHandler = () => {
    ctxDispatch({
      type: "SAVE_ADDRESS",
      payload: addressInput,
    });
    localStorage.setItem("address", JSON.stringify(addressInput));
    navigate("/summary");
  };

  useEffect(() => {
    if (!userInfo) navigate("/signin?redirect=/address");
  }, [userInfo, navigate]);

  return (
    <Fade cascade>
      <Helmet title="Address | GameShop" />
      <div className="address-form-container">
        <Grid
          container
          direction="row"
          spacing={4}
          justify="center"
          align="center"
          className="sign-in-grid"
        >
          <Grid item xs={12}>
            Billing Address
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Full Name"
              variant="filled"
              name="name"
              type="text"
              onChange={addressInputChangeHandler}
              value={addressInput.name}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Address"
              variant="filled"
              name="address"
              type="text"
              onChange={addressInputChangeHandler}
              value={addressInput.address}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="City"
              variant="filled"
              name="city"
              type="text"
              onChange={addressInputChangeHandler}
              value={addressInput.city}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Pincode"
              variant="filled"
              name="pincode"
              type="number"
              onChange={addressInputChangeHandler}
              value={addressInput.pincode}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Country"
              variant="filled"
              name="country"
              type="text"
              onChange={addressInputChangeHandler}
              value={addressInput.country}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={addressSubmitHandler}
              variant="contained"
              color="primary"
            >
              PROCEED
            </Button>
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
}

export default AddressScreen;
