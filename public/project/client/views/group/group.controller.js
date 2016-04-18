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
        vm.LeaveGroup = LeaveGroup;
        vm.deleteGroup = deleteGroup;
       // vm.renameGroup = renameGroup;
        vm.UserNames = {};


        var groupId;
        var userIsAdminGroup1 = {};
        vm.rat = "Rat";


       // vm.MemberGroups


        function init() {
            console.log("group controller");
            console.log($rootScope.currentUser);

           UserService.getAdminGroups($rootScope.currentUser._id)
               .then(function (allAdminGroups){
                   vm.AdminGroups = allAdminGroups.data;
               });

            UserService.getMemberGroups($rootScope.currentUser._id)
                .then(function (allMemberGroups){
                    vm.MemberGroups = allMemberGroups.data;
                    console.log("vm.allMemberGroups");
                    console.log(vm.MemberGroups);
                });




            UserService.findAllUsers()

                .then(function (allUsers){
                    vm.allusers =  allUsers.data;
                    console.log(vm.allusers);
                    vm.$location = $location;
                });

        }
        init();



        function getCurrentGroup(){
            UserService.getGroupById($rootScope.currentGroup._id)
                .then(function (response) {
                    console.log("returned group");
                    console.log(response.data);
                    vm.currentGroup = response.data;
                    //    $rootScope.currentGroup = response.data;

                    UserService.getMembersOfGroup(vm.currentGroup._id)
                        .then(function (response) {
                            vm.usersOfCurrentGroup = response.data;
                            console.log("users of corrent group");
                            console.log(vm.usersOfCurrentGroup);
                        });



              /*      for(i=0;i<vm.currentGroup.members.length;i++){

console.log(i);
                        UserService.findUserById(vm.currentGroup.members[i])
                            .then(function (response) {
                                vm.UserNames[i] = response.data.username;
                            });

                    } */

                    console.log(vm.UserNames);



                });
        }




        function deleteGroup($index){
            var group = vm.AdminGroups[$index];
            console.log(group._id);

            var groupId = group._id;

            UserService.deleteGroupById(groupId)
                .then(function (response) {

                    init();
                });

        }



        function LeaveGroup($index){
            var group = vm.MemberGroups[$index];
            console.log("In COnt");
            console.log(group._id);

            var userId = $rootScope.currentUser._id;

            var groupId = group._id;

            UserService.deleteCurrentMemberFromGroup(userId, groupId)
                .then(function (response) {

                console.log("remove member response");
                console.log(response);


            });


            UserService.deleteGroupFromCurrentMember(groupId, userId)
                .then(function (response) {

                    console.log("remove member response");
                    console.log(response);
                });
            init();
        }


        function deleteMemberFromGroup($index) {
          //  console.log("client side remove member from group called");

            var userId = vm.currentGroup.members[$index];
            console.log(vm.currentGroup.members[$index]);
           var groupId = $rootScope.currentGroup._id;
            console.log("userId ID"+userId);
            console.log("groupId ID"+groupId);


            UserService.deleteCurrentMemberFromGroup(userId, groupId)
                .then(function (response) {
                    console.log("res1");
                    console.log(response);



                });


            UserService.deleteGroupFromCurrentMember(groupId, userId)
                .then(function (response) {
                    console.log("res1");
                    console.log(response);
                    getCurrentGroup();
                });




        }





        function addMemberToGroup(user){

            //console.log(user);
            console.log("current groupABC");
            console.log($rootScope.currentGroup);

            //var existingUsers1 = vm.currentGroup.members;

            var userId = user._id;

            var groupId = $rootScope.currentGroup._id;

            console.log(groupId);

            console.log("index"+vm.currentGroup.members.indexOf(user._id));
            if(!(vm.currentGroup.members.indexOf(user._id) == -1)) {
                alert("can not add same user again");
            }

            else{
                UserService
                    .addMemberToGroup(userId, groupId)
                    .then(
                        function (response){
                            console.log(response);
                            console.log("Added!");

                            getCurrentGroup();
                        }
                    );}




        }

        function isUserAlreadyThere(user){
            getCurrentGroup();
            var existingUsers = vm.currentGroup.members;

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


                UserService.createGroupForUser($rootScope.currentUser._id, newGroup)
                    .then(function (response) {
                        if(response) {
                            //console.log("new group response");
                            //console.log(response.data);
                            vm.currentGroup = response.data;
                            $rootScope.currentGroup = response.data;

                            init();
                        }
                });





            }}


        // event handlers implementation









    }
})();

