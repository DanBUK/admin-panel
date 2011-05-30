var express = require('express'),
    app = express.createServer(),
    lokki = require('lokki');

var config = require("./config/config");
config.setConfig(express, app);
    
lokki.initApp("nodester_admin", express, app);