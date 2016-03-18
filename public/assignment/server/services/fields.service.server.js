/**
 * Created by anvitasurapaneni on 3/18/16.
 */

"use strict"

module.exports = function (app, formModel, uuid) {
    console.log("is it going to server services for fields");



     app.post("/api/assignment/form/:formId/field", createFormField);

    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);

    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdAndFormId);

     app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFieldIdAndFormId);

     app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldIdAndFormId);

    function createFormField (req, res) {
        console.log("create form fields is being called");

        var field = req.body;
        console.log("fields and formID")
        console.log(field);

        var formId = parseInt(req.params.formId);
        console.log(formId);

        field._id = parseInt(uuid.v4(), 16);
        console.log("field with ID");
        console.log(field);

        formModel.createFieldForForm(formId, field);
var fieldsOfForms = formModel.findAllFieldsForForm(formId);
        res.json(fieldsOfForms);
    }

    function findAllFieldsForForm(req, res) {

        var formId = parseInt(req.params.formId );

var fieldsOfForms1 = formModel.findAllFieldsForForm(formId);
        res.json(fieldsOfForms1);
    }

    function findFieldByFieldIdAndFormId(req, res) {

        var formId = parseInt(req.params.formId, 16);
        var fieldId = parseInt(req.params.fieldId, 16   );
var field1 = formModel.findFieldByFieldIdAndFormId(formId, fieldId);
        res.json(field1);
    }

    function updateFieldByFieldIdAndFormId (req, res) {

        var formId = parseInt(req.params.formId, 16);
        var fieldId = parseInt(req.params.fieldId, 16);
        var field = req.body;

        res.send(200);
    }

    function deleteFieldByFieldIdAndFormId (req, res) {
        console.log("reached delete field server side");

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        console.log("form ID server side"+formId);
        console.log(fieldId);

        formModel.deleteFieldByFieldIdAndFormId(formId, fieldId);

        res.send(200);
    }

}
