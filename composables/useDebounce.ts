export const useDebounce = (func: Function, delay: number) => {
  let timerId: any = null

  return (...args: any[]) => {
    if (!timerId) {
      func(...args)
    }
    clearTimeout(timerId)

    timerId = setTimeout(() => func(...args), delay)
  }
}
