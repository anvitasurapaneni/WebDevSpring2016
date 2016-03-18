/**
 * Created by anvitasurapaneni on 3/16/16.
 */
module.exports = function(app, uuid) {

    // pass db and mongoose reference to model
    var userModel = require("./models/user.model.js")();
    var formModel = require("./models/forms.model.js")();
    var service = require("./services/user.service.server.js")(app, userModel, uuid);
    var formService = require("./services/forms.service.server.js")(app, formModel, uuid);
    var fieldService = require("./services/fields.service.server.js")(app, formModel, uuid);
}