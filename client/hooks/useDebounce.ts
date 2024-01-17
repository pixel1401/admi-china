
export function useDebounce(func : (...arg : any) => any, timeout : number) {
    let timeoutId : any ; 
    return (...args : any) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, timeout);
    };
  }
  