import uuid from 'uuid';

export const LOAD_POSTS = 'LOAD_POSTS';
export const SELECT_POST = 'SELECT_POST';
export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const EDIT_POST = 'EDIT_POST';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const ADD_CATEGORY = 'ADD_CATEGORY';

export const loadPosts = (posts) => ({
  type: LOAD_POSTS,
  posts: posts
});

export const selectPost = (post) => ({
  type: SELECT_POST,
  post: post
});

export const addPost = ({ title, body, author, category }) => ({
  type: ADD_POST,
  post: {
    id: uuid.v4(),
    timestamp: (new Date).getTime(),
    title: title,
    body: body,
    author: author,
    category: category,
    voteScore: 0,
    deleted: false
  }
});

export const removePost = ({ id }) => ({
  type: REMOVE_POST,
  id: id
});

export const editPost = ({ id, title, body, author, category }) => ({
  type: EDIT_POST,
  post: {
    id: id,
    title: title,
    body: body,
    author: author,
    category: category,
  }
});

export const loadCategories = (cat) => ({
  type: LOAD_CATEGORIES,
  categories: cat
});