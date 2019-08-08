const talkback = require('talkback');

const tapeNameGenerator = (number, tape) => {
    const splitUrl = tape.req.url.split('/');
    const lastElement = splitUrl.pop();
    return `${splitUrl.join('/')}/${tape.req.method}-${lastElement}`;
};


const removeAcceptEncodingDecorator = (req) => {
    // Prevents gzipped contents in our tapes
    delete req.headers['accept-encoding'];
    return req;
};

const Server = (opts) => {
    let server;
    const options = {
        requestDecorator: removeAcceptEncodingDecorator,
        tapeNameGenerator: tapeNameGenerator,
        summary: false,
        silent: false,
        ...opts
    };

    const instance = {
        start: (callback) => {
            if (server) {
                instance.stop();
            }
            server = talkback(options);
            server.start(callback);
        },
        stop: () => {
            if (server) {
                server.close();
            }
            server = undefined;
        },
        restart: () => {
            instance.stop();
            instance.start();
        }
    };

    return instance;
};

module.exports = Server;