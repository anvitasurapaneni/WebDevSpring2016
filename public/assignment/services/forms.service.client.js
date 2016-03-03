"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    var forms =
        [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];



    function FormService($http){


        var api = {

            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
           // setForms: setForms,
           // getForms: getForms
        };

        return api;
        console.log("abc");
console.log($rootScope.user);

        function findAllFormsForUser(userId, callback){


            var index;
            var userform = {};
            var foundforms =[];


            for (var i =0; i<forms.length; i++)
            {
                if (forms[i].userId == userId) {

                    console.log("inside loop1:" + forms[i]._id);


                    userform = {"_id": forms[i]._id,
                            "title": forms[i].title,
                            "userId": forms[i].userId}
                    foundforms.push(userform);
                    userform = {};
                }
            }

forms = foundforms;

            callback(foundforms);
        }


// createFormForUser
        function  createFormForUser(userId, form, callback){
            var newform = {}

            newform = {"_id": (new Date).getTime(), "title": form.title, "userId": userId}

            console.log(newform);
            callback(newform);

        }

// deleteFormById
        function deleteFormById(formId, callback){
            var index = null;
            console.log("form id:"+ formId);
            for (var i = 0; i < forms.length; i++) {
                if (forms[i]._id == formId) {
                    index = i;
                    forms.splice(index, 1);
                }}
            console.log("item index:"+index);

            callback(forms);
        }

// updateFormById
        function updateFormById(formId, newForm, callback){
            var index = 0;
            var flag = 0;
            var newform = {};
            for (var i = 0; i < forms.length; i++)  {

                if (forms[i]._id == formId) {
                    index = i;
                    var flag = 1;
                    break;
                }}
            console.log("update form function index"+ index);
            console.log("update form function useer ID:"+ formId);
            console.log("update form function useer :"+ newForm);
            if(flag == 1) {

                newform = {"_id": newForm._id, "title": newForm.title, "userId": newForm.userId}

                forms[index]= newform;
            }
            console.log("update user function forms[index] :"+ forms[index]);
            console.log(forms[index]);
            console.log("update user function newuser :"+ newform);
            console.log(newform);
            callback(newform);


        }
    }

})();