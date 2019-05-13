var http = require("http");
const pid = process.pid;
let userCount;
//create a server object:
http
  .createServer(function(req, res) {
    for (let i = 0; i < 1e7; i++)
      // res.write(`handle by process ${pid}`); //end the response
      res.end(`handle by process ${pid} \n users ${userCount}`);
  })
  .listen(8080, () => {
    console.log(`started process ${pid}`);
  }); //the server object listens on port 8080
process.on("message", msg => {
  userCount = msg.userCount;
});

setTimeout(() => {
  process.exit(1);
}, Math.random() * 10000);
