var prev = Date.now();

function fallback(fn) {
  var curr = Date.now();
  var ms = Math.max(0, 16 - (curr - prev));
  var id = Number(setTimeout(fn, ms));
  prev = curr + ms;
  return id;
}

var iRaf = window.requestAnimationFrame || fallback;
var iCancel = window.cancelAnimationFrame || window.clearTimeout;
export function raf(fn) {
  return iRaf(fn);
}
export function cancelRaf(id) {
  return iCancel(id);
}