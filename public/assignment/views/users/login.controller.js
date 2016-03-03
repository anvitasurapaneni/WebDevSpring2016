/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, UserService, $location) {
        $scope.login = login;



        function login(user)
        {
            console.log(user);
            UserService.findUserByUsernameAndPassword(user.username,
                user.password,
                function(response){
                    console.log("response");
                    console.log(response);
                    $rootScope.user = response;
                  //  $rootScope.loggeduser = response;
                    $location.url('/profile') ;

                });


        }

    }
})();