"use strict";
var express = require("express");
var path = require("path");
var compression = require("compression");
var mongoSanitize = require("express-mongo-sanitize");
var cors = require("cors");
var helmet = require("helmet");
var bodyParser = require("body-parser");

var appDir = path.dirname(require.main.filename);
require("app-module-path").addPath(__dirname);
require("app-module-path").addPath(appDir);
// initialise app
var app = express();
app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(mongoSanitize());
app.use(compression());
app.use(
  cors({
    // origin: 'http://example.com',
    optionsSuccessStatus: 200,
    exposedHeaders: ["Saved-Image-Type"],
  })
);
app.use(helmet());
var db = require("../db/db");
//var authentication = require("./authentication").authentication;
var chatRoutes = require("./get-chat");

const isPkg = typeof process.pkg !== "undefined";
const staticFOlder = isPkg
  ? path.join(path.dirname(process.execPath), "clientbuild/")
  : __dirname + "/../client/build/";

// Initialise separate express app, for authenticated and non authenticated routes
var appWithoutAuth = express();
//var appWithAuth = express();

//authentication.loginRequired(appWithAuth);

// Test Server
// appWithAuth.get("/testauth", function (req, res) {
//   res.json({ result: "success", code: "success" });
// });
appWithoutAuth.get("/test", function (req, res) {
  res.json({ result: "success", code: "success" });
});

app.get("/testserver", function (req, res) {
  res.json({ result: "success", code: "success" });
  // res.sendFile("favicon.ico", { root: __dirname + "/../client/build/" });
});

// Register module specific routes
//chatRoutes.init(appWithAuth, appWithoutAuth, appWithAuth);

app.use("/api", appWithoutAuth);
chatRoutes.init(appWithoutAuth);
// app.use("/api", appWithAuth);

// Serve static files from client build
app.use(express.static(staticFOlder));

// Default route, serve index.html
app.get(["/*"], function (req, res, next) {
  // since this a default route, files if not found in static folder resolves to this route. So we skip these files
  if (req.url.match(/([^\\]*\.(\w+))$/)) {
    return next();
  }

  res.sendFile("index.html", { root: staticFOlder });
});

module.exports = app;
