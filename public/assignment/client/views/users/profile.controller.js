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
        // console.log( "checking before printing"+$rootScope.data);
      //  $scope.user.username = "abc";
      //  $scope.user.password = "cde";
var currentuser = $rootScope.user;
    console.log(currentuser);
    if(currentuser != null){
    vm.user = currentuser;
    }
}
        init();
        function update(user){
            console.log(user);
            var userid = $rootScope.user._id;

            var updatedUser ={"_id":userid,
                "firstName":user.firstName,
                "lastName":user.lastName,
                "username": user.username,
                "password":user.password,
                "email": user.email                };

            console.log("profile controller user id and updated user" );
            console.log($rootScope.user._id);
            console.log(updatedUser);

            UserService.updateUser($rootScope.user._id, updatedUser)
                .then (function(response){
                console.log("this is response for update"+response);
                console.log(response);
                    $rootScope.user = response.config.data;
                    console.log("root scope user after update");
                    console.log($rootScope.user);
                $location.url('/profile') ;
            });
        }

    }
})();