/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, UserService){
        var vm = this;

        vm.addUser = addUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;

        (function init() {
            UserService.findAllUsers()
                            .then(
                                   function(allUsers){
                                       console.log("returned from find all users");
                                            console.log(allUsers);
                                            vm.users = allUsers.data;
                                                         }
                                );

        })();

        function addUser(user){

            var newUsers = [];
            UserService.createUser(user)
                .then(
                    function(response){

                        init();
                    }
                );
            vm.user = {};
        }

        function deleteUser($index){

            var userId = vm.users[$index]._id;

            UserService.deleteUserById(userId)
                .then(
                    function(users){

                        init();

                    }
                );
        }


        function selectUser($index){

            var userId = vm.users[$index]._id;

            UserService.findUserById(userId)
                .then(
                    function(response){
                        var user = response.data;
                        console.log("user");
                        vm.user = user;
                    }
                );
        }


        function updateUser(user){

            var userId = user._id;
            var newUsers=[];
            UserService.updateUser(userId, user)
                .then(
                    function(response){
                        init();
                        vm.user = {};

                    }
                );
        }




    }
})();