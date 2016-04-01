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

        function init() {
    FormService.findAllFormsForUser($rootScope.user._id).then(function(response) {
    vm.forms = response;
        console.log("forms of user:");
        console.log(vm.forms);
    vm.$location = $location;
 });
        }
        init();

        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;


var index_position = null;


        var user_id = $rootScope.user._id;
        console.log("logged user ID:"+user_id);




      //  console.log($scope.forms);



        function addForm(form) {
console.log("in add form");
            FormService.createFormForUser($rootScope.user._id, form)
                .then(function(response) {
                //vm.forms = response;
                    vm.forms.push(response);
             });
            vm.form = {};
        }





        function updateForm(form){
// if(form.title != null && )
            var newForm = {
                "title": form.title,
                "userId": form.userId
            };



            FormService.updateFormById(form._id, newForm)
                .then(function (response) {
                    console.log(response);
                    if(response.nModified == 1){
                vm.forms[index_position].title = form.title;
                vm.form.title = null;
                vm.index_position = null;
                    }
                    else{
                        vm.form.title = null;
                        vm.index_position = null;
                    }

            });


        }





        function deleteForm($index){

            var formID = vm.forms[$index]._id;

            FormService.deleteFormById(formID).then(function(response) {

                if(response === "OK") {
                    init();
                }
            });
        }







        function selectForm($index) {

            vm.form={};

            var selectedForm = vm.forms[$index];

            vm.form = {
                _id: selectedForm._id,
                title: selectedForm.title,
                userId: selectedForm.userId
            };

            index_position = $index;
            console.log("index", $index);
        }

    }
})();