// Variables
var path = require('path');
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);

//Configure port
var port=8080;

//App directories
var PROJECT_DIR = path.normalize(__dirname);

app.use('/',express.static(path.join(PROJECT_DIR, '')));

http.listen(port, function(){
    console.log('Sample Application runnning at http://localhost:'+port+'/UI');
});
