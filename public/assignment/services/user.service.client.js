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



    function UserService($http){


        var api = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return api;


// findUserByUsernameAndPassword
        function findUserByUsernameAndPassword(username, password, callback){

            var valied = false;
            var index;
            var valiedUser = null;

            for (var i =0; i<len; ++i)
            {
                if ((initialUsers[i].username == username)&& (initialUsers[i].password == password))

                valied= true;
                index = initialUsers.getItemIndex()
            }

            if(valied == true)
            {
               valiedUser = initialUsers[index];
            }

           callback(valiedUser);
        }

// findAllUsers
     function  findAllUsers(callback){
            callback(initialUsers);
     }

// createUser
    function  createUser(user, callback){
        user._id = (new Date).getTime();
        initialUsers.push(user);
        callback(initialUsers);

    }

// deleteUserById
     function deleteUserById(userId, callback){
            var index = null;
            for (var user in initialUsers) {
                if (user._id == userId) {
                index = initialUsers.getItemIndex(user);
            }}
initialUsers.splice(index);
            callback(initialUsers);
        }

// updateUser
      function updateUser(userId, user, callback){
            var index = null;
            for (var user in initialUsers) {
                if (user._id == userId) {
                    index = initialUsers.getItemIndex(user);
                }}
            initialUsers[index]._id = user._id;
            initialUsers[index].firstName = user.firstName;
            initialUsers[index].lastName = user.lastName;
            initialUsers[index].username = user.username;
            initialUsers[index].password = user.password;
            initialUsers[index].roles = user.roles;

            callback(initialUsers[index]);


        }
    }

})();