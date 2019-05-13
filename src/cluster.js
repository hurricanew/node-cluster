const cluster = require("cluster");
const os = require("os");

let count = 5;

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  console.log(`forking for  ${cpus} cpus`);
  for (var i = 0; i < cpus; i++) {
    cluster.fork();
  }

  const updateWorkers = () => {
    count = count * 5;
    Object.values(cluster.workers).forEach(worker => {
      worker.send({ userCount: count });
    });
  };
  updateWorkers();
  setInterval(updateWorkers, 10000);
  // require('./index');
  //   Object.values(cluster.workers).forEach(worker => {
  //     worker.send(` hello worker ${worker.id}`);
  //   });
  cluster.on("exit", (worker, code) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`worker ${worker.id} crashed, start new`);
      cluster.fork();
    }
  });
} else {
  require("./index");
}
