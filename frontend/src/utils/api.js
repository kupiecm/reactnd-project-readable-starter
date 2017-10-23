export function getPosts () {
  return fetch(`http://localhost:3001/posts`, {
    headers: {
      'Authorization': 'let-me-in',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(res => res.json());
}

export function getPost (id) {
  return fetch(`http://localhost:3001/posts/${id}`, {
    headers: {
      'Authorization': 'let-me-in',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(res => res.json());
}

export function getComments (id) {
  return fetch(`http://localhost:3001/posts/${id}/comments`, {
    headers: {
      'Authorization': 'let-me-in',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(res => res.json());
}

export function voteOnComment (id, option) {
  return fetch(`http://localhost:3001/comments/${id}`, {
    headers: {
      'Authorization': 'let-me-in',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ option })
  })
    .then(res => res.json());
}

export function getCategories () {
  return fetch(`http://localhost:3001/categories`, {
    headers: {
      'Authorization': 'let-me-in',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(res => res.json())
    .then(res => res.categories);
}