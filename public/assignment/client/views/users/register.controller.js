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
                //    vm.user.email = joinArrayItems1(vm.user.email);
                });
        }

        init();


        function register(user) {
            console.log("user");
            console.log(user);

            if (user != null) {
                if (user.password != user.verifypassword){
                    alert("passwords do not match");
                }

                if ((user.username != null) && (user.password == user.verifypassword)) {


                    UserService.register(user)
                        .then(function (response) {
                            user.email =  user.email.trim().split(",")

                            console.log(response);

                            $rootScope.user = response.config.data;
                            console.log("rootscope user after register"+$rootScope.user);

                            console.log($rootScope.user);

                            //data reached
                            $location.url('/profile');

                        });








                }
            }
        }


    }})();