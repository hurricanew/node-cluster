const cluster = require("cluster");
const os = require("os");

if(cluster.isMaster){
    const cpus = os.cpus().length;
    console.log(`forking for ${cpus} cpus`);
    for(var i=0;i<cpus;i++){
        cluster.fork();
    }
    // require('./index');
}else{
    require('./index');
}