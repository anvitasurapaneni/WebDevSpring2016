(function(){
angular
    .module("MovieApp")
    .factory("MovieService", movieService);

    function movieService($http){
        var api ={
            FindMovieByTitle: findMovieByTitle,
            FindMovieByimdbID: findMovieByimdbID
        };

        return api;

        function findMovieByTitle(title, callback){

            $http.get("http://www.omdbapi.com/?s="+title)
                .success(callback);
        }

        function findMovieByimdbID(){
    }
    }();