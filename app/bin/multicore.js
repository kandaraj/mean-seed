/**
 * This helps to distribute the load between multiple processes rather than sticking into a single processer.
 * This will eventually improve the performance of the service.
 */
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {

    cluster.setupMaster({
        exec: 'bin/www'
    });

    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('listening', function (worker, address) {
        console.log('<MeanBackend> Worker id: ' + worker.id + ' listening at: ' + JSON.stringify(address));
    });

    Object.keys(cluster.workers).forEach(function (id) {
        console.log('<MeanBackend> Worker id: ' + id + ' with pid: ' + cluster.workers[id].process.pid);
    });

    cluster.on('exit', function (worker, code, signal) {
        console.log('<MeanBackend> worker ' + worker.process.pid + ' died: Respawning...');
        cluster.fork();
    });
}
