/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($scope,  $location){
        var initialForms  = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        $scope.initialForms = initialForms;
        console.log(initialForms);

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;


        function addForm(){

        }


        function updateForm(){

        }


        function deleteForm(form){
            var formID = form._id;
            console.log(formID);








        }

        function selectForm(){

        }


    }
})();