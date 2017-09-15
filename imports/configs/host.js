export default {

    dev: {
        name: "GraphQL",
        host: "", //"192.168.0.86",
        port: 3000,
        absolutePath: __dirname + "/..",
        debug: true
    },
    staging: {
        name: "GraphQL",
        host: "",
        port: 3000,
        absolutePath: __dirname + "/..",
        debug: true
    },
    live: {
        name: "GraphQL",
        host: "",
        port: 3000,
        absolutePath: __dirname + "/..",
        debug: false
    }

};