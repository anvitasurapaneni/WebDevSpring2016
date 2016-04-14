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
                controllerAs: "model"
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

// /api/assignment/users/loggedin
    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();



        UserService.getCurrentUser().then(function (response) {





            var currentUser = response.data;
            console.log(response);

            if (currentUser) {
                UserService.setCurrentUser(currentUser);
                deferred.resolve();

            } else {
console.log("get current user not working");
                deferred.reject();
                $location.url("/home");
            }
        });
        //console.log(deferred.promise);
        return deferred.promise;

    }



    /*     $http.get('/api/assignment/users/loggedin').success(function (user) {
     $rootScope.errorMessage = null;
     // User is Authenticated
     if (user !== '0') {
     $rootScope.user = user;
     deferred.resolve();
     }
     // User is Not Authenticated
     else {
     $rootScope.error = 'You need to log in.';
     deferred.reject();
     $location.url('/');
     }
     });
     } */



    function getLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService.getCurrentUser().then(function (response) {

            var currentUser = response.data;


                UserService.setCurrentUser(currentUser);
                deferred.resolve();


        });

        console.log(deferred.promise);
        return deferred.promise;
    }

})();