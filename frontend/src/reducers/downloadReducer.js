import { GET_FILE_TO_DOWNLOAD } from "../actions/types";

const initialState = {
  fileToDownload: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FILE_TO_DOWNLOAD:
      return {
        ...state,
        fileToDownload: action.payload,
      };
    default:
      return state;
  }
}
