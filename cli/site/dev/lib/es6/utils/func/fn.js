export function debounce(fn, delay) {
  if (delay === void 0) {
    delay = 500;
  }

  var timer = null;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}