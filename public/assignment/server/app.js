/**
 * Created by anvitasurapaneni on 3/16/16.
 */
module.exports = function(app) {

    // pass db and mongoose reference to model
    var userModel = require("./models/user.model.js")();
    var service = require("./services/user.service.server.js")(app, userModel);

}