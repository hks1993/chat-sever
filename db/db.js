var mongoose = require('mongoose');
var config = require('../config');

var dburl = config.db.url;

mongoose.connect(dburl,{useMongoClient: true});

module.exports = {
    connection : mongoose.connection
}

mongoose.Promise = require('bluebird');
// mongoose.set('debug', true);