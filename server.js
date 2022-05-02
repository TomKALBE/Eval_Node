const http = require('http');
const port = 5000;

const server = http.createServer((req, res) => {
  try{
    if(req.method === 'GET'){
      switch (req.url){
        case "/":
          res.write('<h1>HELLO WORLD TOM</h1>');
          break;
        default:
          res.write('<h1>ERROR 404 PAGE NOT FOUND</h1>');
      }
    }else{
      res.write('<h1>ERROR 405 METHOD NOT ALLOWED</h1>');
    }
  }catch(e){
    res.write(`<h1>ERROR 500 INTERAL SERVER ERROR ${e}</h1>`);
  }
  res.end();

  
});

server.listen(port);
