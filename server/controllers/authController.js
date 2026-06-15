const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// THIS REGISTERS USER
const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // CHECKING SAME USERS
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // CHUPAU PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // NAYE BANDHE CREATION
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// LOGIN
const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    // SAME USERS IF ANY CHECKING
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // COMPARING PASSWORDS
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // JWT TOKEN GENERATION
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  registerUser,
  loginUser
}; 