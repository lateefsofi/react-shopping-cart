export const addToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
}

export const getFromLocalStorage = key => {
  let data = localStorage.getItem(key);
  if (data) {
      return JSON.parse(data);
  } else {
      return data;
  }
}