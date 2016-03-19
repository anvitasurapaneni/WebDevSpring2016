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
            console.log(user);
            console.log(user.username);
            UserService.findUserByCredentials(user.username, user.password)
                .then(function(response){



                    $rootScope.user = response.data;
                    console.log("rs="+$rootScope.user);
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