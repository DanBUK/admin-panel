var express = require('express'),
    app = express.createServer(),
    lokki = require('lokki');

lokki.initApp("nodester_admin", express, app);

var config = require("./config/config");
config.setConfig(express, app);