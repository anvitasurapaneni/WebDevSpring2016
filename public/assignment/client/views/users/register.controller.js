/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($rootScope, UserService, $location){
        var vm = this;
vm.register = register;
        function init(){
            UserService.findAllUsers()
                .then(function(users){
                    console.log("find all users: users")
                    console.log(users);
                });
        }
init();
        function register(user){
            console.log("user:");
            console.log(user);
            var userid = (new Date()).getTime();
            console.log("new user id"+userid);
            var newUser ={        "_id":userid,
                "firstName":user.firstName,
                "lastName":user.lastName,
                "username": user.username,
                "password":user.password,
                "email": user.email,
            "roles": []
            };
            console.log("new user:");
            console.log(newUser);

            UserService.createUser(newUser)
                .then (function(response){
                console.log("value of response after register:");
                console.log(response);

                $rootScope.user = response.data;

                //data reached
                $location.url('/profile') ;
            });
        }



    }
})();