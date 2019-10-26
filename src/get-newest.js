const readFromStdinAsync = require('./read-stdin');
const getIdFromKeys = require('./id');
const lastRead = require('./last-read');

(async () => {
  const messages = JSON.parse(await readFromStdinAsync());
  const messagesWithId = messages.map(msg => ({
    id: getIdFromKeys(msg, ['name', 'title', 'date']),
    ...msg
  }));

  const lastReadId = process.argv[2];
  console.log(`Filtering with last id '${lastReadId}'`);

  const filteredMsgs = lastRead.filterSinceId(lastReadId, messagesWithId);
  console.log(filteredMsgs);
  console.log(`Got ${filteredMsgs.length} messages`);
})();
