import "../styles/SignUpScreen.css";
import React, { useState, useContext, useEffect } from "react";
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

function SignUpScreen() {
  const navigate = useNavigate();

  const { search } = useLocation();

  const redirectInUrl = new URLSearchParams(search).get("redirect");

  const redirect = redirectInUrl ? redirectInUrl : "/";

  const initialInput = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [signupInput, setSignupInput] = useState(initialInput);

  const signupInputChangeHandler = async (e) => {
    const { name, value } = e.target;
    setSignupInput({ ...signupInput, [name]: value.toString() });
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

  const signupSubmitHandler = async () => {
    if (signupInput.password !== signupInput.confirmPassword) {
      setSnackText("Passwords do not match!");
      setOpen(true);
      return;
    }

    try {
      const { data } = await axios.post("/api/users/signup", {
        name: signupInput.name,
        email: signupInput.email,
        password: signupInput.password,
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

  useEffect(() => {
    const checkInput = () => {
      for (const ele in signupInput) {
        if (signupInput[ele] === "") {
          setDisabled(true);
          return;
        }
      }
      setDisabled(false);
    };

    checkInput();
  }, [signupInput]);

  const [disabled, setDisabled] = useState(true);

  return (
    <Fade cascade>
      <div>
        <Helmet title="Sign Up | GameShop" />
        <div className="signup-form-container">
          <Grid
            container
            direction="row"
            spacing={4}
            justify="center"
            align="center"
            className="sign-in-grid"
          >
            <Grid item xs={12}>
              Sign Up
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Name"
                variant="filled"
                name="name"
                type="text"
                onChange={signupInputChangeHandler}
                value={signupInput.name}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Email"
                variant="filled"
                name="email"
                type="email"
                onChange={signupInputChangeHandler}
                value={signupInput.email}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Password"
                variant="filled"
                name="password"
                type="password"
                onChange={signupInputChangeHandler}
                value={signupInput.password}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Confirm Password"
                variant="filled"
                name="confirmPassword"
                type="password"
                onChange={signupInputChangeHandler}
                value={signupInput.confirmPassword}
                size="small"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                onClick={signupSubmitHandler}
                variant="contained"
                color="primary"
                disabled={disabled}
              >
                SIGN UP
              </Button>
            </Grid>
            <Grid item xs={12}>
              Already have an account?{" "}
              <Link to={`/signin?redirect=${redirect}`}>
                {" "}
                <u>Sign In</u>
              </Link>
            </Grid>
          </Grid>
        </div>
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

export default SignUpScreen;
