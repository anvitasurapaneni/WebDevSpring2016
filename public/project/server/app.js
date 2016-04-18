module.exports = function(app, uuid, db, mongoose) {
    var UserModel   = require("./models/user/user.model.js")(db, mongoose);

    var GroupModel   = require("./models/group/group.model.js")(db, mongoose, UserModel);

    var NoteModel = require("./models/note/note.model.js")(db, mongoose, UserModel);

    var NotebookModel = require("./models/notebook/notebook.model.js")(db, mongoose, NotebookModel);

    var WidgetModel = require("./models/widgets/widget.model.server.js")(db, mongoose, NoteModel);

    var GroupService = require("./services/group.service.server.js")(app, GroupModel, UserModel, uuid);

    var UserService = require("./services/user.service.server.js")(app, UserModel, NoteModel, uuid);

    var NoteService = require("./services/note.service.server.js")(app, NoteModel, NotebookModel, UserModel, uuid);

    var WidgetService = require("./services/widget.service.server.js")(app, WidgetModel, uuid);



};