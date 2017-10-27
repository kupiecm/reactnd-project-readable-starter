import * as API from '../utils/api';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
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

export const requestPosts = () => ({
  type: REQUEST_POSTS
});

export const fetchPosts = () => dispatch => {

  return API.getPosts()
    .then(posts => {
      dispatch({
        type: RECEIVE_POSTS,
        posts: posts
      });
      posts.map(post => {
        return API.getComments(post.id)
          .then(comments => {
            dispatch({
              type: LOAD_COMMENTS,
              parentId: post.id,
              comments: comments
            })
          });
      });
    });
};

export const selectPost = post => ({
  type: SELECT_POST,
  post: post
});

export const fetchPost = id => dispatch => {
  dispatch(requestPosts());
  return API
    .getPost(id)
    .then(
      post => dispatch(selectPost(post)),
      err => dispatch(selectPost(null))
    );
};

export const addPost = item => dispatch => {
  return API.addPost(item)
    .then(post => dispatch({
      type: ADD_POST,
      post: post
    }));
};

export const editPost = item => dispatch => {
  return API.editPost(item)
    .then(post => dispatch({
      type: EDIT_POST,
      post: post
    }));
};

export const removePost = id => dispatch => {
  return API.removePost(id)
    .then(dispatch({
      type: REMOVE_POST,
      id: id
    }))
};

export const fetchComments = (parentId) => dispatch => {
  return API.getComments(parentId)
    .then(comments => dispatch({
      type: LOAD_COMMENTS,
      parentId: parentId,
      comments: comments
    }));
};

export const selectComment = (c) => ({
  type: SELECT_COMMENT,
  comment: c
});

export const addComment = comment => dispatch => {
  return API.addComment(comment)
    .then(comment => dispatch({
      type: ADD_COMMENT,
      comment: comment
    }));
};

export const removeComment = (id) => dispatch => {
  return API.removeComment(id)
    .then(comment => dispatch({
      type: REMOVE_COMMENT,
      id: comment.id,
      parentId: comment.parentId
    }));
};

export const editComment = (comment) => dispatch => {
  return API.editComment(comment)
    .then(comment => dispatch({
      type: EDIT_COMMENT,
      comment: comment
    }));
};

export const fetchCategories = () => dispatch => {
  return API.getCategories()
    .then(categories => {
      categories = [{ name: 'all', path: 'all' }, ...categories];
      dispatch({
        type: LOAD_CATEGORIES,
        items: categories
      })
    })
};

export const vote = (item, option, type) => dispatch => {
  return API.vote(item.id, option, type)
    .then(item => {
      if (type === 'posts')
        dispatch(editPost(item));
      if (type === 'comments')
        dispatch(editComment(item));
    });
};