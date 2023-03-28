const mongoose = require('mongoose');

module.exports = function (){
    mongoose.connect('mongodb+srv://Learning_Mongo:IFxsTjH4DT0vauUu@cluster0.ezggn.mongodb.net/dummyData') //To establish connection to Database.
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('COuld not connect to MongoDB...', err))
};