import { combineReducers } from 'redux';
import {
  LOAD_POSTS,
  SELECT_POST,
  ADD_POST,
  REMOVE_POST,
  EDIT_POST,
  LOAD_CATEGORIES,
  ADD_CATEGORY
} from "../actions";

function postsCtrl (state = { posts: [], selectedPost: null }, action) {

  const { id, timestamp, title, body, author, category, voteScore, deleted } = action.post ? action.post : {};

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
        posts: {
          ...state.posts,
          [id]: {
            id,
            timestamp,
            title,
            body,
            author,
            category,
            voteScore,
            deleted
          }
        }
      };
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.id)
      };
    case EDIT_POST:
      return {};
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

export default combineReducers({ postsCtrl, categoriesCtrl });