module.exports = async(app) => {

    var mongoose = require('mongoose');
    mongoose.connect('mongodb+srv://user:cq8raK4jHEo2JngM@wrg-y3jqo.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
    var User = require('../models/user');



    function saveUser(user) {
        User(user).save((err) => {
            if (err) console.log(err);
            else console.log('saved user');
        })
    }










    //module.exports.saveUser = saveUser;

}