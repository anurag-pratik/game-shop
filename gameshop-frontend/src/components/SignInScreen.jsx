import React, { useState, useContext, useEffect } from "react";
import "../styles/SignInScreen.css";
import { Helmet } from "react-helmet-async";
import Fade from "react-reveal/Fade";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axios from "axios";
import { Store } from "../Store";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { getError } from "../utils";

function SignInScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();

  const redirectInUrl = new URLSearchParams(search).get("redirect");

  const redirect = redirectInUrl ? redirectInUrl : "/";

  const initialInput = {
    email: "",
    password: "",
  };

  const [signinInput, setSigninInput] = useState(initialInput);

  const signinInputChangeHandler = async (e) => {
    const { name, value } = e.target;
    setSigninInput({ ...signinInput, [name]: value.toString() });
  };

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { userInfo } = state;

  const [open, setOpen] = useState(false);
  const [snackText, setSnackText] = useState("Error");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const signinSubmitHandler = async () => {
    try {
      const { data } = await axios.post("/api/users/signin", {
        email: signinInput.email,
        password: signinInput.password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      setSnackText(getError(err));
      setOpen(true);
    }
  };

  useEffect(() => {
    if (userInfo) navigate(redirect || "/");
  }, [navigate, userInfo, redirect]);

  return (
    <Fade cascade>
      <div className="sign-in-container">
        <Helmet title={"Sign In | GameShop - The Best Store For Gamers"} />

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
              name="email"
              onChange={signinInputChangeHandler}
              value={signinInput.email}
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Password"
              variant="filled"
              name="password"
              type="password"
              onChange={signinInputChangeHandler}
              value={signinInput.password}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={signinSubmitHandler}
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          </Grid>
          <Grid item xs={12}>
            New User?{" "}
            <Link to={`/signup?redirect=${redirect}`}>
              {" "}
              <u>Sign Up</u>
            </Link>
          </Grid>
        </Grid>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            variant="filled"
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {snackText}
          </Alert>
        </Snackbar>
      </div>
    </Fade>
  );
}

export default SignInScreen;
