/**
 * Created by anvitasurapaneni on 3/17/16.
 */
/**
 * Created by anvitasurapaneni on 3/16/16.
 */
var forms = require("./forms.mock.json");
module.exports = function(){
    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById

    };
    return api;

    function createFormForUser(userId, form){
       console.log("createFormForUser");
       console.log(userId);
       console.log(form);
        form.userId = userId;

forms.push(form);
        console.log(form);
        return form;
}

    function findAllFormsForUser(userId) {
        var formsOfUser = [];

        for (var i in forms) {

            if (forms[i].userId === userId) {

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

}
