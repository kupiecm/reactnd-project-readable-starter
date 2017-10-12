import {
  ADD_POST,
  REMOVE_POST,
  EDIT_POST
} from "../actions";

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

export default post;