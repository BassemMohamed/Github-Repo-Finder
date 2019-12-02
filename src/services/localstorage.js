const STORAGE_KEY = "GITHUB_FINDER";

const saveRepo = repo => {
  const storage = getStorage();
  if (!storage.find(item => item.id === repo.id)) storage.push(repo);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  return getStorage();
};

const removeRepo = repo => {
  let storage = getStorage();
  storage = storage.filter(item => item.id !== repo.id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  return getStorage();
};

const getStorage = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export default {
  saveRepo,
  removeRepo,
  getStorage
};
