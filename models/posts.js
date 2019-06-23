var mongoose = require('mongoose');

module.exports = mongoose.model('posts', {
    _id: Number,
    userId: Number,
    title: String,
    body: String,
    category: Number,
    sub_category: Number,
    time: { type: Date, default: Date.now },

    replies: []
});