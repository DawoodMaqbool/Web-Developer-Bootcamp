const bcrypt = require("bcrypt");


exports.comparePassword = async(oldPassword, currentPassword) => { //function to compare old Password with currently entered password
    try{
        const validPassword = await bcrypt.compare(oldPassword,currentPassword);
        return validPassword;
    }
    catch(err){
        console.log(err)
    }
};