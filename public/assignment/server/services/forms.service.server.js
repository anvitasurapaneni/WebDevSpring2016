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
        formModel.findAllFormsByUserId(userId)
    .then (
            function (forms1) {
                res.json (forms1);
            },
            function (err) {
                res.status(400).send(err);
            }
        );

    }

    function createFormForUser (req, res) {

        var form = req.body;
        var userId = req.params.userId;

       // form.userId = userId;

       // form._id = uuid.v4();

        formModel.createFormForUser(userId, form);
                formModel.findAllFormsByUserId(userId)
                    .then (
                        function (forms2) {
                            res.json (forms2);
                        },
                        function (err) {
                            res.status(400).send(err);
                        }
                    );
    }


    function findAllForms(req, res) {
 formModel.findAllForms() .then (
    function (forms1) {
        res.json (forms1);
    },
    function (err) {
        res.status(400).send(err);
    }
);
   //     res.json(forms1);
    }

    function findFormById(req, res) {

        var formId = req.params.formId;
 formModel.findFormById(formId) .then (
    function (forms1) {
        res.json (forms1);
    },
    function (err) {
        res.status(400).send(err);
    }
);
    }

    function updateFormById(req, res) {

        var formId = req.params.formId;
        var form = req.body;

      formModel.updateFormById(formId, form).then (
          function (forms1) {
              res.json (forms1);
          },
          function (err) {
              res.status(400).send(err);
          }
      );


    }

    function deleteFormById(req, res) {

        var formId = req.params.formId;

        formModel.deleteFormById(formId).then (
            function (forms1) {
                res.send(200);
            },
            function (err) {
                res.status(400).send(err);
            }
        );


    }

};



