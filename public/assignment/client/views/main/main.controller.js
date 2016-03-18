/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function  MainController($scope, $location){
        var vm = this;
        function init() {
            $scope.$location = $location;
        }
        init();

    }

})();