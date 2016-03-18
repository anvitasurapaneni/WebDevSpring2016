/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($scope,$rootScope, FormService,  $location){

        var vm = this;
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;


        var forms  = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];


        var user_id = $rootScope.user._id;
        console.log(user_id);

        FormService.findAllFormsForUser(user_id, function(response){
            console.log("value of logged users ");
            console.log(response);
            $scope.forms = response;

        });


       // $scope.forms = forms;
        console.log($scope.forms);



        function addForm(form){
            //console.log("form after add"+form);
            //console.log(form);
            //console.log($rootScope.user);
            var userId = $rootScope.user._id;
            FormService.createFormForUser(userId,form, function(response){
                //console.log("value of response after add");
                //console.log(response);

                //console.log("checking initial form");

                //console.log($scope.forms);
                $scope.forms.push(response);
                $scope.form = {};


                // $location.url('/profile') ;
            });


        }


        function updateForm(form){
            var formID = form._id;

            FormService.updateFormById(formID,form, function(response){
                console.log("value of response after update");
                console.log(response);

                //  var forms1 = $scope.forms;

                //   forms1.push(response);
                //   console.log("forms1");
                //   console.log(forms1);
                $scope.form ={};

                //   $rootScope.data = response;

                //data reached
                // $location.url('/profile') ;
            });




        }


        function deleteForm(form){
            var formID = form._id;
            console.log(formID);



            FormService.deleteFormById(formID, function(response){
                console.log("value of response after delete");
                console.log(response);

                $scope.forms = response;

                //   $rootScope.data = response;

                //data reached
                // $location.url('/profile') ;
            });

        }







        function selectForm(form){
            $scope.form = form;
            $scope.form.title = form.title;

            console.log(form);

        }


    }
})();