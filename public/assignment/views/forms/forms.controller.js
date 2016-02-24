/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($scope,$rootScope, FormService,  $location){
        var forms  = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        $scope.forms = forms;
        console.log(forms);

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;


        function addForm(form){
            console.log("form after add"+form);
            console.log(form);
            console.log($rootScope.loggeduser);
            var userId = $rootScope.loggeduser._id;
            FormService.createFormForUser(userId,form, function(response){
                console.log("value of response after add");
                console.log(response);

             console.log("checking initial form");

    console.log($scope.forms);
                var forms1 = $scope.forms;
                forms1.push(response);
                console.log("forms1");
                console.log(forms1);
                $scope.form ={};

                //data reached
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