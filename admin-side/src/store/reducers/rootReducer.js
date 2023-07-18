import { combineReducers } from "redux";
import categoriesReducer from "./categoriesReducer";
import postsReducer from "./postsReducer";

const rootReducer = combineReducers({
  post: postsReducer,
  category: categoriesReducer,
});

export default rootReducer;
