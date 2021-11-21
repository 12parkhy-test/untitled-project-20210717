import { combineReducers } from "redux";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import downloadReducer from "./downloadReducer";
import socketReducer from "./socketReducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  download: downloadReducer,
  socket: socketReducer,
});
