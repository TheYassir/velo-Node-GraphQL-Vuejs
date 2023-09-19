function getItemFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || null;
}

function setItemInLocalStorage(key, value) {
  if (typeof value !== "string") {
    value = JSON.stringify(value);
  }
  return localStorage.setItem(key, value);
}

function deleteFromLocalStorage(key) {
  return localStorage.removeItem(key);
}

function clearLocalStorage() {
  return localStorage.clear();
}

export {
  getItemFromLocalStorage,
  setItemInLocalStorage,
  clearLocalStorage,
  deleteFromLocalStorage,
};
