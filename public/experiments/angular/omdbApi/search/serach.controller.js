(function(){
    angular
        .module("MovieApp")
        .controller("SearchController", searchController);

    function searchController($scope, MovieService){
        $scope.search =search;
        $scope.title ="star wars";

        function  search(title) {
            console.log(title);

            MovieService.findMovieByTitle(title,
                function(response){
                    console.log(response);
                    $scope.data = response;
                });
        }


    }

    })();
