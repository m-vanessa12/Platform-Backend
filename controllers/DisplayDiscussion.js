const { Mentee } = require('../models/Mentee');
const Discusion = require('../models/Discusion');
const User = require('../models/User');
const Likes = require('../models/Likes'); // Import the Likes model

const displayDiscussion = async (req, res) => {
    try {
        // Use aggregation to count the likes for each discussion
        const discussions = await Discusion.aggregate([
            {
                $lookup: {
                    from: "users", // Collection name for users
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "createdBy"
                }
            },
            {
                $unwind: "$createdBy" // Deconstruct createdBy array
            },
            {
                $lookup: {
                    from: "likes", // Collection name for likes
                    localField: "_id",
                    foreignField: "discussion",
                    as: "likes"
                }
            },
            {
                $project: {
                    _id: 1,
                    createdAt: 1,
                    title: 1,
                    category: 1,
                    content: 1,
                    contentCoverPicture: 1,
                    "createdBy.firstName": 1,
                    "createdBy.lastName": 1,
                    "createdBy.role": 1,
                    likesCount: { $size: "$likes" } // Count the likes for each discussion
                }
            },
            {
                $project: {
                    _id: 1,
                    createdAt: 1,
                    title: 1,
                    category: 1,
                    content: 1,
                    contentCoverPicture: 1,
                    createdBy: {
                        photo: "$createdBy.photo",
                        name: {
                            $concat: [
                                { $ifNull: ["$createdBy.firstName", ""] }, // Use $ifNull to handle null values
                                " ",
                                { $ifNull: ["$createdBy.lastName", ""] } // Use $ifNull to handle null values
                            ]
                        },
                        role: "$createdBy.role"
                    },
                    likesCount: 1
                }
            }
        ]);

        // Handle empty discussions
        if (!Array.isArray(discussions)) {
            return res.status(200).json({ discussions: [] });
        }

        // Format createdBy and likesCount
        for (let discussion of discussions) {
            const createdBy = discussion.createdBy;
            if (createdBy) {
                discussion.createdBy = {
                    photo: createdBy.photo ? createdBy.photo : '',
                    name: createdBy.name.trim(),
                    role: createdBy.role
                };
            }
        }
        console.log('Discussions:', discussions);

        res.status(200).json({ discussions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Error' });
    }
};

module.exports = {
    displayDiscussion
};
