const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Mentor } = require('../models/Mentor');

// Route to get information of a single mentor by ID
const mentorInfo = async (req, res) => {
    try {
        const { mentorId } = req.params;

        // Ensure mentorId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(mentorId)) {
            return res.status(400).json({ message: 'Invalid mentor ID' });
        }

        // Fetch the mentor profile for the provided mentorId and populate the user field
        const mentorProfile = await Mentor.findById(mentorId).populate('user');

        if (!mentorProfile) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        // Access the user's information from the populated user field
        const user = mentorProfile.user;
        const response = {
            _id: mentorProfile._id,
            firstName: user.firstName, 
            lastName: user.lastName, // Access the mentor's name
            role: user.role, // Access the mentor's role
            phoneNumber: mentorProfile.phoneNumber,
            country: mentorProfile.country,
            city: mentorProfile.city,
            position: mentorProfile.position,
            company: mentorProfile.company,
            fieldOfStudy: mentorProfile.fieldOfStudy,
            industry: mentorProfile.industry,
            yearsExperience: mentorProfile.yearsExperience,
            qualifications: mentorProfile.qualifications,
            bio: mentorProfile.bio,
            photo: mentorProfile.photo
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Error' });
    }
};

module.exports = {
    mentorInfo
};
