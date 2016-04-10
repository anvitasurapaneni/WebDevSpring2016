/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController($rootScope){
        var vm = this;

        vm.addUser = addUser;
        vm.deleteUser = deleteUser;

        (function init() {
            UserService.findAllUsers()
                            .then(
                                   function(allUsers){
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

                        var users1 = response.data;

                        // Display users except Admin

                        for(var i in users1){
                            if(users1[i].roles.indexOf("admin") == -1){
                                newUsers.push(users1[i]);
                            }
                        }

                        vm.users = newUsers;
                    }
                );
            vm.user = {};
        }

        function deleteUser($index){

            var userId = vm.users[$index]._id;

            UserService.deleteUserById(userId)
                .then(
                    function(users2){
                        vm.users = users2.data;

                    }
                );
        }




    }
})();