const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    discussion: { type: mongoose.Schema.Types.ObjectId, ref: 'Discussion' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // Other fields if needed, such as timestamps
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
