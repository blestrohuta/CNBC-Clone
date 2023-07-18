import { POSTS_FETCH_LOADING, POSTS_FETCH_SUCCESS } from "../action/actionType";

const initialState = {
  posts: [],
  loading: true,
};

export default function POSTSReducer(state = initialState, action) {
  switch (action.type) {
    case POSTS_FETCH_SUCCESS:
      return {
        ...state,
        posts: action.payload,
      };
    case POSTS_FETCH_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
