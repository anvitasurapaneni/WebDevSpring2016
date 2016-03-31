/**
 * Created by anvitasurapaneni on 3/30/16.
 */

module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        fields:[],
        created: Date,
        updated: Date
        // collection property set
        // collection name to 'user'
    }, {collection: 'assignment.form'});
    return FormSchema;
};
