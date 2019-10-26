const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./storage');

const LAST_READ = "lastRead";

function filterSinceId(lastReadId, items = []) {
  // Assumes the items are sorted newest first
  if (items === null || items.length === 0) {
    return items;
  }

  const idx = items.findIndex(el => el.id === lastReadId);
  return items.slice(0, idx);
}

function getLastReadId() {
  return localStorage.getItem(LAST_READ);
}

function setLastReadId(id) {
  localStorage.setItem(LAST_READ, id);
}

module.exports = {
  filterSinceId,
  getLastReadId,
  setLastReadId
};
