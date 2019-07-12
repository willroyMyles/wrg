var mongoose = require('mongoose');

module.exports = mongoose.model('replies', {
    _id: Number,
    postId: Number,
    userId: Number,
    body: String,
    time: { type: Date, default: Date.now },
});