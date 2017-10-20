import { combineReducers } from 'redux';
import {
  ADD_POST,
  REMOVE_POST,
  EDIT_POST,
  SELECT_POST,
  FILTER_POSTS,
  CHANGE_ORDER
} from "../actions";

function filter (state = { compareField: 'voteScore', reverseOrder: false }, action) {

  const { type, compareField } = action;

  switch (type) {
    case FILTER_POSTS:
      return {
        ...state,
        compareField: compareField
      };
    case CHANGE_ORDER:
      return {
        ...state,
        reverseOrder: !state.reverseOrder
      };
    default:
      return state;
  }
}

function posts (state = { posts: {}, selectedPost: {} }, action) {

  console.log(action);
  const { id, timestamp, title, body, author, category, voteScore, deleted } = action.post ? action.post : {};

  switch (action.type) {
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
      return delete state.posts[id];
    case EDIT_POST:
      return {};
    case SELECT_POST:
      console.log(state);
      return {
        ...state,
        selectedPost: action.post
      };
    default:
      return state;
  }
}

export default combineReducers({
  filter,
  posts
});