var express = require('express');
var app = express();
var bodyParser    = require('body-parser');
//var multer        = require('multer');
var uuid = require('node-uuid');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');
var passport = require('passport');


//var connectionString = 'mongodb://127.0.0.1:27017/cs5610fall2015exmpl1';
//
//
//if(process.env.MONGODB_URI) {
// mongodb://heroku_kxz42hd2:gv2c2utmued61jjv5fvmgtn1eh@ds113785.mlab.com:13785/heroku_kxz42hd2

 var   connectionString = process.env.MONGODB_URI;
console.log(connectionString);
//}


var db = mongoose.connect(connectionString);


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.bodyParser({ uploadDir: './public/uploads' }));
//app.use(multer());


app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.PASSPORT_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());




//var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port =  12717;
app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

// require("./public/assignment/server/app.js")(app, uuid, db, mongoose);
 require("./public/project/server/app.js")(app,uuid, db, mongoose);


app.listen(port, function(){

});














