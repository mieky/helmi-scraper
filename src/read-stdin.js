async function readFromStdinAsync() {
  const stdin = process.stdin;
  const inputChunks = [];

  stdin.resume();
  stdin.setEncoding('utf8');

  stdin.on('data', chunk =>
    inputChunks.push(chunk))

  return new Promise((resolve, reject) => {
    stdin.on('end', () => {
      const input = inputChunks.join("");
      resolve(input);
    });
  })
}

module.exports = readFromStdinAsync;
