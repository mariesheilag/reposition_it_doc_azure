export const getLocalStorageItem = (key: string) => {
  try {
    return typeof window !== 'undefined' && window && window.localStorage
      ? window.localStorage.getItem(key)
      : undefined;
  } catch (_err) {
    return undefined;
  }
};
