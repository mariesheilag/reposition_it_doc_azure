export const setLocalStorageItem = (key: string, value: any) => {
  try {
    return typeof window !== 'undefined' && window && window.localStorage
      ? window.localStorage.setItem(key, value)
      : undefined;
  } catch (_err) {
    return undefined;
  }
};
