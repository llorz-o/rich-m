let prev = Date.now()

function fallback(fn: FrameRequestCallback): number {
  const curr = Date.now()
  const ms = Math.max(0, 16 - (curr - prev))
  const id = Number(setTimeout(fn, ms))
  prev = curr + ms
  return id
}

const iRaf = window.requestAnimationFrame || fallback

const iCancel = window.cancelAnimationFrame || window.clearTimeout

export function raf(fn: FrameRequestCallback): number {
  return iRaf(fn)
}

export function cancelRaf(id: number): void {
  return iCancel(id)
}
