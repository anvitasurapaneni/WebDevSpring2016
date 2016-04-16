/**
 * Created by anvitasurapaneni on 4/15/16.
 */


(function(){
    angular
        .module("NoteSpace")
        .controller("GroupController", GroupController);

    function GroupController(UserService, $rootScope, $location){

        var vm = this;
        vm.createGroupForUser = createGroupForUser;




        function init() {
            console.log("group controller");
            console.log($rootScope.currentUser);


            UserService.findAllUsers()

                .then(function (allUsers){
                    vm.allusers =  allUsers.data;
                    console.log(vm.allusers);
                    vm.$location = $location;
                })




        }
        init();

        function createGroupForUser(group){

            if (group != -1){

                var newGroup = {
                    //   "_id": (new Date).getTime(),
                    "title": group.title,
                    "adminId": $rootScope.currentUser._id
                };
                console.log(newGroup);


                UserService.createGroupForUser(newGroup)
                    .then(function (response) {
                        if(response) {

                            init();
                        }
                    });

            }}


        // event handlers implementation









    }
})();

