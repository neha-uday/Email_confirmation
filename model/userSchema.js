const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    user:{
    email:{type: String,
           unique: true},
    password : {type: String},
    secretToken: {type: String}
}

});

const User = mongoose.model('user', userSchema);
module.exports = User;


