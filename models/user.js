const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    avtar:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
},{
    versionKey:false
});

const User = mongoose.model("User",userSchema);

module.exports = {
    User
}