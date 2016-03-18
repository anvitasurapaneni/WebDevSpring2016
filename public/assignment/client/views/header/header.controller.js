/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location){
        var vm = this;

        function init() {
            vm.$location = $location;
        }
        init();

    }
})();