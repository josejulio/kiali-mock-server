const talkback = require('talkback');

const config = {

    server: {

        host: process.env.KIALI_SERVER || 'https://kiali-istio-system.127.0.0.1.nip.io',
        port: 3030,
        record: talkback.Options.RecordMode.NEW, // NEW, OVERWRITE or DISABLED
        fallbackMode: talkback.Options.FallbackMode.NOT_FOUND, // PROXY or NOT_FOUND
        path: './tapes',
        // Headers to ignore when matching a recorded tape
        ignoredHeaders: [
            'accept',
            'accept-encoding',
            'accept-language',
            'cache-control',
            'connection',
            'content-length',
            'cookie',
            'host',
            'pragma',
            'referer',
            'user-agent',
            'x-auth-type-kiali-ui',
            'x-forwarded-for',
            'x-forwarded-host',
            'x-forwarded-port',
            'x-forwarded-proto'
        ],
        // Query params to ignore when matching a recorded tape
        ignoredQueryParams: [
            'queryTime'
        ]
    }

};

module.exports = config;
