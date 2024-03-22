// Import necessary modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User } = require('../models/User');
const dotenv = require ('dotenv');
dotenv.config()


// Connect to MongoDB
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define an array of default Mentee users
const defaultMenteeUsers = [
  {
    firstName: 'Anne',
    lastName: 'Jasmine',
    email: 'anne@gmail.com',
    password: 'Anne12', 
  },
  {
    firstName: 'Jeanne',
    lastName: 'Mukakalisa',
    email: 'jeanne@gmail.com',
    password: 'Jeanne12', 
  },
  {
    firstName: 'Edwick',
    lastName: 'Murungu',
    email: 'edwick@gmail.com',
    password: 'Testing12', 
  },

];

// Function to hash passwords
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Function to seed Mentee users
const seedMentorUsers = async () => {
  try {
    // Iterate through the default Mentee users
    for (const user of defaultMenteeUsers) {
      // Check if the user already exists in the database
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) {
        console.log(`User with email ${user.email} already exists. Skipping...`);
        continue; // Move to the next user
      }

      // Hash the password
      const hashedPassword = await hashPassword(user.password);

      // Create a new User document
      const newUser = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword,
        role: 'Mentor',
      });

      // Save the user to the database
      await newUser.save();
      console.log(`User with email ${user.email} added successfully.`);
    }

    console.log('Seed completed.');
  } catch (error) {
    console.error('Error seeding Mentor users:', error);
  } finally {
    // Disconnect from the database after seeding is completed
    mongoose.disconnect();
  }
};

// Call the function to seed Mentee users
seedMentorUsers();
