const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const { Mentee } = require('../models/Mentee');

// Route to get information of a single mentee by ID
const menteeInfo = async (req, res) => {
    //console.log('Mentee info route hit'); // Add this line to debug
    //console.log('Requested menteeId:', req.params.menteeId); 
    try {
        const { menteeId } = req.params;

        // Ensure menteeId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(menteeId)) {
            return res.status(400).json({ message: 'Invalid mentee ID' });
        }

        // Fetch the mentee profile for the provided menteeId and populate the user field
        const menteeProfile = await Mentee.findById(menteeId).populate('user');
        //console.log('Mentee profile from database:', menteeProfile);

        if (!menteeProfile) {
            return res.status(404).json({ message: 'Mentee not found' });
        }

        // Access the user's information from the populated user field
        const user = menteeProfile.user;
        const response = {
            _id: menteeProfile._id,
            firstName: user.firstName, 
            lastName: user.lastName,  // Access the user's name
            role: user.role, // Access the user's role
            phoneNumber: menteeProfile.phoneNumber,
            country: menteeProfile.country,
            city: menteeProfile.city,
            universityName: menteeProfile.universityName,
            degreeType: menteeProfile.degreeType,
            fieldOfStudy: menteeProfile.fieldOfStudy,
            skills: menteeProfile.skills,
            interests: menteeProfile.interests,
            photo: menteeProfile.photo
        };

        res.status(200).json(response);
        //console.log('Response to frontend:', response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Error' });
    }
};

module.exports = {
    menteeInfo
};
