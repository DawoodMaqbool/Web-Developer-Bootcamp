const bcrypt = require("bcrypt");

exports.hashPassword = async(passwordHash)=> { //function to hash password
    try{
        const salt = await bcrypt.genSalt(10); //Generate salt with value 10
        let pass = await bcrypt.hash(passwordHash, salt); //hashing password according to salt
        return pass;
    }
    catch(err){
        console.log(err)
    }
};