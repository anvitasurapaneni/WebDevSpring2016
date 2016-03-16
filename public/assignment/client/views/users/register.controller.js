/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($scope, $rootScope, UserService, $location){



$scope.register = register;
        function register(user){
            console.log("user"+user);

            UserService.createUser(user, function(response){
                console.log("value of response");
                console.log(response);

                $rootScope.user = response;

                //data reached
                $location.url('/profile') ;
            });
        }



    }
})();