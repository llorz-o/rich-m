export function each(arr, cb) {
  var len = arr.length;
  var i = 0;

  for (i; i < len; i++) {
    cb(arr[i], i, arr);
  }

  return arr;
}
export function filter(arr, cb) {
  var result = [];
  each(arr, (item, index, self) => {
    if (cb(item, index, self)) result.push(item);
  });
  return result;
}
export function indexOf(arr, value) {
  var _index = -1;

  each(arr, (item, index, self) => {
    if (item === value) _index = index;
  });
  return _index;
}