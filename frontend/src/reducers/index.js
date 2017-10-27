import { combineReducers } from 'redux';
import {
  RECEIVE_POSTS,
  REQUEST_POSTS,
  SELECT_POST,
  ADD_POST,
  REMOVE_POST,
  EDIT_POST,
  LOAD_COMMENTS,
  SELECT_COMMENT,
  ADD_COMMENT,
  REMOVE_COMMENT,
  EDIT_COMMENT,
  LOAD_CATEGORIES
} from "../actions";

function posts (state = { items: [], selectedPost: null }, action) {

  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        items: action.posts ? action.posts : [],
        isFetching: false
      };
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true
      };
    case SELECT_POST:
      return {
        ...state,
        selectedPost: action.post,
        isFetching: false
      };
    case ADD_POST:
      return {
        ...state,
        selectedPost: null,
        items: [...state.items, action.post]
      };
    case REMOVE_POST:
      return {
        ...state,
        items: state.items.filter(post => post.id !== action.id),
        selectedPost: null
      };
    case EDIT_POST:
      return {
        ...state,
        selectedPost: null,
        items: state.items.map(p => {
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

/*
  comments are kept as an object with each field representing array of comments for given post
  items: {
    first_post.id: [comment1, comment2, ...],
    second_post.id: [comment1, comment2, ...]
    ...
  }
 */
function comments (state = { items: {}, selectedComment: null }, action) {
  switch (action.type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        items: {
          ...state.items,
          [action.parentId]: action.comments
        }
      };
    case SELECT_COMMENT:
      return {
        ...state,
        selectedComment: action.comment
      };
    case ADD_COMMENT:
      return {
        ...state,
        items: {
          ...state.items,
          [action.comment.parentId]: state.items[action.comment.parentId]
            ? [...state.items[action.comment.parentId], action.comment]
            : [action.comment]
        }
      };
    case EDIT_COMMENT:
      return {
        ...state,
        selectedComment: null,
        items: {
          ...state.items,
          [action.comment.parentId]: state.items[action.comment.parentId].map(c => {
            if (c.id === action.comment.id) {
              c = Object.assign({}, action.comment);
            }
            return c;
          })
        }
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        items: {
          ...state.items,
          [action.parentId]: state.items[action.parentId].filter(c => c.id !== action.id)
        }
      };
    default:
      return state;
  }
}

function categories (state = { items: [] }, action) {

  switch (action.type) {
    case LOAD_CATEGORIES:
      return {
        ...state,
        items: action.items ? action.items : []
      };
    default:
      return state;
  }
}

export default combineReducers({ posts, comments, categories });