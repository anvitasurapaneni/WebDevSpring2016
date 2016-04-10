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
        findUserByUsername: findUserByUsername
    };
    return api;

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
        var deferred = q.defer ();
        UserModel.find (
            function (err, users) {
                if (err) {
                    deferred.reject (err);

                } else {
                    deferred.resolve (users);
                }
            }
        );
        return deferred.promise;


 }

    function createUser(user){
        var deferred = q.defer();

        UserModel.create(user, function (err, doc) {

            if (err) {

                    deferred.reject(err);

            } else {
          // reject promise if error
                    deferred.resolve(doc);
                      }

                    });

        return deferred.promise;
    }




    function deleteUserById(userId){
        var deferred = q.defer();
        UserModel
            .remove (
                {_id: userId},
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
