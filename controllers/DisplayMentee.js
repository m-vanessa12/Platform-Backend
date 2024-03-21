const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { Mentee } = require('../models/Mentee');

const ProfilesOfMentee = async (req, res) => {
    try {
        // Query users with role "mentee"
        const menteeUsers = await User.find({ role: 'Mentee' });

        // Fetch mentee profiles for each mentee user
        const menteeProfiles = await Promise.all(menteeUsers.map(async (user) => {
            try {
                const menteeProfile = await Mentee.findOne({ user: user._id });

                let interestsString = "";
                if (menteeProfile && menteeProfile.interests.length > 0) {
                    interestsString = "My interests are " + menteeProfile.interests.join(', ');
                }

                return {
                    _id: menteeProfile ? menteeProfile._id : null,
                    name: user.firstName + ' ' + user.lastName, // Combine first name and last name to get full name
                    role: user.role,
                    interests: interestsString, // Concatenated interests string
                    photo: menteeProfile ? menteeProfile.photo : null
                };
            } catch (error) {
                console.error('Error fetching mentee profile:', error);
                // Return null or a default value if an error occurs while fetching the mentee profile
                return {
                    _id: null,
                    name: user.firstName + ' ' + user.lastName,
                    role: user.role,
                    interests: "",
                    photo: null
                };
            }
        }));    

        res.status(200).json(menteeProfiles);
    } catch (error) {
        console.error('Error fetching mentee profiles:', error);
        res.status(500).json({ message: 'Internal Error' });
    }
};

module.exports = {
    ProfilesOfMentee
};
