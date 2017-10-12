export function getPosts () {
  return fetch(`http://localhost:3001/posts`, {
    headers: {
      'Authorization': 'let-me-in',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
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