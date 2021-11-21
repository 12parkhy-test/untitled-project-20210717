import {
  GET_DAILY_NEW_USERS_WITH_DATE,
  GET_CUMULATIVE_USERS_WITH_DATE,
} from "../actions/types";

const initialState = {
  dailyNewUsersWithDate: { data: [], dates: [] },
  cumulativeUsersWithDate: { data: [], dates: [] },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DAILY_NEW_USERS_WITH_DATE:
      return {
        ...state,
        dailyNewUsersWithDate: action.payload,
      };
    case GET_CUMULATIVE_USERS_WITH_DATE:
      return {
        ...state,
        cumulativeUsersWithDate: action.payload,
      };
    default:
      return state;
  }
}
