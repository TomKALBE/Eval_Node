const http = require('http');
const port = 5000;

const server = http.createServer((req, res) => {
  if(req.method === 'GET'){
    switch (req.url){
      case "/":
        res.write('<h1>HELLO WORLD TOM</h1>');
        break;
      default:
        res.write('<h1>ERROR 404</h1>')
    }
  }
  res.end();
});

server.listen(port);
