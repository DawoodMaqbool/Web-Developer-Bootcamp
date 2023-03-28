const Joi = require('joi');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({//Schema for Users
    name: { //name should be of type string and can not be left blank.
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: { //email should be of type string, unique, and can not be left blank.
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: { //password should be of type string and can not be left blank.
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    token:{ //token should be of type string.
        type:String
      }

});
/*
userSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
});

function validateUser(user){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user, schema);
};
*/
module.exports = mongoose.model('User', userSchema);
//module.exports.User = User;
//module.exports.validate = validateUser;