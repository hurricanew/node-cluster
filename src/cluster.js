const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  console.log(`forking for ${cpus} cpus`);
  for (var i = 0; i < cpus; i++) {
    cluster.fork();
  }
  // require('./index');
  Object.values(cluster.workers).forEach(worker => {
    worker.send(` hello worker ${worker.id}`);
  });
} else {
  require("./index");
}
