/**
 * Created by anvitasurapaneni on 2/3/16.
 */




(function() {

    angular
        .module("YouTubeApp", [])
        .controller("YouTubeController", YouTubeController);

    function YouTubeController($http, $scope) {
        //$(init);
        //var $MovieName;
        //var $SearchMovieTitle;
        //var $tbody;


        function init() {

            $http.get("https://www.googleapis.com/youtube/v3/search?part=snippet" +
                "&maxResults=5&q=boating&key=AIzaSyBId_35KFQKeZoRy-aRDZxma65PqdmkUI8")
                .success(callback);


        }
        init();

        function callback(response) {
            $scope.data = response;
//            console.log(response);
        }

    }


})();