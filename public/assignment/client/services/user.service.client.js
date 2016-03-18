/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);





    function UserService($http) {


        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return api;


// findUserByUsernameAndPassword
        function findUserByCredentials(username, password) {

         //   return $http.post("/formMaker/user", credentials);
            console.log("text");

            return $http.get("/api/assignment/user?username="+username+"&password="+password);




        }

// findAllUsers
            function findAllUsers() {
                return $http.get("/api/assignment/user");
            }

// createUser
            function createUser(user) {
                return $http.post("/api/assignment/user", user);
 }

// deleteUserById
            function deleteUserById(userId) {
               return $http.delete("/api/assignment/user/:id");

            }

// updateUser
            function updateUser(userId, user) {
                return  $http.put("/api/assignment/user/"+userId, user);

            }
        }


})();