export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const EDIT_POST = 'EDIT_POST';
export const SELECT_POST = 'SELECT_POST';
export const FILTER_POSTS = 'FILTER_POSTS';
export const CHANGE_ORDER = 'CHANGE_ORDER';

export const filterPosts = ({ compareField }) => ({
  type: FILTER_POSTS,
  compareField: compareField
});

export const changeOrder = () => ({
  type: CHANGE_ORDER
});

export const addPost = ({ title, body, author, category }) => ({
  type: ADD_POST,
  post: {
    id: 'asd',
    timestamp: Date.now(),
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

export const selectPost = (post) => ({
  type: SELECT_POST,
  post: post
});