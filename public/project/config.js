/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("NoteSpace")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/header", {
                templateUrl: "views/header/header.view.html",
                controller: "HeaderController"
            })
            .when("/text", {
                templateUrl: "views/widgets/text/text.view.html",
                controller: "TextEditorController"
            })
            .when("/todo", {
                templateUrl: "views/widgets/todoWidget/todoWidget.view.html",
                controller: "toDoController"
            })
            .when("/image", {
                templateUrl: "views/widgets/imageWidget/imageWidget.view.html",
                controller: "imageController"
            })
            .when("/youtube", {
                templateUrl: "views/widgets/youtubeApiWidget/youtubeApiWidget.view.html",
                controller: "YouTubeController"
            })
            .when("/map", {
                templateUrl: "views/widgets/googlemap/map.view.html",
                controller: "MapController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })

            .otherwise({
                redirectTo: "/home"
            });
    }
})();