//
// # Buteyko Scheduler
//
// A server for scheduling and recording Buteyko exercise results
//
var http = require('http');
var path = require('path');
var express = require('express');
var routes = require('./routes');
var winston = require('winston');
var sqlite3 = require('sqlite3');
var engine = require('ejs-locals');

var port = process.env.PORT || 3000;
var ip = process.env.IP || "localhost";
var app = express();
var server = http.createServer(app);
var db;
 
// all environments
app.configure(function() {
    app.engine('ejs', engine);
    app.set('port', port);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, '/client')));
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

//Routes
app.get('/', routes.home);
app.get('/home', routes.home);
app.get('/dag', routes.dag);
app.get('/week', routes.week);
app.get('/grafiek', routes.grafiek);
app.get('/info', routes.reinigingsinfo);
app.get('/stopwatch', routes.stopwatch);

//Setup Error handling
var logger = new winston.Logger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: '/static/logs/normal.log'
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: '/static/logs/exceptions.log',
            handleExceptions: true
        })
    ],
    exitOnError: false
});

process.on('uncaughtException', function ( err ) {
    console.error('An uncaughtException was found, the program will end.');
    logger.error(err);
    //hopefully do some logging.
    process.exit(1);
});



server.listen(port, ip, function(){
  var addr = server.address();
  console.log("Buteyko server listening at", addr.address + ":" + addr.port);
  
  db = new sqlite3.Database('db/test.s3db');
});
