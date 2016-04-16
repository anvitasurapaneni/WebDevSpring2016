/**
 * Created by anvitasurapaneni on 4/15/16.
 */

// var notebooks = require("./notebook.mock.json");
var q = require("q");
module.exports = function(db, mongoose) {
    var GroupSchema = require("./group.schema.server.js")(mongoose);
    var Group = mongoose.model('Group', GroupSchema);

    var api = {
        createGroupForUser: createGroupForUser
    };

    return api;


    function createGroupForUser(group) {
        return Group.create(group);
    }

};
