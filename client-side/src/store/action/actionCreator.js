import { baseUrl } from "../../helper/";
import {
  POSTS_DETAILS_FETCH_LOADING,
  POSTS_DETAILS_FETCH_SUCCESS,
  POSTS_FETCH_LOADING,
  POSTS_FETCH_SUCCESS,
} from "./actionType";

export const fetchAllPOSTS = (payload) => ({
  type: POSTS_FETCH_SUCCESS,
  payload,
});

export const fetchPOSTSLoading = () => ({
  type: POSTS_FETCH_LOADING,
  payload: false,
});

export const fetchDetailPOSTSbyId = (payload) => ({
  type: POSTS_DETAILS_FETCH_SUCCESS,
  payload,
});

export const fetchPOSTSDetailLoading = () => ({
  type: POSTS_DETAILS_FETCH_LOADING,
  payload: false,
});

export const fetchPosts = () => async (dispatch) => {
  dispatch(fetchPOSTSLoading());

  try {
    const response = await fetch(baseUrl + "posts");
    const data = await response.json();
    dispatch(fetchAllPOSTS(data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchDetailPost = (postId) => async (dispatch) => {
  dispatch(fetchPOSTSDetailLoading());

  try {
    const response = await fetch(baseUrl + `posts/${postId}`);
    const data = await response.json();
    dispatch(fetchDetailPOSTSbyId(data));
  } catch (error) {
    console.log(error);
  }
};
