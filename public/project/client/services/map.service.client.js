
"use strict";
(function(){
    angular
        .module("NoteSpace")
        .factory("MapService", mapService);

    function mapService($http){
        var api = {
            findPlaceByName: findPlaceByName
        };

        return api;

        function findPlaceByName(place, callback){
            console.log(place);
            $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+place+"&key=AIzaSyCf4_tYh0DMPul0ewcyzdK9l5K_jNHDU9Y")
                .success(callback);
        }
    }
})();