/**
 * Created by anvitasurapaneni on 4/15/16.
 */


(function(){
    angular
        .module("NoteSpace")
        .controller("GroupController", GroupController);

    function GroupController(UserService, $rootScope, $location){

        var vm = this;
        vm. userToComapreId = 1;
        vm.createGroupForUser = createGroupForUser;
        vm.addMemberToGroup = addMemberToGroup;
        vm.deleteMemberFromGroup = deleteMemberFromGroup;





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

        function deleteMemberFromGroup($index) {
          //  console.log("client side remove member from group called");

            var userId = vm.currentGroup.members[$index]._id;
           var groupId = $rootScope.currentGroup._id;
            console.log("userId ID"+userId);
            console.log("groupId ID"+groupId);

            UserService.deleteMemberFromGroup(userId, groupId).then(function (response) {
                console.log("remove member response");
                console.log(response);

                if(response == "OK") {
                    console.log(response);

                    getCurrentGroup();
                }
            });
        }



        function getCurrentGroup(){
            UserService.getGroupById($rootScope.currentGroup._id)
                .then(function (response) {
                    console.log("returned group");
                    console.log(response.data);
               vm.currentGroup = response.data;
                    $rootScope.currentGroup = response.data;


            });
        }

        function addMemberToGroup(user){
          //  console.log("add member client side1");
          //  console.log(user);
         //   console.log($rootScope.currentGroup._id);
         //    console.log("username"+user.username);
            vm.userToComapreId = user._id;
            console.log("compARAble user Id"+user._id);
            console.log(user);
            if(isUserAlreadyThere()){
                alert("can not add same user again");
            }

else{
            UserService.addMemberToGroup(user, $rootScope.currentGroup._id);
            getCurrentGroup();
            }

        }

        function isUserAlreadyThere(user){
            var existingUsers = $rootScope.currentGroup.members;

            for(i=0; i<existingUsers.length; i++){
                console.log("compare");
                console.log(existingUsers[i]._id);
                console.log(vm.userToComapreId);
                if (existingUsers[i]._id == vm.userToComapreId){
                   return true;
                }

            }
         return false;
        }


        function createGroupForUser(group){

            if (group != -1){

                var newGroup = {
                    //   "_id": (new Date).getTime(),
                    "title": group.title,
                    "adminId": $rootScope.currentUser._id
                };
                console.log(newGroup);


                UserService.createGroupForUser(newGroup).then(function (response) {
                    if(response) {
                        console.log("new group response");
                        console.log(response);
                        vm.currentGroup = response.data;
                        $rootScope.currentGroup = response.data;

                        init();
                    }
                });


            }}


        // event handlers implementation









    }
})();

