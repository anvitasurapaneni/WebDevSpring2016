/**
 * Created by anvitasurapaneni on 2/3/16.
 */
alert("hello");
(function()
{$(init);
var $moviename;
    var $select;
    function  init(){
        var $moviename = $("#moviename");
        var $select = $("#select");

        $select.click(searchmovie);
    }

    function searchmovie(){
        var mt= $moviename;
        alert("helo" +mt);
    });

})();
