/**
 * Created by anvitasurapaneni on 4/15/16.
 */

(function(){
    angular
        .module("NoteSpace")
        .controller("ShareNoteController", ShareNoteController);

    function ShareNoteController( UserService, NoteService, $routeParams, $rootScope, $location) {
        var vm = this;
        vm.shareNoteWithUser = shareNoteWithUser;


        function init() {
            //console.log("Init");
            noteId = $routeParams.noteId;
            vm.noteId = noteId;

            NoteService.findNoteById(noteId)
                .then(
                    function(response){
                        //console.log(response);
                        vm.noteToBeShared = response.data;
                    }
                );

            UserService.findAllUsers()
                .then(function (foundUsers) {

                    vm.toShareUsers = foundUsers.data;
                    vm.$location = $location;
                    console.log(vm.toShareUsers);
                });


        }
        init();

        function shareNoteWithUser(note, user){
            console.log(note);
            console.log(user);
            console.log(user._id);
            NoteService.shareNoteWithUser(note, user._id).then(function (response) {
                console.log("response");


            });

        }



    }
})();
