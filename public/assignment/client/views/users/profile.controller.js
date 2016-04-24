/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($rootScope, UserService, $location){
        var vm = this;
        vm.update = update;


        function init(){

            var currUser = $rootScope.user;
            if (currUser != null) {

                vm.user = {
                    username: currUser.username,
                    firstName: currUser.firstName,
                    lastName: currUser.lastName,
                    password: currUser.password,
                    email: joinArrayItems(currUser.email),
                    phones: joinArrayItems(currUser.phones),
                    roles: currUser.roles
                };
            }


        }

        init();


        function joinArrayItems(value){
            return value.join(',');
        }




        function update(user) {
            console.log("update user");
            console.log(user);

            var updatedUser = {

                _id: $rootScope.user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password,
                roles: user.roles,
                email : user.email.trim().split(","),
                phones : user.phones.trim().split(",")

            };

            UserService.updateUser($rootScope.user._id,updatedUser)
                .then(  function(user){
                    console.log(user);

                    $rootScope.user  = user.config.data;

                });


        }





    }
})();