var mongoose = require("mongoose");
 
var commentSchema = new mongoose.Schema({
    text: String,
    // have author show up for comments without having to type their names in. So we make author an object with id and username
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            // ref is the model we're going to refer to using the object id above which is : User
            ref: "User"
        },
        username: String
    }
});
 
module.exports = mongoose.model("Comment", commentSchema);