/**
 * Created by anvitasurapaneni on 3/18/16.
 */

"use strict";

module.exports = function (app, fieldModel, uuid) {
    console.log("is it going to server services for fields");


    app.post("/api/assignment/form/:formId/field", createFormField);

    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);

    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdAndFormId);

    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFieldIdAndFormId);

    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldIdAndFormId);

    function createFormField(req, res){
        console.log("creating field");

        var field = req.body;
        var formId = req.params.formId;
        console.log(field);
        console.log(formId);


        fieldModel.createFieldForForm(formId, field)
            .then (
                function (form) {
                    console.log(form);
                    res.json (form);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function findAllFieldsForForm(req, res){
        var formId = req.params.formId;
        //var forms = formModel.findAllFormsByUserId(userId);
        fieldModel.findAllFieldsForForm(formId)
            .then (
                function (form) {
                    console.log("in then");

                    res.json (form.fields);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }




    function findFieldByFieldIdAndFormId(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        //var forms = formModel.findAllFormsByUserId(userId);
        fieldModel.findFieldByFieldIdAndFormId(formId, fieldId)
            .then (
                function (field1) {
                    res.json (field1);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }


        function updateFieldByFieldIdAndFormId(req, res){
            console.log("updating field");

            var formId = req.params.formId;
            var fieldId = req.params.fieldId;
            var field = req.body;
            console.log(formId);
            console.log(fieldId);
            console.log(field);


            fieldModel.updateFieldByFieldIdAndFormId(fieldId, formId, field)
                .then (
                function (field) {
                    console.log(field);
                    res.json (field);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );


        }



        function deleteFieldByFieldIdAndFormId(req, res){

            var formId = req.params.formId;
            var fieldId = req.params.fieldId;

            fieldModel.deleteFieldByFieldIdAndFormId(formId, fieldId)
                .then (
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );


        }

}
