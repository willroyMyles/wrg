var mongoose = require('mongoose');

module.exports = mongoose.model('posts', {
    postid: Number,
    userId: Number,
    title: String,
    body: String,

    replies: []
});