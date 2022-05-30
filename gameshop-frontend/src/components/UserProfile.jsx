import "../styles/UserProfile.css";
import React, { useContext, useReducer, useState } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESSFUL":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

function UserProfile() {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const initialInput = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [profileInput, setProfileInput] = useState(initialInput);

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const profileInputChangeHandler = async (e) => {
    const { name, value } = e.target;
    setProfileInput({ ...profileInput, [name]: value.toString() });
  };

  const profileSubmitHandler = async () => {
    if (profileInput.password !== profileInput.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { data } = await axios.put(
        "api/users/profile",
        {
          name: profileInput.name,
          email: profileInput.email,
          password: profileInput.password,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      if (!loadingUpdate) navigate("/");
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL" });
      alert(err);
    }
  };

  return (
    <div className="profile-container">
      <Helmet title="Your Profile | GameShop" />
      <Grid
        container
        direction="row"
        spacing={4}
        justify="center"
        align="center"
        className="profile-form-container"
      >
        <Grid item xs={12}>
          <h2>Update Profile</h2>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Name"
            variant="filled"
            name="name"
            type="text"
            onChange={profileInputChangeHandler}
            value={profileInput.name}
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
            onChange={profileInputChangeHandler}
            value={profileInput.email}
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
            onChange={profileInputChangeHandler}
            value={profileInput.password}
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
            onChange={profileInputChangeHandler}
            value={profileInput.confirmPassword}
            size="small"
          />
        </Grid>

        <Grid item xs={12}>
          <Button onClick={profileSubmitHandler} variant="contained">
            UPDATE
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserProfile;
