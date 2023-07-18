import { baseUrl } from "../../helper";
import {
  CATEGORIES_CREATE,
  CATEGORIES_CREATE_ERROR,
  CATEGORIES_CREATE_LOAD_STATUS,
  CATEGORIES_FETCH_ALL,
  CATEGORIES_FETCH_LOADING,
  CATEGORIES_UPDATE,
  POSTS_ADD_LOADING,
  POSTS_ADD_RESPONSE,
  POSTS_ERROR,
  POSTS_FETCH_ALL,
  POSTS_FETCH_ID,
  POSTS_FETCH_LOADING,
  POSTS_UPDATE,
} from "./actionType";

export const fetchPostsLoading = () => {
  return {
    type: POSTS_FETCH_LOADING,
    payload: false,
  };
};

export const fetchCategoriesLoading = () => {
  return {
    type: CATEGORIES_FETCH_LOADING,
    payload: false,
  };
};

export const fetchPost = () => {
  return (dispatch) => {
    dispatch({ type: POSTS_ADD_LOADING, payload: true });
    fetch(baseUrl + "users/posts", {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("something wrong");
        }
      })
      .then((data) => {
        dispatch({ type: POSTS_FETCH_ALL, payload: data });
      })
      .catch((error) => {
        dispatch({ type: POSTS_ERROR, payload: error?.message });
      })
      .finally(() => {
        const action = fetchPostsLoading();
        dispatch(action);
      });
  };
};

export const fetchDetailPost = (postId) => {
  return (dispatch) => {
    fetch(`${baseUrl}users/posts/${postId}`, {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("something wrong");
        }
      })
      .then((data) => {
        dispatch({ type: POSTS_FETCH_ID, payload: data });
      })
      .catch((error) => {
        dispatch({ type: "error" });
      });
  };
};

export const fetchCategories = () => {
  return (dispatch) => {
    fetch(baseUrl + "users/categories", {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("something wrong");
        }
      })
      .then((data) => {
        dispatch({ type: CATEGORIES_FETCH_ALL, payload: data });
      })
      .catch((error) => {
        dispatch({ type: "error" });
      })
      .finally(() => {
        const action = fetchCategoriesLoading();
        dispatch(action);
      });
  };
};

export const fetchCategory = (payload) => {
  return (dispatch) => {
    dispatch({ type: CATEGORIES_CREATE_LOAD_STATUS, payload: true });
    fetch(`${baseUrl}users/categories/${payload}`, {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("something is wrong");
        }
      })
      .then((data) => {
        dispatch({ type: CATEGORIES_CREATE, payload: data });
      })
      .catch((error) => {
        dispatch({ type: CATEGORIES_CREATE_ERROR, payload: error?.message });
      })
      .finally((_) => {
        dispatch({ type: CATEGORIES_CREATE_LOAD_STATUS, payload: false });
      });
  };
};

export const updateCategory = (payload, id) => {
  return (dispatch) => {
    dispatch({ type: CATEGORIES_CREATE_LOAD_STATUS, payload: true });
    fetch(`${baseUrl}users/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("something goes wrong");
        }
      })
      .then((data) => {
        dispatch({ type: CATEGORIES_UPDATE, payload: data });
      })
      .catch((error) => {
        dispatch({ type: CATEGORIES_CREATE_ERROR, payload: error?.message });
      })
      .finally((_) => {
        dispatch({ type: CATEGORIES_CREATE_LOAD_STATUS, payload: false });
      });
  };
};

export const addCategory = (payload) => {
  return (dispatch) => {
    dispatch({ type: CATEGORIES_CREATE_LOAD_STATUS, payload: true });
    fetch(baseUrl + "users/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("something is wrong");
        }
      })
      .then((data) => {
        dispatch({ type: CATEGORIES_CREATE, payload: data });
      })
      .catch((error) => {
        dispatch({ type: CATEGORIES_CREATE_ERROR, payload: error?.message });
      })
      .finally(() => {
        dispatch({ type: CATEGORIES_CREATE_LOAD_STATUS, payload: false });
      });
  };
};

export const addPost = (payload) => {
  return (dispatch) => {
    dispatch({ type: POSTS_ADD_LOADING, payload: true });
    fetch(baseUrl + "users/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("something wrong");
        }
      })
      .then((data) => {
        dispatch({ type: POSTS_ADD_RESPONSE, payload: data });
      })
      .catch((error) => {
        dispatch({ type: POSTS_ERROR, payload: error?.message });
      })
      .finally(() => {
        dispatch({ type: POSTS_ADD_LOADING, payload: false });
      });
  };
};

export const updatePost = (payload, id) => {
  return (dispatch) => {
    dispatch({ type: POSTS_ADD_LOADING, payload: true });
    fetch(`${baseUrl}users/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("something wrong");
        }
      })
      .then((data) => {
        dispatch({ type: POSTS_UPDATE, payload: data });
      })
      .catch((error) => {
        dispatch({ type: POSTS_ERROR, payload: error?.message });
      })
      .finally(() => {
        dispatch({ type: POSTS_ADD_LOADING, payload: false });
      });
  };
};
