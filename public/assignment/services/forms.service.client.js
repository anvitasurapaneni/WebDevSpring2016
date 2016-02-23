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


// findAllFormsForUser(userId, callback)
        function findAllFormsForUser(userId, callback){


            var index;
            var userform = {};
            var foundforms =[];


            for (var i =0; i<forms.length; ++i)
            {
                if (forms[i]._id == userId) {

                    console.log("inside loop:" + forms[i]._id);

                    index = i;
                    userform = {"_id": forms[i]._id,
                            "title": forms[i].title,
                            "userId": forms[i].userId}
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
            forms.push(newform);
            console.log( forms);
            callback(newform);

        }

// deleteFormById
        function deleteFormById(formId, callback){
            var index = null;
            console.log("form id:"+ formId);
            for (var form in forms) {
                if (form._id == formId) {
                    index = forms.getItemIndex(form);
                }}
            console.log("item index:"+index);
            forms.splice(index, 1);
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