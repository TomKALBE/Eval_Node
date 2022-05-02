const http = require('http');
const fs = require("fs");
const path = require('path');
const port = 5000;

const returnPage = (res, code, file) => {
  res.writeHead(code, {
    'Content-Type': 'text/html'
  });
  const data = fs.readFileSync(__dirname+file, {
    'Content-Type': 'text/html'
  });
  res.write(data)
}
const server = http.createServer((req, res) => {
  let data =""
  try{
    if(req.method === 'GET'){
      switch (req.url){
        case "/":
          returnPage(res, 200,'/public/pages/index.html' );       
          break;
        case "/public/images/image.jpg":
          res.writeHead(200,{'Content-Type': 'image/jpeg'})
          data = fs.readFileSync(path.resolve(__dirname+'/public/images/image.jpg'));
          res.write(data);
          break;
        case "/public/css/style.css":
          res.writeHead(200,{'Content-Type': 'text/css'})
          data = fs.readFileSync(path.resolve(__dirname+'/public/css/style.css'));
          res.write(data);
          break;
        default:
          console.log(req.url)
          returnPage(res, 404,'/public/pages/erreur404.html' );
      }
    }else{
      returnPage(res, 405,'/public/pages/erreur405.html' );
    }
  }catch(e){
    returnPage(res, 500,'/public/pages/erreur500.html' );
  }
  res.end();
});

server.listen(port);
