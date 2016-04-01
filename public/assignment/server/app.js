/**
 * Created by anvitasurapaneni on 3/16/16.
 */
module.exports = function(app, uuid, db, mongoose) {

    // pass db and mongoose reference to model
    var userModel = require("./models/user.model.js")(db, mongoose);
    var formModel = require("./models/forms.model.js")(db, mongoose);
    var fieldModel = require("./models/fields.model.js")(db, mongoose,formModel);
    var service = require("./services/user.service.server.js")(app, userModel, uuid);
    var formService = require("./services/forms.service.server.js")(app, formModel, uuid);
    var fieldService = require("./services/fields.service.server.js")(app, fieldModel, uuid);
}