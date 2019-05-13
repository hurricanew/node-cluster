var http = require("http");
const pid = process.pid;

//create a server object:
http
  .createServer(function(req, res) {
    for (let i = 0; i < 1e7; i++) res.end(`handle by process ${pid}`); //end the response
  })
  .listen(8080, () => {
    console.log(`started process ${pid}`);
  }); //the server object listens on port 8080
//random crush
setTimeout(() => {
  process.exit(1);
}, Math.random() * 10000);
