import { combineReducers } from "redux";
import postReducer from "./postReducer";
import postDetailReducer from "./postDetailReducer";

const rootReducer = combineReducers({
  news: postReducer,
  newsDetail: postDetailReducer,
});

export default rootReducer;
