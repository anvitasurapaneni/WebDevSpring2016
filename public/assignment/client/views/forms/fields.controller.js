/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);


    function FieldController(FieldService, $routeParams, $location, $uibModal){
        var vm = this;
        vm.fields = [];
        vm.field = {};
        vm.options = [];

        vm.removeField = removeField;
        vm.addField = addField;
        vm.editField = editField;
        vm.updateSingleLineText = updateSingleLineText;

        function updateSingleLineText(popfields){
            console.log("hello came from modal"+popfields);
        }

        vm.oldIndex = -1;

        var formId = -1;

        function init() {

            if($routeParams.formId) {
                console.log("in init of fields");
                console.log("form id"+$routeParams.formId);

                formId = $routeParams.formId;

                FieldService.getFieldsForForm(formId).then(function (response) {

                    console.log("response for get fields for form");
                    console.log(response);

                    vm.fields = response;


                });

            }  else {

                $location.url("/forms");
            }

            vm.options = [
                {name: "Single Line Text", value: "single-line-text"},
                {name: "Multi Line Text", value: "multiple-line-text"},
                {name: "Date", value: "date"},
                {name: "Dropdown", value: "dropdown"},
                {name: "Checkboxes", value: "checkbox"},
                {name: "Radio Buttons", value: "radio"},
                {name: "EMail", value: "e-mail"},
                {name: "PassWord", value: "password"}

            ];
        }
        init();

        function removeField($index) {
            console.log("client side remove field called");

            var fieldId = vm.fields[$index]._id;
            console.log("field ID"+fieldId);
            console.log("form ID"+formId);

            FieldService.deleteFieldFromForm(formId, fieldId).then(function (response) {
                console.log("remove filed response");
                console.log(response);

                if(response == "OK") {
                    console.log(response);

                    FieldService.getFieldsForForm(formId).then(function (response1) {
                        console.log("response1");
                        console.log(response1);

                        vm.fields = response1;


                    });
                }
            });
        }

        function addField() {

            var fieldType = vm.fieldType.value;
            console.log(fieldType);

            switch (fieldType) {

                case "single-line-text":
                    vm.field = {
                        label: "New Text Field",
                        type: "TEXT",
                        placeholder: "New Field"
                    };
                    break;

                case "multiple-line-text":
                    vm.field = {
                        label: "New Text Field",
                        type: "TEXTAREA",
                        placeholder: "New Field"
                    };

                    break;

                case "date":
                    vm.field = {
                        label: "New Date Field",
                        type: "DATE"
                    };
                    break;

                case "dropdown":
                    vm.field = { "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
                    break;

                case "checkbox":
                    vm.field = { "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]};
                    break;

                case "radio":
                    vm.field = { "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]};
                    break;

                case "e-mail":
                    vm.field = {
                        label: "EMail",
                        type: "EMAIL",
                        placeholder: "email"
                    };
                    break;

                case "password":
                    vm.field = {
                        label: "PassWord",
                        type: "PASSWORD",
                        placeholder: "password"
                    };
                    break;


            }

            console.log("vm and vm.field");
            console.log(vm);
            console.log(vm.field);
            console.log("form id");
            console.log(formId);

            FieldService.createFieldForForm(formId, vm.field).then(function (response) {
                console.log("response");
                console.log(response.fields);


                vm.fields = response.fields;

                vm.field = {};
            });

        }


        function editField($index) {
            vm.fieldToBeEdited = vm.fields[$index];

            var modalInstance = $uibModal.open( {

                templateUrl: 'fieldEditModal.html',

                controller: 'ModalInstanceCtrl',

                resolve: {
                    field: function () {

                        console.log(vm.fieldToBeEdited);

                        return vm.fieldToBeEdited;
                    }
                }

            });

            modalInstance.result
                .then(function (field) {
                     FieldService.updateField(formId, field._id, field)
                         .then(function(response){
                             console.log(response);
                             if(response.ok == 1){
                                 FieldService.getFieldsForForm(formId)
                                     .then(function(response1){
                                         console.log(response1);
                                         vm.fields = response1;
                                     });
                             }
                         });

                })
                .then(function (response) {
                    if(response === "OK") {
                        return FieldService.getFieldsForForm(formId);

                    }
                })
                .then(function (response) {
                    vm.fields = response;


                });
        }
    }

    angular.module('FormBuilderApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, field) {

        $scope.field = field;

        $scope.ok = function () {

            if($scope.newLabel) {
                $scope.field.label = $scope.newLabel;
            }

            if($scope.field.type != "DATE") {

                if($scope.newPlaceholder) {

                    if($scope.field.type === "TEXT" || $scope.field.type === "TEXTAREA" || $scope.field.type === "PASSWORD" || $scope.field.type === "EMAIL") {

                        $scope.field.placeholder = $scope.newPlaceholder;

                    } else {

                        UpdateOtherFields();
                    }
                }

            }

            function UpdateOtherFields() {

                var content = $scope.newPlaceholder;

                content = content.trim();

                var rawOptions = content.split("\n");

                var options = [];

                for (var i in rawOptions) {

                    var rawField = rawOptions[i].split(":");

                    var option = {label: rawField[0], value: rawField[1]};

                    options.push(option);
                }

                $scope.field.options = options;

            }

            $uibModalInstance.close($scope.field);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
})();