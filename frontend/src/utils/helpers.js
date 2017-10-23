export function trim (str = '') {
  return str.length > 120
    ? str.slice(0, 120) + '...'
    : str;
}

export function compareFcn (field, reverse) {
  return function (a, b) {
    return reverse ? a[field] - b[field] : b[field] - a[field];
  };
}

export function timestampToHuman (timestamp = 0) {
  let date = new Date(timestamp);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}