type CommonArray<T> = {
  [key: number]: T
  length: number
}

type FEachFetcher = <T>(item: T, index: number, self: CommonArray<T>) => void

type FEach<T> = <T>(arr: CommonArray<T>, fetcher: FEachFetcher) => CommonArray<T>

export function each<T>(arr: CommonArray<T>, cb: (item: T, index: number, self: CommonArray<T>) => void) {
  const len: number = arr.length
  let i: number = 0
  for (i; i < len; i++) {
    cb(arr[i], i, arr)
  }
}
