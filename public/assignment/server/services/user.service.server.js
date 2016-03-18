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



    function findAllUsers(req, res) {

        var username = req.query.username;
        var password = req.query.password;

        if (username != null && password != null) {
            var credentials = {username: username, password: password};
            var user = userModel.findUserByCredentials(credentials);

            res.json(user);

        }
        else {
            var users = userModel.findAllUsers();

                    res.json(users);

        }
    }


    function createUser(req, res) {
        var user = req.query.user;
        console.log("create user server side:");
        console.log(user);
        var u = userModel.createUser(user);

            res.json(u);

    }

    function deleteUserById(req, res) {
        var userId = req.query.id;
       var users = userModel.deleteUserById(userId);
            res.json(users);

    }

        function updateUser(req, res) {
            var userId = req.query.userId;
            var user = req.query.user;
           var users = userModel.updateUser(userId, user);
                res.json(users);

        }



};



