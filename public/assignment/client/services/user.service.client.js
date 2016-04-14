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
            findUserByUsername: findUserByUsername,
            logout : logout,
            login: login,
            register: register
        };

        return api;

        function register(user){
            return $http.post("/api/assignment/register",user);
                    }

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function findUserByUsername(username){

            return $http.get("/api/assignment/user?username=" + username);

        }

        function findUserById(id){
            console.log(id);
            return $http.get("/api/assignment/user/"+id);
        }

// findUserByUsernameAndPassword
        function findUserByCredentials(username, password) {
        return $http.get("/api/assignment/user?username="+username+"&password="+password);
        }

// findAllUsers
        function findAllUsers() {
            console.log("user service");
            return $http.get("/api/assignment/user");
        }

// createUser
        function createUser(user) {
            console.log(user);
            return $http.post("/api/assignment/user", user);
        }

// deleteUserById
        function deleteUserById(userId) {
            console.log(userId);
            return $http.delete("/api/assignment/user/"+userId);

        }

// updateUser
        function updateUser(userId, user) {
            console.log(user);
            return  $http.put("/api/assignment/user/"+userId, user);

        }
        function setCurrentUser(user) {

            $rootScope.user = user;
        }

        function getCurrentUser() {

            return $http.get("/api/assignment/users/loggedin");
        }

        function logout() {
            return $http.post("/api/assignment/user/logout")
                .success(function () {
                    $rootScope.user = null;
                });
        }

    }






})();