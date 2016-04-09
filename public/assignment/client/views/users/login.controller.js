/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController( $rootScope, UserService, $location) {
        var vm = this;
        vm.login = login;



        function login(user)
        {

            UserService.login(user)
                .then(function(response){



                    $rootScope.user = response.data;
                    console.log("rs="+$rootScope.user);
                    console.log($rootScope.user);
                    vm.user.username = $rootScope.user.username;
                    vm.user = $rootScope.user;
                    if($rootScope.user == null){
                        $location.url('/home') ;
                    }
                    else{
                    $location.url('/profile') ;
                    }

                });


        }

    }
})();