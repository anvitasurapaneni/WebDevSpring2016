/**
 * Created by anvitasurapaneni on 3/16/16.
 */
var initialUsers = require("./user.mock.json");
module.exports = function(){
    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };
    return api;

    function findUserByCredentials(credentials){
        console.log("find user bu credentials");
        var valiedUser = null;
        console.log(initialUsers);
        for(user in initialUsers){
            if ((initialUsers[user].password == credentials.password)
                && (initialUsers[user].username == credentials.username)){
               var valiedUser = initialUsers[user];
                break;
            }
        }
        return(valiedUser);

    }

    function findAllUsers(){
  return(initialUsers);
 }

    function createUser(user){
console.log("user at model for create user");
console.log(user);

     var   newuser = {
            "_id": user._id,
            "username": user.username,
            "password": user.password,
            "email": user.email
        };

        initialUsers.push(newuser);
        console.log("initial users");
        console.log(initialUsers);
        return(newuser);

    }


    function deleteUserById(userId){
        var index = null;
        for (var user in initialUsers) {
            if (user._id == userId) {
                index = initialUsers.getItemIndex(user);
            }
        }
        initialUsers.splice(index);
        return initialUsers;

    }



    function updateUser(userId, user){
        var index = 0;
        var flag = 0;
        var newuser = {};
        for (var i = 0; i < initialUsers.length; i++) {

            if (initialUsers[i]._id == userId) {
                index = i;
                var flag = 1;
                break;
            }
        }
        console.log("update user function index" + index);
        console.log("update user function useer ID:" + userId);
        console.log("update user function useer :" + user);
        if (flag == 1) {

            newuser = {
                "_id": userId, "firstName": user.firstName, "lastName": user.lastName,
                "username": user.username, "password": user.password
            }

            initialUsers[index] = newuser;
        }
        console.log("update user function initialUsers[index] :" + initialUsers[index]);
        console.log(initialUsers[index]);
        console.log("update user function newuser :" + newuser);
        console.log(newuser);
        return newuser;

    }

}
