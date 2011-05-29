var express = require('lokki');
express.initApp("nodester");

var config = require("./config/config");
config.setConfig(express);