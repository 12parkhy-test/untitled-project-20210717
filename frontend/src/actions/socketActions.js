import axios from "axios";

import {
  SET_CHANGE_STREAM_SOCKET,
  CHANGE_NEW_DATA,
  GET_NEW_DATA,
  RESET_NEW_DATA,
} from "./types";

export const setChangeStreamSocket = (socket) => async (dispatch, getState) => {
  dispatch({
    type: SET_CHANGE_STREAM_SOCKET,
    payload: socket,
  });
};

export const changeNewData = (data) => async (dispatch, getState) => {
  dispatch({
    type: CHANGE_NEW_DATA,
    payload: data,
  });
};

export const getNewData = () => async (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {},
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios
    .get(`/api/admin/datavisualization/getnewdata`, config)
    .then((res) => {
      console.log("Successfully retrieved new data");
      dispatch({
        type: GET_NEW_DATA,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const resetNewData = () => async (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {},
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios
    .delete(`/api/admin/datavisualization/resetnewdata`, config)
    .then((res) => {
      console.log("Successfully reset new data");
      dispatch({
        type: RESET_NEW_DATA,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err", err);
    });
};
