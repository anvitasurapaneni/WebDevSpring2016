/**
 * Created by anvitasurapaneni on 2/3/16.
 */

(function(){
    $(init);
    var $MovieName;
    var $SearchMovieTitle;
    var $tbody;
    var $SearchUrl ="http://www.omdbapi.com/?s=TITLE&page=PAGE";
    var detailsUrl = "http://www.omdbapi.com/?i=IMDBID";

    function init(){
         $MovieName = $("#MovieName");
         $SearchMovieTitle = $("#SearchMovieTitle");
        $SearchMovieTitle.click(searchMovie);
        $tbody = $("#searchResults tbody");

    }

    function searchMovie(){

        var mn = $MovieName.val();
     //   var name = anvita;

        var url = $SearchUrl.replace("TITLE", mn)
            .replace("PAGE", 1);
     //   alert("url:" + url)
        $.ajax({
            url: url,
            success: renderMovieList
        });
            }

    function renderMovieList(response){
        $tbody.empty();
        console.log(response);
        var totalResults = Response.totalResults;
        var movies = response.Search;
        for(var m=0; m<movies.length; m++)
        {
            var movie = movies[m];

            var Title = movie.Title;
            var imdbID = movie.imdbID;
            var Poster = movie.Poster;

            console.log(Title);
            var $tr =$("<tr>");

            var $img = $("<img>").attr("src", Poster)
                .addClass("poster")
                .attr("id",imdbID)
                .click(SearchMovieDetails);

            var $td =$("<td>");
            $td.append($img);
            $tr.append($td);

             $td =$("<td>")
                .append(Title);
            $tr.append($td);

            $td =$("<td>")
                .append(imdbID);
            $tr.append($td);

            $tbody.append($tr);
        }
    }

    function SearchMovieDetails(event){

        var image = $(event.currentTarget);
        var imdbid = image.attr("id");

        var url = detailsUrl.replace("IMDBID", imdbid);
        $.ajax({
            url: url,
            success:renderMovieDetails
        })
    }
function renderMovieDetails(movie){
  console.log(movie);
    var actors = movie.Actors;
    var director = movie.Director;
    var plot = movie.Plot;
    var poster = movie.Poster;
    var title = movie.Title;
}
})();