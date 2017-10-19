import { combineReducers } from 'redux';
import {
  ADD_POST,
  REMOVE_POST,
  EDIT_POST,
  FILTER_POSTS,
  CHANGE_ORDER
} from "../actions";

function filter (state = { compareField: 'voteScore', reverseOrder: false }, action) {

  const { type, compareField } = action;

  switch (type) {
    case FILTER_POSTS:
      console.log('filtering posts');
      return {
        ...state,
        compareField: compareField
      };
    case CHANGE_ORDER:
      console.log('reversing order');
      return {
        ...state,
        reverseOrder: !state.reverseOrder
      };
    default:
      return state;
  }
}

function post (state = {}, action) {

  const { id, timestamp, title, body, author, category, voteScore, deleted } = action;

  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
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
      };
    case REMOVE_POST:
      return delete state[id];
    case EDIT_POST:
      return {};
    default:
      return state;
  }
}

export default combineReducers({
  filter,
  post
});