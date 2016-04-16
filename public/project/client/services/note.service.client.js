/**
 * Created by paulomimahidharia on 3/25/16.
 */
"use strict";
(function(){
    angular
        .module("NoteSpace")
        .factory("NoteService", NoteService);

    function NoteService($http, $rootScope, $q) {
        var api = {
            //Note services
            userLikesNote: userLikesNote,
            findAllNotesLikedByUser: findAllNotesLikedByUser,
            deleteNoteById: deleteNoteById,
            findAllNotesForUser: findAllNotesForUser,
            //selectNoteById: selectNoteById,
            updateNoteById: updateNoteById,
            createNoteForUser: createNoteForUser,
            findNoteById: findNoteById,
            removeLikedUser: removeLikedUser,

            //Notebook services
            deleteNotebookById: deleteNotebookById,
            selectNoteBookById: selectNoteBookById,
            updateNoteBookById: updateNoteBookById,
            addNoteBookForUser: addNoteBookForUser,
            findAllNoteBooksForUser: findAllNoteBooksForUser,


            // share

            findAllNotesReceivedByUser: findAllNotesReceivedByUser,
            shareNoteWithUser: shareNoteWithUser,
            deleteReceivedNoteForUser: deleteReceivedNoteForUser

        };

        return api;

        function findAllNotesReceivedByUser(userId){
            return $http.get("/api/project/user/"+userId+"/note");
             //   return $http.get("/api/project/user/"+userId+"/note/received");
        }

        function shareNoteWithUser(note, userId){


                var deferred = $q.defer();

                var url = "/api/project/user/share/:userId/note";
                url = url.replace(":userId", userId);

                $http.post(url, note).success(function(response) {

                    deferred.resolve(response);
                });

                return deferred.promise;

        }

        function deleteReceivedNoteForUser(noteId, userId){

            var deferred = $q.defer();

            var url = "/api/project/user/share/:userId/note/:noteId";
            url = url.replace(":userId", userId);
            url = url.replace(":noteId", noteId);

            $http.delete(url).success(function(response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }



        function removeLikedUser(userId, noteId){

            return $http.delete("/api/project/user/"+userId+"/note/"+noteId);
        }

        function userLikesNote(userId, note){
            return $http.post("/api/project/user/"+userId+"/note/"+note._id, note);
        }

        function userReceivesNote(userId, note){
            return $http.post("/api/project/user/"+userId+"/note/receive/"+note._id, note);
        }


        function findAllNotesLikedByUser(userId){
            return $http.get("/api/project/user/"+userId+"/note/liked");
        }

        function deleteNoteById(noteId) {
           //console.log(noteId);
           return $http.delete("/api/project/note/"+noteId);
        }

        function findAllNotesForUser(userId){
            return $http.get("/api/project/user/"+userId+"/note");
        }

        function findNoteById(noteId){
            return $http.get("/api/project/note/"+noteId);
        }

        function findAllNoteBooksForUser(userId){
            return $http.get("/api/project/user/"+userId+"/notebook");
        }

        function updateNoteById(noteId, newNote){
            //console.log(newNote);
            return $http.put("/api/project/note/"+noteId, newNote);
        }

        function createNoteForUser(userId, newNote){
            //console.log("gcdng");
            return $http.post("/api/project/user/"+userId+"/note", newNote);
        }

        /*function removeNoteLikes(userId, noteId){

            return $http.delete("/api/project/user/"+userId+"/note/"+noteId);
        }*/



        ////////////////////////////////////////////////////////////////////
        function deleteNotebookById(NBId){
            console.log(NBId);
            return $http.delete("/api/project/notebook/"+NBId);

        }

        function selectNoteBookById(NBId){
            return $http.get("/api/project/notebook/"+NBId);
        }

        function updateNoteBookById(NBId, newNB){
            return $http.put("/api/project/notebook/"+NBId, newNB);

        }

        function addNoteBookForUser(userId,newNB){
            return $http.post("/api/project/user/"+userId+"/notebook/", newNB);
        }

    }
})();