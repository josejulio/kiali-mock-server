const chokidar = require('chokidar');
const config = require('./config');
const Server = require('./server');

// Allows to make requests to self-signed https servers
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let server = Server(config.server);
server.start();

const startWatcher = () => {
    const watcher = chokidar.watch(config.server.path, {
        persistent: false,
        alwaysStat: true
    });

    const watcherListener = (path) => {
        console.log('Restarting the server to pickup changes on file:', path);
        console.log('Saving cassettes...');
        watcher.close();
        server.stop();
        startWatcher();
        server.start();
    };

    watcher.on('change', watcherListener).on('delete', watcherListener);
};


 startWatcher();

process.on('SIGINT', function() {
    console.log('Cassettes are being saved, the server will stop once finished...');
    server.stop();
});

