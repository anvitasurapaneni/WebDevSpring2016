/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope, $rootScope, UserService, $location){


        $scope.update = update;
       
        var usercurrent = $rootScope.user;


        // console.log( "checking before printing"+$rootScope.data);
      //  $scope.user.username = "abc";
      //  $scope.user.password = "cde";

        function update(user){
            console.log(user);
            var userid = user._id;
            console.log("profile controller user id"+$rootScope.user);

            UserService.updateUser(userid, usercurrent, function(response){
                console.log("this is response"+response);
                console.log(response);
                $location.url('/profile') ;
            });
        }

    }
})();