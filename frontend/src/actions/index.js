import uuid from 'uuid';

export const LOAD_POSTS = 'LOAD_POSTS';
export const SELECT_POST = 'SELECT_POST';
export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const EDIT_POST = 'EDIT_POST';

export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const SELECT_COMMENT = 'SELECT_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';

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

export const addPost = (post) => ({
  type: ADD_POST,
  post: post
});

export const removePost = ({ id }) => ({
  type: REMOVE_POST,
  id: id
});

export const editPost = (post) => ({
  type: EDIT_POST,
  post: post
});

export const loadComments = (c) => ({
  type: LOAD_COMMENTS,
  comments: c
});

export const selectComment = (c) => ({
  type: SELECT_COMMENT,
  comment: c
});

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment: comment
});

export const removeComment = ({ id }) => ({
  type: REMOVE_COMMENT,
  id: id
});

export const editComment = (comment) => ({
  type: EDIT_COMMENT,
  comment: comment
});

export const loadCategories = (cat) => ({
  type: LOAD_CATEGORIES,
  categories: cat
});

export const vote = (item, type) => {

  switch (type) {
    case 'posts':
      return editPost(item);
    case 'comments':
      return editComment(item);
  }
};