
// const cloudinary = require('./cloudinary.js')
const cloudinaryUploader = require('./cloudinary')
//const multer = require('multer')

const fileFilter = async (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb("invalid image file!", false);
	}
};
const fileUpload = async (req) => {
	let imageUrl = "";
	await cloudinaryUploader.upload(
		req.file.path,
		async function (err, image) {
			if (err) {
				console.log(err);
			}
			imageUrl = image.url;
		}
	);
	return imageUrl;
};

module.exports ={
    fileFilter, fileUpload
}
