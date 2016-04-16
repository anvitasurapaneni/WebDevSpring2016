/**
 * Created by anvitasurapaneni on 4/14/16.
 */

(function(){
    angular
        .module("NoteSpace")
        .controller("InboxController", InboxController);

    function InboxController(NoteService,UserService, $rootScope, $location){

        var vm = this;

        vm.deleteReceivedNoteForUser = deleteReceivedNoteForUser;


        function init() {
            console.log("inbox controller");

            UserService.findUserById($rootScope.currentUser._id)
                .then(function (user) {
                    console.log(user);

                    vm.receivedNotes = user.data.receivesNotes;


                    vm.$location = $location;
                });

            NoteService.findAllNoteBooksForUser($rootScope.currentUser._id)

                .then(function (foundNoteBooks){

                    vm.notebooks = foundNoteBooks.data;
                    vm.$location = $location;
                });

            UserService.findAllUsers()

                .then(function (allUsers){

                    vm.allusers =  allUsers.data;
                    vm.$location = $location;
                })




        }
        init();

        // event handlers implementation

        function deleteReceivedNoteForUser($index){
            console.log("client side remove field called");

            var noteId = vm.receivedNotes[$index]._id;
            console.log("noteId"+noteId);


            NoteService.deleteReceivedNoteForUser(noteId, $rootScope.currentUser._id).then(function (response) {
                console.log("remove filed response");
                console.log(response);

                if(response == "OK") {
                    init();
                }
            });
        }







    }
})();
