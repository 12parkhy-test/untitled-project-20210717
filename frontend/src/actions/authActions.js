import axios from "axios";
import { auth } from "../firebase";
import {
  LOG_OUT,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
} from "./types";

export const login =
  ({ userInfo, type }) =>
  async (dispatch, getState) => {
    const token = getState().auth.token;

    const config = {
      headers: {},
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    const body = {
      email: userInfo.email,
      uid: userInfo.uid,
      // type,
    };

    axios
      .post("/api/authentication/login", body, config)
      .then((res) => {
        console.log("Successfully logged in");

        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log("err", err);
        auth.signOut();
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };

export const register = (userInfo) => async (dispatch, getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {},
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  const body = {
    email: userInfo.email,
    uid: userInfo.uid,
  };
  axios
    .post("/api/authentication/register", body, config)
    .then((res) => {
      console.log("Successfully registered");
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err", err);
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

export const logOut = () => {
  console.log("Successfully logged out");
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const loadUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  const token = getState().auth.token;

  const config = {
    headers: {},
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios
    .get("/api/authentication/user", config)
    .then((res) => {
      console.log("Successfully loaded a user");
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err", err);
      dispatch({
        type: AUTH_ERROR,
      });
    });
};
