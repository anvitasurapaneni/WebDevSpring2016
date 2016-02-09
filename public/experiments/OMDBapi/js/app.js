/**
 * Created by anvitasurapaneni on 2/3/16.
 */

(function(){
    $(init);
    var $MovieName;
    var $SearchMovieTitle;
    var $tbody;
    var $SearchUrl ="http://www.omdbapi.com/?s=TITLE&page=PAGE";

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
                .addClass("poster");

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

})();