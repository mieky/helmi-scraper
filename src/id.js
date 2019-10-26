const crypto = require('crypto');

// https://blog.abelotech.com/posts/calculate-checksum-hash-nodejs-javascript/
function checksum(str, algorithm, encoding) {
  return crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex');
}

function getIdFromKeys(obj, keyNames) {
  const id = keyNames.reduce((acc, curr) => {
    acc += obj[curr];
    return acc;
  }, '');
  return checksum(id);
}

module.exports = getIdFromKeys;
