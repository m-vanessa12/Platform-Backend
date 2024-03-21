const express = require('express');
const router = express.Router();
const Likes = require('../models/Likes.js');

// Define route handler for liking or unliking a discussion
const likes = async (req, res, next) => {
    const { discussionId, userId } = req.body;
    try {
        // Check if the user has already liked the discussion
        const existingLike = await Likes.findOne({ discussion: discussionId, user: userId });

        if (existingLike) {
            // If the user has already liked, remove the like (unlike)
            await Likes.deleteOne({ _id: existingLike._id });
        } else {
            // If the user hasn't liked yet, add a new like
            const like = new Likes({ discussion: discussionId, user: userId });
            await like.save();
        }

        // Count total likes for the discussion
        const updatedLikesCount = await Likes.countDocuments({ discussion: discussionId });
        res.status(200).json({ success: true, likes: updatedLikesCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Error' });
    }
};

module.exports = {
    likes
};
