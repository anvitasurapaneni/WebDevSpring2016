(function(){
angular
    .module("MovieApp")
    .factory("MovieService", movieService);

    function movieService($http){
        var api = {
            findMovieByTitle: findMovieByTitle,
            findMovieByimdbID: findMovieByimdbID
        };

        return api;

        function findMovieByTitle(title, callback){

            $http.get("http://www.omdbapi.com/?s="+title)
                .success(callback);
        }

        function  findMovieByimdbID(imbdID, callback){
            $http.get("http://www.omdbapi.com/?i="+imdbID)
                .success(callback);
        }
    }
    })();