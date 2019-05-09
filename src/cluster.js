const cluster = require("cluster");
const os = require("os");
const numOfUsersInDB = function ()  {
  this.count = this.count || 5;
  this.count = this.count * this.count;
  return this.count;
};
if (cluster.isMaster) {
  const cpus = os.cpus().length;
  console.log(`forking for ${cpus} cpus`);
  for (var i = 0; i < cpus; i++) {
    cluster.fork();
  }

  const updateWorkers = () => {
    const userCount = numOfUsersInDB();
    Object.values(cluster.workers).forEach(worker => {
      worker.send({ userCount });
    });
  };
  updateWorkers();
  setInterval(updateWorkers, 10000);
  // require('./index');
  //   Object.values(cluster.workers).forEach(worker => {
  //     worker.send(` hello worker ${worker.id}`);
  //   });
} else {
  require("./index");
}
