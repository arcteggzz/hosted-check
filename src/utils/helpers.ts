/* eslint-disable @typescript-eslint/no-explicit-any */

export const readFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  const parsedData = data ? JSON.parse(data) : null;
  return parsedData;
};

export const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};
