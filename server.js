const http = require('http');
const port = 5000;

const server = http.createServer((req, res) => {
  res.write('HELLO WORLD TOM');
  res.end();
});

server.listen(port);
