/**
 * Created by anvitasurapaneni on 3/29/16.
 */

module.exports = function(mongoose) {

            // use mongoose to declare a user schema
               var UserSchema = mongoose.Schema({
                   firstName: String,
                   lastName: String,
                   username: String,
                   password: String,
                   roles: [String],
                   email: [String],
                   phones: [String]
                    // collection property set
                    // collection name to 'user'
           }, {collection: 'assignment.user'});
       return UserSchema;
    };
