const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, resp) => {
    // build filePath
    let filePath = path.join(__dirname, req.url === '/' ? "index.html" : req.url);
    //console.log(req.url);
    console.log(filePath);
    //get extension of the file
    let extname = path.extname(filePath);
    console.log(extname);
    //console.log(filePath);
    // set initial contentType
    let contentType = "text/html";
    // check extension and set the contentType
    switch(extname) {
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
    }
    console.log(contentType);
    console.log(req.url);
    // If the request is through fetch api, create coin flip response
    if(req.url == "/api") {
        console.log("Success");
        const coinFlip = Math.random();
        const message = (coinFlip < 0.5) ? "Heads" : "Tails";
        console.log(coinFlip, message);
        const status = {'status': message};
        console.log(status);
        resp.writeHead(200, {'Content-Type': "application/json"});
        resp.end(JSON.stringify(status));    
    } else {    // If the request is any other file like index.html
        fs.readFile(filePath, (err, content) => {
            console.log(err,content);
            if(err) {
                //console.log(err);
                if(err.code == "ENOENT") {
                    fs.readFile(path.join(__dirname, "404.html"), (err, content) => {
                        resp.writeHead(200, {'Content-Type': "text/html"});
                        resp.end(content, "utf8");
                    })
                } else {
                    resp.writeHead(500);
                    resp.end(`Server error ${err}`);
                }
            } else {
                console.log(req.url);                
                resp.writeHead(200, {'Content-Type': "text/html"});
                resp.end(content, "utf8");            
            
                //console.log(resp.contentType);            
            }
        });
    }
    //resp.end();
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));