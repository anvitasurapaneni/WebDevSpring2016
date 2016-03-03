/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    var initialUsers =
        [
            {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]                },

            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]                },

            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]                },

            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},

            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]                }
        ];



    function UserService($http) {


        var api = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return api;


// findUserByUsernameAndPassword
        function findUserByUsernameAndPassword(username, password, callback) {

            var valied = false;
            var index;
            var valiedUser = {};
            console.log(username);

            for (var i = 0; i < initialUsers.length; ++i) {
                if ((initialUsers[i].username == username) && (initialUsers[i].password == password)) {
                    console.log("inside loop:" + initialUsers[i].username);
                    console.log("inside loop:" + initialUsers[i]._id);
                    valied = true;
                    index = i;
                    valiedUser = {
                        "_id": initialUsers[i]._id,
                        "firstName": initialUsers[i].firstName,
                        "lastName": initialUsers[i].lastName,
                        "username": initialUsers[i].username,
                        "password": initialUsers[i].password,
                        "email": initialUsers[i].email
                    }
                }

            }
                callback(valiedUser);

        }

// findAllUsers
            function findAllUsers(callback) {
                callback(initialUsers);
            }

// createUser
            function createUser(user, callback) {
                var newuser = {}
                var newID = (new Date).getTime();

                newuser = {
                    "_id": newID,
                    "username": user.username,
                    "password": user.password,
                    "email": user.email
                }
                initialUsers.push(newuser);
                console.log("initial users");
                console.log(initialUsers);
                callback(newuser);

            }

// deleteUserById
            function deleteUserById(userId, callback) {
                var index = null;
                for (var user in initialUsers) {
                    if (user._id == userId) {
                        index = initialUsers.getItemIndex(user);
                    }
                }
                initialUsers.splice(index);
                callback(initialUsers);
            }

// updateUser
            function updateUser(userId, user, callback) {
                var index = 0;
                var flag = 0;
                var newuser = {};
                for (var i = 0; i < initialUsers.length; i++) {

                    if (initialUsers[i]._id == userId) {
                        index = i;
                        var flag = 1;
                        break;
                    }
                }
                console.log("update user function index" + index);
                console.log("update user function useer ID:" + userId);
                console.log("update user function useer :" + user);
                if (flag == 1) {

                    newuser = {
                        "_id": userId, "firstName": user.firstName, "lastName": user.lastName,
                        "username": user.username, "password": user.password
                    }

                    initialUsers[index] = newuser;
                }
                console.log("update user function initialUsers[index] :" + initialUsers[index]);
                console.log(initialUsers[index]);
                console.log("update user function newuser :" + newuser);
                console.log(newuser);
                callback(newuser);


            }
        }


})();