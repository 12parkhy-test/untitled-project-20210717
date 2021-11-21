import axios from "axios";

import {
  ADD_POST,
  END_ADD_POST_STATUS,
  GET_POSTS,
  GET_MAIN_TOP_SLIDE_POSTS,
  GET_LATEST_POSTS,
  GET_POST,
  ADD_POST_COMMENT,
  END_ADD_POST_COMMENT_STATUS,
  DELETE_POST_COMMENT,
  END_DELETE_POST_COMMENT_STATUS,
  EDIT_POST_COMMENT,
  END_EDIT_POST_COMMENT_STATUS,
} from "./types";

export const endAddPostStatus = () => {
  return {
    type: END_ADD_POST_STATUS,
  };
};

export const endAddPostCommentStatus = () => {
  return {
    type: END_ADD_POST_COMMENT_STATUS,
  };
};

export const endDeletePostCommentStatus = () => {
  return {
    type: END_DELETE_POST_COMMENT_STATUS,
  };
};

export const endEditPostCommentStatus = () => {
  return {
    type: END_EDIT_POST_COMMENT_STATUS,
  };
};

export const getPost = (id) => async (dispatch, getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {},
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios
    .get(`/api/posts/${id}`, config)
    .then((res) => {
      console.log("Successfully retrieved a post");
      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const getPosts = () => async (dispatch, getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {},
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios
    .get("/api/posts", config)
    .then((res) => {
      console.log("Successfully retrieved posts");
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const getMainTopSlidePosts = () => async (dispatch, getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {},
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios
    .get("/api/postfunctions1/maintopslideposts", config)
    .then((res) => {
      console.log("Successfully retrieved main top slide posts");
      dispatch({
        type: GET_MAIN_TOP_SLIDE_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const getLatestPosts = () => async (dispatch, getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {},
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios
    .get("/api/postfunctions1/latestposts", config)
    .then((res) => {
      console.log("Successfully retrieved latest posts");
      dispatch({
        type: GET_LATEST_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const addPost = (post) => async (dispatch, getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {},
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  const body = { ...post };
  axios
    .post("/api/admin/posts", body, config)
    .then((res) => {
      console.log("Successfully added a post");
      dispatch({
        type: ADD_POST,
        //   payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const addPostComment = (data) => async (dispatch, getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {},
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  const body = { content: data.content };
  axios
    .post(
      `/api/postfunctions1/addpostcomment/posts/${data.postId}/comments`,
      body,
      config
    )
    .then((res) => {
      console.log("Successfully added a post comment");
      dispatch({
        type: ADD_POST_COMMENT,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const deletePostComment = (data) => async (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {},
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios
    .delete(
      `/api/postfunctions1/deletepostcomment/posts/${data.postId}/comments/${data.commentId}`,
      config
    )
    .then((res) => {
      console.log("Successfully deleted a post comment");
      dispatch({
        type: DELETE_POST_COMMENT,
        payload: data.commentId,
      });
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const editPostComment = (data) => async (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {},
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  const body = { content: data.content };
  axios
    .put(
      `/api/postfunctions1/editpostcomment/posts/${data.postId}/comments/${data.commentId}`,
      body,
      config
    )
    .then((res) => {
      console.log("Successfully edited a post comment");
      dispatch({
        type: EDIT_POST_COMMENT,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err", err);
    });
};
