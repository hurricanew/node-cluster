const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  console.log(`forking for ${cpus} cpus`);
  for (var i = 0; i < cpus; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`worker ${worker.id} crashed, start new`);
      cluster.fork();
    }
  });
  // require('./index');
} else {
  require("./index");
}
