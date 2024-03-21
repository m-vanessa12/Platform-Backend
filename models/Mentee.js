const mongoose = require('mongoose');
const { User } = require('../models/User');
const Schema = mongoose.Schema;


const menteeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    //Mentee specific profile Information
    photo: {
        type: String,
        default: '' // Default to an empty string or null, depending on your preference
    },
    phoneNumber: String,
    country: String,
    city: String,
    universityName: String,
    degreeType: String,
    fieldOfStudy: String,
    skills: {
        type: [String],
        enum: ['Graphic Design', 'Digital Marketing', 'Project Management', 'Financial Literacy', 'Communication', 'Problem-solving', 'Teamwork','Leadership', 'Scientific Research Expertise', 'Educational Expertise', 'Financial Expertise', 'Art and Design Expertise', 'Scientific Research Expertis'],
        required: true
    },
    interests: {
        type: [String],
        enum: ['Reading', 'Learning Languages', 'History', 'Chess', 'Writing','Photography', 'Music', 'Drawing', 'Volunteering', 'Travelling', 'Cooking and Baking', 'Film and Theater']
    }
});

const Mentee = mongoose.model('Mentee', menteeSchema);
module.exports = {
    Mentee,
    // skillsEnum,
    // interestsEnum
};
