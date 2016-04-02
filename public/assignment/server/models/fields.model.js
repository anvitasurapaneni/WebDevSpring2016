/**
 * Created by anvitasurapaneni on 3/31/16.
 */

var q = require("q");

module.exports = function(db, mongoose, formModel) {

    var FormModel = formModel.getMongooseModel();

    var api = {


        // field functions

        createFieldForForm: createFieldForForm,
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldByFieldIdAndFormId: findFieldByFieldIdAndFormId,
        updateFieldByFieldIdAndFormId: updateFieldByFieldIdAndFormId,
        deleteFieldByFieldIdAndFormId: deleteFieldByFieldIdAndFormId

    };
    return api;


// field munction definitons
    function createFieldForForm(formId, field) {
        console.log(formId);
 return   formModel.findFormById(formId)
    .then(
        function(form){
            form.fields.push(field);
           return form.save();
            //console.log("Returning a form");
            //console.log(form);
            //var returnForm = form;
            //return returnForm;
        }
    );
    }

    function findAllFieldsForForm(formId) {

        return FormModel.findById(formId).select("fields");
    }

    function findFieldByFieldIdAndFormId(formId, fieldId) {
        return FormModel.find(

            // first argument is predicate
            { formId: formId,
                fieldId: fieldId},

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
    }

    function updateFieldByFieldIdAndFormId(fieldId, formId, field) {
        console.log("in field model");
        console.log(formId);
        console.log(fieldId);
        console.log(field);
        return FormModel.update(
            { _id: formId ,
                'fields._id' :fieldId} ,
            {$set : {'fields.$' : field}}
        );
    }





    function deleteFieldByFieldIdAndFormId(formId, fieldId) {
        return FormModel.update(
            { _id: formId },
            { $pull: { 'fields': { _id : fieldId } } }
        );
    }
}