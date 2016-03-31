/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($rootScope, UserService, $location) {
        var vm = this;
        vm.register = register;
        function init() {
            UserService.findAllUsers()
                .then(function (users) {
                    console.log("find all users:")
                    console.log(users);
                });
        }

        init();
        function register(user) {

            if (user != null) {

                if (user.username != null) {


                    UserService.createUser(user)
                        .then(function (response) {

                            console.log("response");
                            console.log(response.config.data);

                            $rootScope.user = response.config.data;
                            vm.user.username = $rootScope.user.username;
                            console.log($rootScope.user);

                            //data reached
                            $location.url('/profile');

                        });








                }
            }
        }


    }})();