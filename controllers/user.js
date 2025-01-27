const bcrypt = require("bcrypt");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");
exports.getNearbyMess = (req, res) => {
  // Logic to find mess within 1 km using geolocation
  res.send("Nearby messes");
};

exports.viewMenu = (req, res) => {
  const messId = req.params.messId;
  // Logic to fetch menu for the given messId
  res.send(`Menu for mess ID: ${messId}`);
};

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !email || !password) {
      return res
        .status(400)
        .json({ error: "First name, email, and password are required" });
    }

    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    res
      .status(201)
      .json({ message: `Record for ${newUser.firstName} created.` });
  } catch (error) {
    console.error("Error during registration: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ error: "Email not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).send({ error: "Email or password mismatch" });
    }

    const token = jwt.sign(
      { id: user.id, userRole: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).send({ message: "User found successfully", token });
  } catch (error) {
    console.error("Login error: ", error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedData = {};
    if (firstName) updatedData.firstName = firstName;
    if (lastName) updatedData.lastName = lastName;

    await user.update(updatedData);

    res
      .status(200)
      .json({ message: `User ${user.firstName} updated successfully.` });
  } catch (error) {
    console.error("Error during user update: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req?.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Email is not registered" });
    }

    // need to send otp throgh the mail or mobile
  } catch (error) {}
};
