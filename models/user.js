var mongoose = require('mongoose');

module.exports = mongoose.model('user', {
    _id: Number,
    username: String,
    password: String,
    posts: []
});