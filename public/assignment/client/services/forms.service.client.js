"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);





    function FormService($http, $q){


        var api = {

            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById: findFormById

        };

        return api;
        console.log("forms client side service.js");
console.log($rootScope.user);

        function findAllFormsForUser(userId){
            console.log("user ID", userId);
            var deferred = $q.defer();

            var url = "/api/assignment/user/:userId/form";
            url = url.replace(":userId", userId);

            $http.get(url).success(function (response) {

                deferred.resolve(response);
            });

            return deferred.promise;
        }


// createFormForUser
        function  createFormForUser(userId, form){
            var deferred = $q.defer();

            var url = "/api/assignment/user/:userId/form";
            url = url.replace(":userId", userId);

            $http.post(url, form).success(function (response) {

                deferred.resolve(response);
            });

            return deferred.promise;
        }

// deleteFormById
        function deleteFormById(formId){
            var deferred = $q.defer();

            var url = "/api/assignment/form/:formId";
            url = url.replace(":formId", formId);

            $http.delete(url).success(function(response) {

                deferred.resolve(response);
            });

            return deferred.promise;
        }

// updateFormById
        function updateFormById(formId, newForm){
            var deferred = $q.defer();

            var url = "/api/assignment/form/:formId";
            url = url.replace(":formId", formId);

            $http.put(url, newForm).success(function(response) {

                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function findFormById(formId) {

            var deferred = $q.defer();

            var url = "/api/assignment/form/:formId";
            url = url.replace(":formId", formId);

            $http.get(url).success(function(response) {

                deferred.resolve(response);
            });

            return deferred.promise;

        }


    }

})();