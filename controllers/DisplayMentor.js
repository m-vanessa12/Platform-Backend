const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { Mentor } = require('../models/Mentor');

const ProfilesOfMentor = async (req, res) => {
    try {
        // Query users with role "mentor"
        const mentorUsers = await User.find({ role: 'Mentor' });

        // Fetch mentor profiles for each mentor user
        const mentorProfiles = await Promise.all(mentorUsers.map(async (user) => {
            try {
                const mentorProfile = await Mentor.findOne({ user: user._id });

                let qualificationsString = "";
                if (mentorProfile && mentorProfile.qualifications.length > 0) {
                    qualificationsString = "My qualifications are " + mentorProfile.qualifications.join(', ');
                }

                return {
                    _id: mentorProfile ? mentorProfile._id : null,
                    name: user.firstName + ' ' + user.lastName, // Combine first name and last name to get full name
                    role: user.role,
                    qualifications: qualificationsString, // Concatenated qualifications string
                    photo: mentorProfile ? mentorProfile.photo : null
                };
            } catch (error) {
                console.error('Error fetching mentor profile:', error);
                // Return null or a default value if an error occurs while fetching the mentor profile
                return {
                    _id: null,
                    name: user.firstName + ' ' + user.lastName,
                    role: user.role,
                    qualifications: "",
                    photo: null
                };
            }
        }));    

        res.status(200).json(mentorProfiles);
    } catch (error) {
        console.error('Error fetching mentor profiles:', error);
        res.status(500).json({ message: 'Internal Error' });
    }
};

module.exports = {
    ProfilesOfMentor
};
