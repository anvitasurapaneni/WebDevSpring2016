/**
 * Created by paulomimahidharia on 3/3/16.
 */

(function(){
    angular
        .module("NoteSpace")
        .controller("TextEditorController", textEditorController );

    function textEditorController($routeParams, WidgetService, $location){
        var vm = this;

        // event handlers decleration

       vm.addText = addText;

        function init(){
            var noteId = $routeParams.noteId;

            var widgetId = $routeParams.widgetId;
            //console.log(widgetId);
            if(widgetId){
                WidgetService.getWidgetById(noteId, widgetId)
                    .then(
                      function(widget){
                          console.log("Got widget");
                          console.log(widget);
                         vm.widget = widget;
                      }
                    );
            }
        }
        init();



        function addText(widget){

            console.log(widget);

            var noteId = $routeParams.noteId;
            widget.widgetType = 'TEXT';

            WidgetService.addWidget(noteId, widget)
                .then(
                    function (response) {
                        console.log(response);
                        $location.url("/editnote/"+noteId);
                    }
                )
        }

        /*function cancelText(widget){
            var index = $scope.widgets.indexOf(widget);
            $scope.widgets.splice(index, 1);

        }*/

        /*function  selectText(widget)
        {
            $scope.selectedTextIndex = $scope.widgets.indexOf(widget);
            $scope.widget = {_id: widget._id,
                notetext: widget.notetext};
        }

        function  updateText(widget)
        {
            $scope.widgets[$scope.selectedTextIndex] = widget;
            $scope.widget={};
        }*/

    }
})();