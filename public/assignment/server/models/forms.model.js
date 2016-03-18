/**
 * Created by anvitasurapaneni on 3/17/16.
 */
/**
 * Created by anvitasurapaneni on 3/16/16.
 */
var forms = require("./forms.mock.json");
module.exports = function(){
    var api = {

        // form functions

        createFormForUser: createFormForUser,
        findAllFormsByUserId: findAllFormsByUserId,
        findFormById: findFormById,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,

        // field functions

        createFieldForForm: createFieldForForm,
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldByFieldIdAndFormId: findFieldByFieldIdAndFormId,
        updateFieldByFieldIdAndFormId: updateFieldByFieldIdAndFormId,
        deleteFieldByFieldIdAndFormId: deleteFieldByFieldIdAndFormId

    };
    return api;
// form munction definitons
    function createFormForUser(userId, form){
       console.log("createFormForUser");
       console.log(userId);
       console.log(form);
        form.userId = userId;

forms.push(form);
        console.log(form);
        return form;
}

    function findAllFormsByUserId(userId) {
        console.log(userId);
        var formsOfUser = [];

        for (var i in forms) {
            console.log(forms[i].userId);
            if (forms[i].userId == userId) {
                formsOfUser.push(forms[i]);
            }
        }

        return formsOfUser;
    }



    function findFormById(formId) {
        for (var i in forms) {

            if(forms[i]._id === formId) {

                return forms[i];
            }
        }
        return null;
    }


    function deleteFormById(formId) {
        for (var i in forms) {

            if (forms[i]._id == formId) {

                forms.splice(i,1);
                break;
            }
        }
        return forms;
    }


    function updateFormById(formId, form) {

        for (var i in forms) {

            if(forms[i]._id === formId) {

                forms[i].title = form.title;
                break;
            }
        }

        return forms;
    }

    // field munction definitons
    function createFieldForForm(formId, field) {
        for (var i in forms) {

            if (forms[i]._id === formId) {

                if(!forms[i].fields) {
                    forms[i].fields = [];
                }

                forms[i].fields.push(field);
                break;
            }
        }
    }

    function findAllFieldsForForm (formId) {

        for (var i in forms) {

            if (forms[i]._id == formId) {
                console.log("forms fields");
console.log(forms[i].fields);
                return forms[i].fields;
            }
        }
        return null;
    }

    function findFieldByFieldIdAndFormId(formId, fieldId) {
        for (var i in forms) {

            if (forms[i]._id === formId) {

                for (var j in forms[i].fields) {

                    if (forms[i].fields[j]._id === fieldId) {

                        return forms[i].fields[j];
                    }
                }
            }
        }
        return null;
    }

    function updateFieldByFieldIdAndFormId(formId, fieldId, field) {

        field._id = fieldId;

        for (var i in forms) {

            if (forms[i]._id === formId) {

                for (var j in forms[i].fields) {

                    if (forms[i].fields[j]._id === fieldId) {

                        forms[i].fields[j] = field;
                    }
                }
            }
        }
    }

    function deleteFieldByFieldIdAndFormId(formId, fieldId) {

        for (var i in forms) {

            if (forms[i]._id === formId) {

                for (var j in forms[i].fields) {

                    if (forms[i].fields[j]._id === fieldId) {

                        forms[i].fields.splice(j,1);
                    }
                }
            }
        }
    }

}
