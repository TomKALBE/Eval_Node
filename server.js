const http = require('http');
const fs = require("fs");
const path = require('path');

const port = 5000;
const regex_ = /\public\/[A-Za-z0-9]+\/[A-Za-z0-9]+[.][A-Za-z0-9]+/;
const regex_api =/\/api\/names\/[0-9]+/; 
const MEMORY_DB = new Map(); // est global
let id = 0; // doit être global
MEMORY_DB.set(id++, {nom: "Alice"}) // voici comment set une nouvelle entrée.
MEMORY_DB.set(id++, {nom: "Bob"})
MEMORY_DB.set(id++, {nom: "Charlie"})

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
      else if(req.url === '/api/names'){
        res.writeHead(200, {'Content-Type' : 'application/json'})
        res.write(JSON.stringify(Array.from(MEMORY_DB)))
      }
      else if(regex_api.test(req.url)){
        res.writeHead(200, {'Content-Type' : 'application/json'})
        let obj = JSON.stringify(MEMORY_DB.get(Number(req.url.split('/').pop()))) ?? "{}";
        res.write(obj)
      }
      else if(regex_.test(req.url)){
        res.writeHead(200,CONTENT_TYPES[req.url.split('.').pop()])
        data = fs.readFileSync(path.resolve(__dirname+ req.url));
        res.write(data);
      }else{
        returnPage(res, 404,'/public/pages/erreur404.html' );
      }
    }
    else if(req.method === "POST"){
      let data = '';
      req.on('data', chunk => {
        data += chunk;
      });
      req.on('end', () => {
        data = JSON.parse(data); // ici vous récupérez le JSON sous forme d'un objet Javascript 
        if(req.url === "/api/names"){
          MEMORY_DB.set(id++, data);
        }
        res.end(); // ici termine votre route
      });
    }
    else{
      returnPage(res, 405,'/public/pages/erreur405.html' );
    }
  }catch(e){
    console.log(e)
    returnPage(res, 500,'/public/pages/erreur500.html' );
  }
  res.end();
});

server.listen(port);
