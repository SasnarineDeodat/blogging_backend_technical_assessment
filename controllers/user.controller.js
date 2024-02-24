import db from "../models/index.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

const User = db.users;

// Create and Save a new User
export const createUser = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create a User
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ message: "Account created successfully" });
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User.",
    });
  }
};

// Retrieve all Users from the database
export const findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["username", "email"], // Exclude password and other sensitive info
    });
    res.json(users);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving users.",
    });
  }
};

// Find a single User with username
export const findOneUser = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({
      where: { username: username },
      attributes: ["username", "email"], // Exclude password and other sensitive info
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send({
        message: `Cannot find User with username=${username}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving User with username=" + username,
    });
  }
};

// Update a User by email
export const updateUserProfile = async (req, res) => {
  const userId = req.user.id; // Assuming req.user is populated by Passport after authentication
  const { username, email, password } = req.body;

  try {
    // Additional validation or password hashing
    const hashedPassword = password
      ? await bcrypt.hash(password, 8)
      : undefined;
    const updateData = {
      username,
      email,
      ...(hashedPassword && { password: hashedPassword }), // Only include password in update if it's provided
    };

    const [updated] = await User.update(updateData, {
      where: { id: userId },
    });

    if (updated) {
      const updatedUser = await User.findByPk(userId, {
        attributes: { exclude: ["password"] }, // Exclude password from the response
      });
      res.json(updatedUser);
    } else {
      res.status(404).send({
        message: `Cannot find User with id=${userId}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating User profile.",
    });
  }
};

// Delete a User with the specified email in the request
export const deleteUserByEmail = async (req, res) => {
  const email = req.params.email;

  try {
    const deleted = await User.destroy({
      where: { email: email },
    });

    if (deleted) {
      res.send({
        message: "User was deleted successfully!",
      });
    } else {
      res.status(404).send({
        message: `Cannot delete User with email=${email}. Maybe User was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete User with email=" + email,
    });
  }
};
