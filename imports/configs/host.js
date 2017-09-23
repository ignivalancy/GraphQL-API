export default {

    dev: {
        host: "127.0.0.1", //"192.168.0.86",
        port: 3000,
        absolutePath: __dirname + "/..",
        debug: true
    },
    staging: {
        host: "",
        port: 3000,
        absolutePath: __dirname + "/..",
        debug: true
    },
    live: {
        host: "",
        port: 3000,
        absolutePath: __dirname + "/..",
        debug: false
    }

};