/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }

            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }

            })
            .when("/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }

            })
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {
            getLoggedIn: getLoggedIn
        }
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }

            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/form/:formId/fields", {

                templateUrl: "views/forms/fields.view.html",
                controller: "FieldController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }


            })
            .otherwise({
                redirectTo: "/home"
            });
    }


    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService.getCurrentUser().then(function (response) {

            var currentUser = response.data;

            if (currentUser) {
                UserService.setCurrentUser(currentUser);
                deferred.resolve();

            } else {

                deferred.reject();
                $location.url("/home");
            }
        });

        return deferred.promise;
    }



    function getLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService.getCurrentUser().then(function (response) {

            var currentUser = response.data;


                UserService.setCurrentUser(currentUser);
                deferred.resolve();


        });

        return deferred.promise;
    }

})();