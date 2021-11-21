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
} from "../actions/types";

const initialState = {
  posts: [],
  mainTopSlidePosts: [],
  latestPosts: [],
  post: {},
  addPostStatus: false,
  addPostCommentStatus: false,
  deletePostCommentStatus: false,
  editPostCommentStatus: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case GET_MAIN_TOP_SLIDE_POSTS:
      return {
        ...state,
        mainTopSlidePosts: action.payload,
      };
    case GET_LATEST_POSTS:
      return {
        ...state,
        latestPosts: action.payload,
      };

    case ADD_POST:
      return {
        ...state,
        addPostStatus: true,
      };
    case END_ADD_POST_STATUS:
      return {
        ...state,
        addPostStatus: false,
      };
    case ADD_POST_COMMENT:
      return {
        ...state,
        addPostCommentStatus: true,
        post: {
          ...state.post,
          comments: [...state.post.comments, action.payload],
        },
      };
    case END_ADD_POST_COMMENT_STATUS:
      return {
        ...state,
        addPostCommentStatus: false,
      };
    case DELETE_POST_COMMENT:
      return {
        ...state,
        deletePostCommentStatus: true,
        post: {
          ...state.post,
          comments: state.post.comments.filter((comment) => {
            return comment._id != action.payload;
          }),
        },
      };
    case END_DELETE_POST_COMMENT_STATUS:
      return {
        ...state,
        deletePostCommentStatus: false,
      };
    case EDIT_POST_COMMENT:
      return {
        ...state,
        editPostCommentStatus: true,
        post: {
          ...state.post,
          comments: state.post.comments.map((comment) => {
            if (comment._id == action.payload._id) {
              return action.payload;
            } else {
              return comment;
            }
          }),
        },
      };
    case END_EDIT_POST_COMMENT_STATUS:
      return {
        ...state,
        editPostCommentStatus: false,
      };

    default:
      return state;
  }
}
