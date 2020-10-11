"use strict";
require("@babel/polyfill");
require("dotenv").config();
const app = require("./src");

// const app = require("@bit/moonraft.sunilpoc.server.app");
const config = require("./config");

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});

process.on("uncaughtException", function (err) {
  console.log("!!!!!!!!!!!!!!!!!!!!!! uncaughtException !!!!!!!!!!!!!!!!!!!");
  console.log(err);
});

// Create Server, based on the 'config'
var server;
if (config.https) {
  var options = {
    key: config.serverOptions.key,
    cert: config.serverOptions.cert,
    passphrase: config.serverOptions.passphrase,
  };
  server = require("spdy").createServer(options, app);
} else {
  server = require("http").Server(app);
}

// Ah, Sockets setup here
// require('./src/events/events.js').init(server);

server.on("error", (e) => console.log("Server Errored ", e));

// Now listen to port
var port = config.serverOptions.port || process.env.PORT || 3003;
server.listen(port, function (req) {
  console.log(`Server running on PORT:${port}`);
});
