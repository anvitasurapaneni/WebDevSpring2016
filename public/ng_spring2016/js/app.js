/**
 * Created by anvitasurapaneni on 2/12/16.
 */
(function(){
angular
    .module("movieDBApp", [])
    .controller("movieListController", movieListController );

    function movieListController($scope){
var movies = [
    {id: 123, title: "avatar", year: 1993},
    {id: 143, title: "batman", year: 1997}
];
        $scope.movies = movies;

        // event handlers decleration
        $scope.addMovie = addMovie;
        $scope.removeMovie = removeMovie;
        $scope.selectMovie = selectMovie;
        $scope.updateMovie = updateMovie;


        // event handlers implementation
        function addMovie(movie){
            console.log( movie);
            var NewMovie =  {id: movie.id,
                title: movie.title,
                year: movie.year};
            $scope.movie ={};
            $scope.movies.push(NewMovie);
        }

         function removeMovie(movie){
             var index = $scope.movies.indexOf(movie);
            $scope.movies.splice(index, 1);

        }

        function  selectMovie(movie)
        {
            $scope.selectedMovieIndex = $scope.movies.indexOf(movie);

            $scope.movie = {id: movie.id,
                title: movie.title,
                year: movie.year};
        }

     function  updateMovie(movie)
     {
         $scope.movies[$scope.selectedMovieIndex] = movie;
     }

    }
})();
