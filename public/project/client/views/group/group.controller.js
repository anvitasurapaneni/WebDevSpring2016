/**
 * Created by anvitasurapaneni on 4/15/16.
 */


(function(){
    angular
        .module("NoteSpace")
        .controller("GroupController", GroupController);

    function GroupController(UserService, $rootScope, $location){

        var vm = this;




        function init() {
            console.log("group controller");


            UserService.findAllUsers()

                .then(function (allUsers){
                    vm.allusers =  allUsers.data;
                    console.log(vm.allusers);
                    vm.$location = $location;
                })




        }
        init();

        // event handlers implementation









    }
})();

