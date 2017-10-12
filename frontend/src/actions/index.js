export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const EDIT_POST = 'EDIT_POST';

export function addPost ({ title, body, author, category }) {
  return {
    type: ADD_POST,
    id: 'asd',
    timestamp: Date.now(),
    title: title,
    body: body,
    author: author,
    category: category,
    voteScore: 0,
    deleted: false
  }
}

export function removePost ({ id }) {
  return {
    type: REMOVE_POST,
    id: id
  }
}

export function editPost ({ id, title, body, author, category }) {
  return {
    type: EDIT_POST,
    id: id,
    title: title,
    body: body,
    author: author,
    category: category,
  }
}