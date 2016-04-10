var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel) {

    console.log("is it going to server services");
    //   app.get("/api/assignment/user?username=alice&password=alice", findAllUsers1);
    var auth = authorized;
    app.post  ('/api/assignment/login', passport.authenticate('local'), login);
    app.get("/api/assignment/user",auth, findAllUsers);
    app.post("/api/assignment/user", createUser);
    app.delete("/api/assignment/user/:id",auth, deleteUserById);
    app.put("/api/assignment/user/:id",auth, updateUser);
    app.get("/api/assignment/users/loggedin", loggedIn);
    app.get("/api/assignment/user/:id", findUserById);
    app.post("/api/assignment/user/logout", logout);
    app.post("/api/assignment/register", register);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    /* local strategy , serialize , deserialize */
    function localStrategy(username, password, done) {
        // lookup developer by username only. cant compare password since it's encrypted
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    // if the user exists, compare passwords with bcrypt.compareSync
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        console.log("not able to becrypt");
                        return done(null, false);

                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }




    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }






    function findAllUsers(req, res) {

        var username = req.query.username;
        var password = req.query.password;

        if (username != null && password != null) {
            var credentials = {username: username, password: password};
            findUserByCredentials(credentials, req, res);}
        else if(username != null && password == null){
                findUserByUsername(username,req, res);
            }
            else{
                if(isAdmin(req.user)){
                    var users=[];
                    var user = userModel.findAllUsers()
                        .then(
                            function(doc){
                                for(var i in doc){
                                    if(doc[i].roles.indexOf("admin") == -1){
                                        users.push(doc[i]);
                                    }
                                }

                                res.json(users);
                            },
                            function(err){
                                res.status(400).send(err);
                            }
                        );
                }
            }
    }


    function register(req, res){
        var user1 = req.body;
        user1.roles= ['student'];
        console.log("user1");
        console.log(user1);

        userModel
            .findUserByUsername(user1.username)
            .then(
                function(user){
                  //  console.log(user);
                    if(user) {
                        res.json(null);
                    } else {
                        // encrypt the password when registering
                        user1.password = bcrypt.hashSync(user1.password);
                        return userModel.register(user1);
                    }
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }


    function createUser(req, res) {
        var newUser = req.body;
        console.log(newUser);
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        UserModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return UserModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return UserModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return UserModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }



    /*  {
          var user = req.body;
          console.log("create user server side:");
          console.log(user);
          var createdUser = userModel.createUser(user).then(
              // login user if promise resolved
              function ( doc ) {
                  console.log(doc);
                  req.session.user = doc;
                  res.json(createdUser);
              },
              // send error if promise rejected */






    function deleteUserById(req, res) {
        var userId = req.query.id;
        console.log("user id to be deleted"+userId);


        userModel
            .deleteUserById (userId)
            .then (
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

        /*   var users = userModel.deleteUserById(userId);
         res.json(users); */

    }

    function updateUser(req, res) {

        var userId = req.params.id;
        var user = req.body;
        userModel
            .updateUser (userId, user)
            .then(
                function(doc){
                    res.json(doc);
                },

                function(err){
                    res.status(400).send(err);
                }
            );

    }


    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }



    function findUserById(req, res){

        var userId = req.params.id;


        console.log("USER ID"+userId);
        var user=
            userModel
                .findUserById (userId)
                .then (
                    function (doc) {
                        res.json (doc);
                        req.session.user = doc;
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
    }


    function logout(req, res) {
        req.logOut();
        res.send(200);
    }


    function login(req, res) {
        var user = req.user;
        res.json(user);
    }


    function isAdmin(user) {
        if(user.roles.indexOf("admin") > 0) {
            return true
        }
        return false;
    }




    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }}


};
