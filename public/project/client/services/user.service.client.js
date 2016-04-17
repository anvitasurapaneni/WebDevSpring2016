/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("NoteSpace")
        .factory("UserService", UserService);

    function UserService($http, $rootScope, $q){

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findNoteLikes: findNoteLikes,
            removeLikedNote: removeLikedNote,
            isNoteFavForUser: isNoteFavForUser,
            createGroupForUser: createGroupForUser,
            addMemberToGroup: addMemberToGroup,
            getGroupById: getGroupById,
            deleteMemberFromGroup: deleteMemberFromGroup,
            findAllGroups: findAllGroups

        };

        return api;

        function findAllGroups(){

            return $http.get("/api/project/group");
        }

        function deleteMemberFromGroup(userId, groupId) {

            var deferred = $q.defer();

            var url = "/api/project/user/:userId/group/:groupId";
            url = url.replace(":userId", userId);
            url = url.replace(":groupId", groupId);

            $http.delete(url).success(function(response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }


        function getGroupById(groupId){

            return $http.get("/api/project/user/group/"+groupId);
        }

        function addMemberToGroup(user, groupId){


            console.log("Adding member!");
            console.log(user);
            return $http.post("/api/project/group/"+groupId+"/member",user);
        }

        function createGroupForUser(group){
            return $http.post("/api/project/group/user",group);
        }


        function isNoteFavForUser(userId, noteId){

            return $http.get("/api/project/user/"+userId+"/note/"+noteId+"/favorite");
        }

        function removeLikedNote(userId, noteId){

            return $http.delete("/api/project/user/"+userId+"/note/"+noteId);
        }

        function getCurrentUser() {

            return $http.get("/api/project/user/loggedin");

        }

        function setCurrentUser(user) {

            $rootScope.currentUser = user;
        }

        function findUserByCredentials(username, password){

            return $http.get("/api/project/user?username="+username+"&password="+password);
        }

        function findAllUsers(){

            return $http.get("/api/project/user");
        }

        function findUserByUsername(username){

            return $http.get("/api/project/user?username="+username);
        }

        function createUser(user){

            return $http.post("/api/project/user",user);
        }

        function deleteUserById(userId) {

            return $http.delete("/api/project/user/"+userId);
        }

        function updateUser(userId, user){

            return $http.put("/api/project/user/"+userId, user);
        }
        function findUserById(userId){

            return $http.get("/api/project/user/"+userId);
        }

        function findNoteLikes(userId){

            return $http.get("/api/project/user/"+userId+"/notes", findNoteLikes);
        }



    }
})();
