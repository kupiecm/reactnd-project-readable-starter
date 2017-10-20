import { combineReducers } from 'redux';
import {
  LOAD_POSTS,
  ADD_POST,
  REMOVE_POST,
  EDIT_POST,
  SELECT_POST
} from "../actions";

function postsCtrl (state = { posts: [], selectedPost: {} }, action) {

  const { id, timestamp, title, body, author, category, voteScore, deleted } = action.post ? action.post : {};

  console.log(action);
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: action.posts ? action.posts : []
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
      return delete state.posts[id];
    case EDIT_POST:
      return {};
    case SELECT_POST:
      return {
        ...state,
        selectedPost: action.post ? action.post : {}
      };
    default:
      return state;
  }
}

export default postsCtrl;
// export default combineReducers({
//   postsCtrl
// });