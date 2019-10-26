const readFromStdinAsync = require('./read-stdin');
const getIdFromKeys = require('./id');

(async () => {
  const messages = JSON.parse(await readFromStdinAsync());
  const messagesWithId = messages.map(msg => ({
    id: getIdFromKeys(msg, ['name', 'title', 'date']),
    ...msg
  }));

  console.log(messagesWithId);
})();
