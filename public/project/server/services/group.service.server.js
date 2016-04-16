/**
 * Created by anvitasurapaneni on 4/15/16.
 */

module.exports = function(app, UserModel, NoteModel,GroupModel, uuid){

    app.post("/api/project/group/user", createGroupForUser);

    function createGroupForUser(req,res){
        var group = req.body;

         GroupModel.createGroupForUser(group);
            // handle model promise

    }


};
