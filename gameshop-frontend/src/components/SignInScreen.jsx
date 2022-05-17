import React from "react";
import "../styles/SignInScreen.css";
import { Helmet } from "react-helmet-async";
import Fade from "react-reveal/Fade";
import { Link, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

function SignInScreen() {
  const { search } = useLocation();

  const redirectInUrl = new URLSearchParams(search).get("redirect");

  const redirect = redirectInUrl ? redirectInUrl : "/";

  return (
    <Fade cascade>
      <div className="sign-in-container">
        <Helmet>
          <title>Sign In | GameShop - The Best Store For Gamers</title>
        </Helmet>

        <Grid
          container
          direction="row"
          spacing={4}
          justify="center"
          align="center"
          className="sign-in-grid"
        >
          <Grid item xs={12}>
            <TextField
              required
              label="Username"
              variant="filled"
              color="info"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField required label="Password" variant="filled" />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">
              Sign In
            </Button>
          </Grid>
          <Grid item xs={12}>
            New User?{" "}
            <Link to={`/signup?redirect=${redirect}`}>
              {" "}
              <span>Sign Up</span>
            </Link>
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
}

export default SignInScreen;
