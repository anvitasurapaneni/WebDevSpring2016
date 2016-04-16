/**
 * Created by anvitasurapaneni on 4/15/16.
 */
module.exports = function(mongoose) {

    var UserSchema = require("../note/note.schema.server.js")(mongoose);

    // use mongoose to declare a user schema
    var GroupSchema = mongoose.Schema({
        title: String,
        adminId: String,
        members: [UserSchema]

    }, {collection: 'project.group'});

    return GroupSchema;
};
