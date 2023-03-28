const mongoose = require('mongoose');

const bootcampSchema = new mongoose.Schema({ //Schema for bootcamps
    name:{ //name should be of type string and can not be left blank.
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    }
    
});

module.exports = mongoose.model('Bootcamp', bootcampSchema);
