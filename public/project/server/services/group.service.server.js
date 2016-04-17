/**
 * Created by anvitasurapaneni on 4/15/16.
 */

module.exports = function(app,GroupModel, UserModel, uuid){

    app.post("/api/project/group/user", createGroupForUser);
    app.post("/api/project/group/:groupId/member", addMemberToGroup);
    app.get("/api/project/user/group/:groupId", findGroupById);
    app.delete("/api/project/user/:userId/group/:groupId", deleteMemberFromGroup);
    app.get("/api/project/group", findAllGroups);



function findAllGroups(req, res){
    GroupModel.findAllGroups()
        .then(
            function (doc) {

                res.json(doc);
            },

            // send error if promise rejected
            function ( err ) {
                res.status(400).send(err);
            }
        );
}

    function deleteMemberFromGroup(req, res){

        var userId = req.params.userId;
        var groupId = req.params.groupId;

        GroupModel.deleteMemberFromGroup(userId, groupId)
            .then (
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );


    }



function findGroupById(req, res){

    var groupId = req.params.groupId;
    GroupModel.findGroupById(groupId)
.then(
        function (doc) {

            res.json(doc);
        },

        // send error if promise rejected
        function ( err ) {
            res.status(400).send(err);
        }
    );
}

    function addMemberToGroup(req, res){
        console.log("addMemberToGroup server1");

        var user = req.body;
        var groupId = req.params.groupId;
        console.log("user server side 1");
        console.log(user);
        console.log(groupId);


        GroupModel.addMemberToGroup(user, groupId).then(
            function (doc) {
                //console.log(doc);
                res.json(doc);
            },

            // send error if promise rejected
            function ( err ) {

                res.status(400).send(err);
            }
        );




    }


    function createGroupForUser(req,res){

        var group = req.body;
        var adminId = group.adminId;
        var groupId;


         GroupModel.createGroupForUser(group)
             .then(
                 function (doc) {
                     groupId = doc._id;
                     console.log("doc");
                     console.log(groupId);
                     return GroupModel.userIsAdminOfGroup(adminId);

                 }
             )
             .then(
                 function (user) {
                     user.userIsAdminOfGroup = groupId;
                     user.save();

                     res.json(user);
                 }
             );





    }


};
