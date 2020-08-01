import { raf, cancelRaf } from "../utils";
var scrollLeftRafId;
export function scrollLeftTo(scroller, to, duration) {
  var count = 0,
      diff = 0;
  var from = scroller.scrollLeft,
      frames = duration === 0 ? 1 : Math.round(duration * 1000 / 16);
  diff = from;
  cancelRaf(scrollLeftRafId);

  function animate() {
    diff += (to - from) / frames;
    scroller.scrollLeft = diff;

    if (++count < frames) {
      scrollLeftRafId = raf(animate);
    } else {
      scrollLeftRafId = raf(() => scroller.scrollLeft = to);
    }
  }

  animate();
}
var scrollTopRafId;
export function scrollTopTo(scroller, to, duration) {
  var count = 0,
      diff = 0;
  var from = scroller.scrollTop,
      frames = duration === 0 ? 1 : Math.round(duration * 1000 / 16);
  diff = from;
  cancelRaf(scrollTopRafId);

  function animate() {
    diff += (to - from) / frames;
    scroller.scrollTop = diff;

    if (++count < frames) {
      scrollTopRafId = raf(animate);
    } else {
      scrollTopRafId = raf(() => scroller.scrollTop = to);
    }
  }

  animate();
}