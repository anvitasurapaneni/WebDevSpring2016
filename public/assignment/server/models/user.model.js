/**
 * Created by anvitasurapaneni on 3/16/16.
 */

var q = require("q");


module.exports = function(db, mongoose){

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('User', UserSchema);
    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        register: register
    };
    return api;

    function createUser(user) {
        return UserModel.create(user);
    }


    function findUserById(userId) {
                console.log(userId);
                        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
                                    if (err) {
                                            deferred.reject(err);
                                        } else {
                                            deferred.resolve(doc);
                        }

                        });
        return deferred.promise;
}


    function findUserByCredentials(credentials) {

        var deferred = q.defer();
        console.log("credentials");
        console.log(credentials);

        // find one retrieves one document
        UserModel.findOne(

            // first argument is predicate
            { username: credentials.username,
                password: credentials.password },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }


    function findUserByUsername(username) {
        console.log(username);

        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne(

            // first argument is predicate
            { username: username },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }


    function findAllUsers(){
        return UserModel.find();


 }

    function register(user){
        return UserModel.create(user);
    }




    function deleteUserById(userId){
        console.log("user ID");
        console.log(userId);
        var deferred = q.defer();
        UserModel
            .remove (
                {_id: userId},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        console.log("error in deleting");
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }



    function updateUser(userId, user){
        var deferred = q.defer();
        UserModel
            .update (
                {_id: userId},
                {$set: user},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

}
