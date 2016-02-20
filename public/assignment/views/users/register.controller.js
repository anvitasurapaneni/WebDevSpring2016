/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($scope, $rootScope, UserService){
$scope.user;
$scope.register = register;
        function register(user){
            console.log(user);

            UserService.createUser(user, function(response){
                console.log(response);
                $scope.data = response;
            });
        }

    }
})();