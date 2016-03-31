/**
 * Created by anvitasurapaneni on 3/17/16.
 */
/**
 * Created by anvitasurapaneni on 3/16/16.
 */
var forms = require("./forms.mock.json");
var q = require("q");

module.exports = function(db, mongoose){
    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model('Form', FormSchema);

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

// form function definitons
    function createFormForUser(userId, form){
        var deferred = q.defer();

        FormModel.create(form, function (err, doc) {

            if (!err) {
                // resolve promise
                deferred.resolve(doc);

            } else {
                // reject promise if error
                deferred.reject(err);
            }

        });


        FormModel
            .update (
                {userId: userId},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );

        return deferred.promise;



       console.log("createFormForUser");
       console.log(userId);
       console.log(form);
        form.userId = userId;

forms.push(form);
        console.log(form);
        return form;
}

    function findAllFormsByUserId(userId) {
        var deferred = q.defer();
        // find retrieves all matching documents
        FormModel.find(

            // first argument is predicate
            { userId: userId},

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });



        return deferred.promise;



    }



    function findFormById(formId) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });
        return deferred.promise;

    }


    function deleteFormById(formId) {
        var deferred = q.defer();
        FormModel
            .remove (
                {_id: formId},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }


    function updateFormById(formId, form) {
        var deferred = q.defer();
        FormModel
            .update (
                {_id: formId},
                {$set: form},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;

    }

    // field munction definitons
    function createFieldForForm(formId, field) {
        console.log("in forms model for create field function");
        console.log()
        for (var i in forms) {

            if (forms[i]._id == formId) {

                if(!forms[i].fields) {
                    forms[i].fields = [];
                }

                forms[i].fields.push(field);
                console.log(forms[i].fields);
                console.log("end of create field function");
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

        for (var i in forms) {

            if (forms[i]._id === formId) {

                for (var j in forms[i].fields) {

                    if (forms[i].fields[j]._id === fieldId) {

                        forms[i].fields[j] = field;

                        return field;
                    }
                }
            }
        }
    }

    function deleteFieldByFieldIdAndFormId(formId, fieldId) {
        console.log("delete field in model");
        console.log(formId);
        console.log(fieldId);

        for (var i in forms) {
            console.log("compare");
console.log("forms.id in loop:"+forms[i]._id);
            console.log("form id:"+formId);
            if (forms[i]._id == formId) {

                for (var j in forms[i].fields) {
                    console.log("compare");
                    console.log("field id in loop:"+forms[i].fields[j]._id);
                    console.log("field id:"+fieldId);


                    if (forms[i].fields[j]._id == fieldId) {

                        forms[i].fields.splice(j,1);
                    }
                }
            }
        }
    }

}
