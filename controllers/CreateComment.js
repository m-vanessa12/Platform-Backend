const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const Comment = require('../models/Comments'); 
const User = require('../models/User')

// Controller function for adding a comment to a discussion
const addComment = async (req, res) => {
    try {
        // Retrieve the user's ID from the request object
        const userId = req.user.id;

        // Extract other fields from the request body
        const { discussion, content } = req.body;

        // Create a new comment with the user's ID
        const newComment = new Comment({
            user: userId, // Assign the user's ID to the comment's user field
            discussion,
            content
        });

        // Save the comment to the database
        await newComment.save();

        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Error' });
    }
};

module.exports = {
    addComment
};
