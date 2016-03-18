/**
 * Created by anvitasurapaneni on 3/17/16.
 */
/**
 * Created by anvitasurapaneni on 3/16/16.
 */

module.exports = function(app, formModel, uuid) {

    console.log("is it going to server services for forms");
    //   app.get("/api/assignment/user?username=alice&password=alice",
    // findAllUsers1);
    app.get("/api/assignment/user/:userId/form", findAllformsForUser);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);


    function findAllformsForUser(req, res) {
        var userId = req.params.userId;
        //var forms = formModel.findAllFormsByUserId(userId);
        res.json(formModel.findAllFormsByUserId(userId));
    }

    function createFormForUser (req, res) {

        var form = req.body;
        var userId = req.params.userId;

       // form.userId = userId;
        form._id = parseInt(uuid.v4(), 16);
       // form._id = uuid.v4();

        formModel.createFormForUser(userId, form);
        var formsOfUser = formModel.findAllFormsByUserId(userId);
        res.json(formsOfUser);
    }


    function findAllForms(req, res) {
var forms1 = formModel.findAllForms();
        res.json(forms1);
    }

    function findFormById(req, res) {

        var formId = req.params.formId;
var formWithId = formModel.findFormById(formId);
        res.json(formWithId);
    }

    function updateFormById(req, res) {

        var formId = req.params.formId;
        var form = req.body;

      var forms2 =  formModel.updateFormById(formId, form);

        res.json(forms2);
    }

    function deleteFormById(req, res) {

        var formId = req.params.formId;

        formModel.deleteFormById(formId);

        res.send(200);
    }

};



