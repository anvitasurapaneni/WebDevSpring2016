/**
 * Created by anvitasurapaneni on 2/3/16.
 */

(function(){
    $(init);
    var $MovieName;
    var $SearchMovieTitle;
    var $tbody;
    var $Searchurl = "https://www.googleapis.com/youtube/v3/search?part=snippet" +
        "&maxResults=5&q=CATEGORY&key=AIzaSyBId_35KFQKeZoRy-aRDZxma65PqdmkUI8";



    function init(){
         $MovieName = $("#MovieName");
         $SearchMovieTitle = $("#SearchMovieTitle");
        $SearchMovieTitle.click(searchMovie);
        $tbody = $("#searchResults tbody");

    }

    function searchMovie(){

        var mn = $MovieName.val();
     //   var name = anvita;

        var url = $SearchUrl.replace("CATEGORY", mn);
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
        var movies = response.items;
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



})();