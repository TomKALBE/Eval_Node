const http = require('http');
const fs = require("fs");
const path = require('path');
const { match } = require('assert');
const port = 5000;
const regex_ = /\public\/[A-Za-z0-9]+\/[A-Za-z0-9]+[.][A-Za-z0-9]+/;
const returnPage = (res, code, file) => {
  res.writeHead(code, {
    'Content-Type': 'text/html'
  });
  const data = fs.readFileSync(__dirname+file, {
    'Content-Type': 'text/html'
  });
  res.write(data)
}
const image_type = {
  'Content-Type': 'image/jpeg'
}
const javascript_type = {
  'Content-Type': 'text/javascript'
}
const css_type = {
  'Content-Type': 'text/css'
}
const CONTENT_TYPES = {
  'jpg': image_type,
  'jpeg': image_type,
  'png': image_type,
  'javascript':javascript_type,
  'css':css_type
}
const server = http.createServer((req, res) => {
  let data =""
  try{
    if(req.method === 'GET'){
      if (req.url === "/"){
          returnPage(res, 200,'/public/pages/index.html' );       
      }
      else if(regex_.test(req.url)){
        res.writeHead(200,CONTENT_TYPES[req.url.split('.').pop()])
        data = fs.readFileSync(path.resolve(__dirname+ req.url));
        res.write(data);
      }else{
        returnPage(res, 404,'/public/pages/erreur404.html' );
      }
    }else{
      returnPage(res, 405,'/public/pages/erreur405.html' );
    }
  }catch(e){
    console.log(e)
    returnPage(res, 500,'/public/pages/erreur500.html' );
  }
  res.end();
});

server.listen(port);
