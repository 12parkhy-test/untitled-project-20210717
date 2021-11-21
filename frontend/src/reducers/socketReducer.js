import {
  SET_CHANGE_STREAM_SOCKET,
  CHANGE_NEW_DATA,
  GET_NEW_DATA,
  RESET_NEW_DATA,
} from "../actions/types";

const initialState = {
  changeStreamSocket: null,
  newData: { post_comment: [], user: [] },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CHANGE_STREAM_SOCKET:
      return {
        ...state,
        changeStreamSocket: action.payload,
      };
    case CHANGE_NEW_DATA:
      return {
        ...state,
        newData: {
          ...state.newData,
          [action.payload.item_type]: [
            ...state.newData[action.payload.item_type],
            action.payload.item_id,
          ],
        },
      };
    case GET_NEW_DATA:
      return {
        ...state,
        newData: action.payload,
      };
    case RESET_NEW_DATA:
      return {
        ...state,
        newData: action.payload,
      };

    default:
      return state;
  }
}
