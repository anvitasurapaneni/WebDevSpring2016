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
        getMongooseModel: getMongooseModel



    };
    return api;


    function getMongooseModel() {
        return FormModel
    }

// form function definitons
    function createFormForUser(userId, form){
        var deferred = q.defer();

        FormModel.create(
            {userId : userId,
                title : form.title,
                created: Date.now()},function (err, doc) {

            if (!err) {
                // resolve promise
                deferred.resolve(doc);

            } else {
                // reject promise if error
                deferred.reject(err);
            }

        });


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
                {updated : Date.now()},
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


}
