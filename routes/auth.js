const express = require('express')
const router = express.Router()
const multer = require('multer');
const AuthController = require('../controllers/AuthController')
const changePassword = require('../controllers/AuthController')
const profile = require('../controllers/menteeRoute')
const mentorCreateProfile = require('../controllers/mentorRoute')
const verifyToken = require('../middleware/isAuthenticated')
const profileMentee = require('../controllers/DisplayMentee')
const singleMentee = require('../controllers/singleMentee')
const singleMentor = require('../controllers/singleMentor')

const profileMentors = require('../controllers/DisplayMentor')

const discussinContent = require('../controllers/CreateDiscusion')
const discusionForum = require('../controllers/DisplayDiscussion')
const likes = require('../controllers/LikeDiscuions')



const storage=multer.diskStorage({});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith("image"))
    {
cb(null,true);
    }
    else{
        cb("invalid image file!",false);
    }
};

const uploads=multer({storage,fileFilter});



router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/change-password',  verifyToken, changePassword.changePassword )
router.post('/mentee', verifyToken, uploads.single("photo"), profile.menteeProfile)
router.post('/mentor', verifyToken, uploads.single("photo"), mentorCreateProfile.mentorProfile)
router.get('/profiles', profileMentee.ProfilesOfMentee)
router.get('/mentees/:menteeId', singleMentee.menteeInfo);
router.get('/mentors/:mentorId', singleMentor.mentorInfo);
router.get ('/all-mentors', profileMentors.ProfilesOfMentor)


//DISCUSSION BOARD 
router.post('/discussion', verifyToken, discussinContent.CreateDiscussion)
router.get ('/forum', discusionForum.displayDiscussion)
router.post('/likes', likes.likes)


// handling file uploads




module.exports = router

