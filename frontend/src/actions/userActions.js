import axios from "axios";

import {
  GET_DAILY_NEW_USERS_WITH_DATE,
  GET_CUMULATIVE_USERS_WITH_DATE,
} from "./types";

export const getDailyNewUsersWithDate =
  (start, end) => async (dispatch, getState) => {
    const token = getState().auth.token;

    const config = {
      headers: {},
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    axios
      .get(
        `/api/admin/datavisualization/getdailynewuserswithdate/${
          start + ":" + end
        }`,
        config
      )
      .then((res) => {
        console.log("Successfully retrieved all daily new users with date");
        dispatch({
          type: GET_DAILY_NEW_USERS_WITH_DATE,
          payload: {
            data: res.data.modifiedNewUsers,
            dates: res.data.newUsersDates,
          },
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

export const getCumulativeUsersWithDate =
  (start, end) => async (dispatch, getState) => {
    const token = getState().auth.token;
    const config = {
      headers: {},
    };
    if (token) {
      config.headers["x-auth-token"] = token;
    }

    axios
      .get(
        `/api/admin/datavisualization/getcumulativeuserswithdate/${
          start + ":" + end
        }`,
        config
      )
      .then((res) => {
        console.log("Successfully retrieved cumulative users with date");
        dispatch({
          type: GET_CUMULATIVE_USERS_WITH_DATE,
          payload: {
            data: res.data.cumulativeUsers,
            dates: res.data.cumulativeUsersDates,
          },
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
