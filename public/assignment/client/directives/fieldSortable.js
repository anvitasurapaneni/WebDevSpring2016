/**
 * Created by anvitasurapaneni on 3/18/16.
 */

(function(){
    angular
        .module("fieldSortable", [])
        .directive("fieldSortable", fieldSortable);

    function fieldSortable() {
        function link(scope, element, attrs) {
            var start = null;
            var end   = null;
            $(element)
                .sortable({
                    axis: "y",
                    sort: function(event, ui) {
                        //ui.helper.find("a").hide();
                        start = ui.item.index();
                    },
                    stop: function(event, ui) {
                        //ui.item.find("a").show();
                        end = ui.item.index();
                        if(start >= end) {
                            start--;
                        }
                        scope.fieldSortableCallback({start: start, end: end});
                    }
                });
        }
        return {
            scope: {
                fieldSortableCallback: '&'
            },
            link: link
        };
    }
})();













/* (function(){
    angular
        .module("fieldSortable", [])
        .directive("fieldSortable", fieldSortable);

    function fieldSortable() {
        var start = null;
        var end = null;
        function link(scope, element, attributes) {
            var fieldAxis = attributes.fieldAxis;
            $(element).sortable({
                axis: fieldAxis,
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    var temp = scope.fields[start];
                    scope.fields[start] = scope.fields[end];
                    scope.fields[end] = temp;
                    scope.$apply();
                }
            });
        }
        return {
            link: link
        }
    }
})(); */
