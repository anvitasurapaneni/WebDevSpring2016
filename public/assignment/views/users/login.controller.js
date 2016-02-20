/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $routeParams, UserService) {
        $scope.login = login;
        $scope.username = $routeParams.username;
        $scope.password = $routeParams.password;

        function login(username, password)
        {
            UserService.findUserByUsernameAndPassword(username,
                password,
                function(response){
                    console.log(response);
                    $scope.data = response;
                });


        }

    }
})();