/**
 * Created by anvitasurapaneni on 2/3/16.
 */

(function() {
    $(init);
    var $MovieName;
    var $SearchMovieTitle;
    var $tbody;

    $http.get = "https://www.googleapis.com/youtube/v3/serach?"+
        "part=snippet" +
        "&id=k8qgmnhEA8E" +
        "&maxResults=5" +
        "&alt=json" +
        "&key=AIzaSyBId_35KFQKeZoRy-aRDZxma65PqdmkUI8";

    function init() {
        $MovieName = "football + -soccer";
        $SearchMovieTitle = $("#SearchMovieTitle");
        $SearchMovieTitle.click(searchMovie);
        // $tbody = $("#searchResults tbody");
}

    function searchMovie() {

        var mn = "football+-soccer";
        //   var name = anvita;

        var url = $SearchUrl.replace("Type", mn);
        //   alert("url:" + url)
        $.ajax({
            url: url,
            success: renderMovieList
    });
    }


    function renderMovieList(response){
       // $tbody.empty();
        console.log(response);}


})();