/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);





    function UserService($http,$rootScope, $q) {


        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername
        };

        return api;

        function findUserByUsername(username){

            return $http.get("/api/assignment/user?username=" + username);

        }

        function findUserById(id){
            console.log(id);
            return $http.get("/api/assignment/getuser?id="+id);
        }

// findUserByUsernameAndPassword
        function findUserByCredentials(username, password) {



            return $http.get("/api/assignment/user?username="+username+"&password="+password);




        }

// findAllUsers
            function findAllUsers() {
                return $http.get("/api/assignment/user");
            }

// createUser
            function createUser(user) {
                console.log(user);
                return $http.post("/api/assignment/user", user);
 }

// deleteUserById
            function deleteUserById(userId) {
               return $http.delete("/api/assignment/user/:id");

            }

// updateUser
            function updateUser(userId, user) {
                console.log(user);
                return  $http.put("/api/assignment/user/"+userId, user);

            }
        function setCurrentUser(user) {

            $rootScope.currentUser = user;
        }

        function getCurrentUser() {

            return $http.get("/api/assignment/users/loggedin");
        }



    }


})();