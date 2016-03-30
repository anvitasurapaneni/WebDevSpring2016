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




    function findAllUsers(req, res) {

        var username = req.query.username;
        var password = req.query.password;

        if (username != null && password != null) {
            var credentials = {username: username, password: password};
            var user = userModel.findUserByCredentials(credentials).then(
                                function (doc) {
                                        req.session.currentUser = doc;
                                        res.json(doc);
                                    },
                                // send error if promise rejected
                                    function ( err ) {
                                            res.status(400).send(err);
                                        }
                            )
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
                                        req.session.currentUser = doc;
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
            var userId = req.query.id;
            var user = req.query.user;
            userModel
                .updateUser (userId, user)
                .then (
                    function (stats) {
                        res.send(200);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );

        }


    function loggedIn(req, res) {
        res.json(req.session.currentUser);
    }

    function findUserById(res, req){
        var userId = req.query.id;
        developerModel
            .findUserById (userId)
            .then (
                function (user) {
                    res.json (user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


};



