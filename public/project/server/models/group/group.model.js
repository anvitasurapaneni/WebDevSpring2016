/**
 * Created by anvitasurapaneni on 4/15/16.
 */

// var notebooks = require("./notebook.mock.json");
var q = require("q");
module.exports = function(db, mongoose, UserModel) {
    var GroupSchema = require("./group.schema.server.js")(mongoose);
    var Group = mongoose.model('Group', GroupSchema);

    var User = UserModel.getMongooseModel();

    var api = {
        createGroupForUser: createGroupForUser,
        findGroupById :findGroupById,
        addMemberToGroup: addMemberToGroup,
        deleteMemberFromGroup: deleteMemberFromGroup,
        findAllGroups: findAllGroups,
        userIsAdminOfGroup: userIsAdminOfGroup
    };

    return api;

    function userIsAdminOfGroup(adminId){

        return User.findById(adminId);
    }

    function findAllGroups(){

        return Group.find();
    }

    function deleteMemberFromGroup(userId, groupId) {
        return Group.update(
            { _id: groupId },
            { $pull: { 'members': { _id : userId } } }
        );
    }

    function addMemberToGroup(member, groupId){

         console.log("server group model step2");
         console.log(member);
         console.log(groupId);

        return   Group.findById(groupId)
            .then(
                function(group){
                    //console.log("member before pushing");
                    //console.log(member._id);
                    //var userId = member._id;
                    //var user1 = User.findById(userId);
                    //console.log("test user 1");
                    //console.log(user1);

                    group.members.push(member);

                    console.log("member pushed");

                    return group.save();

                }
            );
    }



    function findGroupById(groupId){

        var deferred = q.defer();

        Group.findById(groupId, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }



    function createGroupForUser(group) {
        var deferred = q.defer();
         Group.create(group, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

};
