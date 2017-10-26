import { combineReducers } from 'redux';
import {
  LOAD_POSTS,
  SELECT_POST,
  ADD_POST,
  REMOVE_POST,
  EDIT_POST,
  LOAD_COMMENTS,
  SELECT_COMMENT,
  ADD_COMMENT,
  REMOVE_COMMENT,
  EDIT_COMMENT,
  LOAD_CATEGORIES,
  ADD_CATEGORY
} from "../actions";

function postsCtrl (state = { posts: [], selectedPost: null }, action) {

  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: action.posts ? action.posts : []
      };
    case SELECT_POST:
      return {
        ...state,
        selectedPost: action.post
      };
    case ADD_POST:
      return {
        ...state,
        selectedPost: null,
        posts: [...state.posts, action.post]
      };
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.id)
      };
    case EDIT_POST:
      console.log(action.post);
      return {
        ...state,
        selectedPost: action.post,
        posts: state.posts.map(p => {
          if (p.id === action.post.id) {
            p = Object.assign({}, action.post);
          }
          return p;
        })
      };
    default:
      return state;
  }
}

function commentsCtrl (state = {comments: [], selectedComment: null}, action) {
  switch (action.type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        comments: action.comments ? action.comments : []
      };
    case SELECT_COMMENT:
      return {
        ...state,
        selectedComment: action.comment
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.comment]
      };
    case EDIT_COMMENT:
      return {
        ...state,
        selectedComment: null,
        comments: state.comments.map(c => {
          if (c.id === action.comment.id) {
            c = Object.assign({}, action.comment);
          }
          return c;
        })
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(c => c.id !== action.id)
      };
    default:
      return state;
  }
}

function categoriesCtrl (state = { categories: [] }, action) {

  switch (action.type) {
    case LOAD_CATEGORIES:
      return {
        ...state,
        categories: action.categories ? action.categories : []
      };
    case ADD_CATEGORY:
      return {};
    default:
      return state;
  }
}

export default combineReducers({ postsCtrl, commentsCtrl, categoriesCtrl });