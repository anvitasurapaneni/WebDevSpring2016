/**
 * Created by anvitasurapaneni on 3/16/16.
 */

module.exports = function(app, userModel) {

    console.log("is it going to server services");
 //   app.get("/api/assignment/user?username=alice&password=alice", findAllUsers1);
    app.get("/api/assignment/user", findAllUsers);
    app.post("/api/assignment/user", createUser);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.get("/api/assignment/users/loggedin", loggedIn);
    app.get("/api/assignment/user/:id", findUserById);
    app.post("/api/assignment/user/logout", logout);




    function findAllUsers(req, res) {

        var username = req.query.username;
        var password = req.query.password;

        if (username != null && password != null) {
            var credentials = {username: username, password: password};
             userModel.findUserByCredentials(credentials).then(
                                function (doc) {
                                        req.session.user = doc;
                                        res.json(doc);
                                    },
                                // send error if promise rejected
                                    function ( err ) {
                                            res.status(400).send(err);
                                        }
                            );
        }
        if(username != null){
            userModel.findUserByUsername(username).then(
                function (doc) {
                    req.session.user = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );

        }
        else {
            userModel
                .findAllUsers ()
                .then (
                    function (users) {
                        res.json (users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
    }


    function createUser(req, res) {
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
                            // send error if promise rejected
                                function ( err ) {
                                        res.status(400).send(err);
                                    }
                        );



    }

    function deleteUserById(req, res) {
        var userId = req.query.id;


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
        res.json(req.session.user);
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
        req.session.destroy();
        res.status(200).send(null);
    }


};



