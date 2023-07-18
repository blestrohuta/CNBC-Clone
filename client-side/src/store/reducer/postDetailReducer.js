import {
  POSTS_DETAILS_FETCH_LOADING,
  POSTS_DETAILS_FETCH_SUCCESS,
} from "../action/actionType";

const initialState = {
  posts: [],
  post: [],
  loading: true,
};

export default function POSTSDetailReducer(state = initialState, action) {
  switch (action.type) {
    case POSTS_DETAILS_FETCH_SUCCESS:
      return {
        ...state,
        post: action.payload,
      };
    case POSTS_DETAILS_FETCH_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
