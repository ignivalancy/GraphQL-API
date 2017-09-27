export default {
  dev: {
    host: 'localhost', //"192.168.0.86",
    port: 3000,
    absolutePath: __dirname + '/..',
    debug: true,
  },
  staging: {
    host: '192.168.0.235',
    port: 3513,
    absolutePath: __dirname + '/..',
    debug: true,
  },
  live: {
    host: '192.168.0.235',
    port: 3513,
    absolutePath: __dirname + '/..',
    debug: false,
  },
};
