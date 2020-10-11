const argv = require("yargs").argv;

module.exports = {
  https: false,
  db: {
    name: "test_chat",
    url: argv.mongodburi || "mongodb://localhost:27017/test_chat",
  },
  serverOptions: {
    port: process.env.PORT,
  },
  defaultUrl: "/builder",
};
