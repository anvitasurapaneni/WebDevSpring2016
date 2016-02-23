/**
 * Created by anvitasurapaneni on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    var initialForms =
        [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

    $scope.initialForms = initialForms;

    function FormService($http){


        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return api;


// findAllFormsForUser(userId, callback)
        function findAllFormsForUser(userId, callback){


            var index;
            var userform = {};
            var foundforms =[];


            for (var i =0; i<initialForms.length; ++i)
            {
                if (initialForms[i]._id == userId) {

                    console.log("inside loop:" + initialForms[i]._id);

                    index = i;
                    userform = {"_id": initialForms[i]._id,
                            "title": initialForms[i].title,
                            "userId": initialForms[i].userId}
                    foundforms.push(userform);
                }
            }



            callback(foundforms);
        }


// createFormForUser
        function  createFormForUser(userId, form, callback){
            var newform = {}
            var  newformID = (new Date).getTime();

            newform = {"_id": newformID, "title": form.title, "userId": userId}
            initialForms.push(newform);
            console.log( initialForms);
            callback(newform);

        }

// deleteFormById
        function deleteFormById(formId, callback){
            var index = null;
            for (var form in initialForms) {
                if (form._id == formId) {
                    index = initialForms.getItemIndex(form);
                }}
            initialForms.splice(index);
            callback(initialForms);
        }

// updateFormById
        function updateFormById(formId, newForm, callback){
            var index = 0;
            var flag = 0;
            var newform = {};
            for (var i = 0; i < initialForms.length; i++)  {

                if (initialForms[i]._id == formId) {
                    index = i;
                    var flag = 1;
                    break;
                }}
            console.log("update form function index"+ index);
            console.log("update form function useer ID:"+ formId);
            console.log("update form function useer :"+ newForm);
            if(flag == 1) {

                newform = {"_id": newForm._id, "title": newForm.title, "userId": newForm.userId}

                initialForms[index]= newform;
            }
            console.log("update user function initialUsers[index] :"+ initialForms[index]);
            console.log(initialForms[index]);
            console.log("update user function newuser :"+ newform);
            console.log(newform);
            callback(newform);


        }
    }

})();