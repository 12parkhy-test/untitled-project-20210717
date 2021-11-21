import axios from "axios";

import { GET_FILE_TO_DOWNLOAD } from "./types";

export const getFileToDownload = (start, end) => async (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {},
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios
    .get(`/api/admin/download/getfiletodownload/${start + ":" + end}`, config)
    .then((res) => {
      console.log("Successfully retrieved a file to download with date");
      dispatch({
        type: GET_FILE_TO_DOWNLOAD,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err", err);
    });
};
