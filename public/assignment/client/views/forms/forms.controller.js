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


var index_position = -1;


        var user_id = $rootScope.user._id;
        console.log("logged user ID:"+user_id);




      //  console.log($scope.forms);



        function addForm(form) {

            FormService.createFormForUser($rootScope.user._id, form)
                .then(function(response) {
                vm.forms = response;
             });
            vm.form = {};
        }





        function updateForm(form){

            FormService.updateFormById(form._id, form).then(function (response) {

                if (response === "OK") {

                    FormService.findFormById(form._id).then(function(response) {

                        vm.forms[index_position] = response;
                    });
                }
            });

            vm.form={};
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