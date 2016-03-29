var express = require('express');
var app = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var uuid = require('node-uuid');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');


var connectionString = 'mongodb://127.0.0.1:27017/cs5610fall2015exmpl1';



var db = mongoose.connect(connectionString);



app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.bodyParser({ uploadDir: './public/uploads' }));
app.use(multer());

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.PASSPORT_SECRET
}));

app.use(cookieParser());


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/assignment/server/app.js")(app, uuid, db, mongoose);
require("./public/project/server/app.js")(app,uuid);


app.listen(port, ipaddress);













