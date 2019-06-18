module.exports = async(app) => {

    var mongoose = require('mongoose');
    mongoose.connect('mongodb+srv://user:cq8raK4jHEo2JngM@wrg-y3jqo.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
    var User = require('../models/user');

    var currentUser;

    console.log(await User.collection.estimatedDocumentCount())

    async function login(body) {
        await User.findOne({ username: body.username, password: body.password }, (err, res) => {
            currentUser = res;
        });
        return currentUser;
    }
    async function logout() {
        currentUser = null;
    }

    async function saveUser(body) {
        var Id = await User.collection.estimatedDocumentCount() + 1;
        var user = {
            username: body.username,
            password: body.password,
            posts: null,
            _id: Id
        };
        User.findOne({ username: body.username, password: body.password }, (err, res) => {
            console.log(res);
            if (res) return false;
            else {
                User(user).save((err) => {
                    if (err) console.log(err);
                    return true;

                });
            }
        });

    }










    module.exports.saveUser = saveUser;
    module.exports.login = login;

}