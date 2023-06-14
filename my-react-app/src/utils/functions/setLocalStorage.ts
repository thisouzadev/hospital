export const setLocalStorage = (key: string, data: any): void => {
  localStorage.setItem(key, JSON.stringify(data));
};