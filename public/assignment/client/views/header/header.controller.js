/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService, $rootScope){
        var vm = this;

        function init() {
            vm.$location = $location;
        }
        init();


        vm.logout = logout;

        function logout() {

            UserService
                .logout()
                .then(function(user){
                    $rootScope.user = null;
                    $location.url("/home");
                });
        }

    }
})();