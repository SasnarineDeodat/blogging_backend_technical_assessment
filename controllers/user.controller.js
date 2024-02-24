import db from "../models/index.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

const User = db.users;

/**
 * Create and save a new user to the database.
 *
 * This function validates the request body for any errors, hashes the user's password for security,
 * and then creates a new user record in the database. Upon successful creation, the user is automatically
 * logged in using Passport's req.login method.
 *
 * @param {Object} req - The request object containing user input.
 * @param {Object} res - The response object.
 */
export const createUser = async (req, res) => {
  // Validate request body for any errors.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    // Hash the user's password for security.
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create a new user record in the database.
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Automatically log in the newly created user.
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

/**
 * Retrieve all users from the database.
 *
 * This function fetches all user records from the database, excluding sensitive information like passwords,
 * and returns them in the response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
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

/**
 * Find a single user by username.
 *
 * This function looks up a user by their username, excluding sensitive information like passwords,
 * and returns the user information if found.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
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

/**
 * Update the authenticated user's profile.
 *
 * This function allows an authenticated user to update their own profile information,
 * including username, email, and password. The password is hashed before updating for security.
 *
 * @param {Object} req - The request object, containing the new user data.
 * @param {Object} res - The response object.
 */
export const updateUserProfile = async (req, res) => {
  const userId = req.user.id; // Assuming req.user is populated by Passport after authentication
  const { username, email, password } = req.body;

  try {
    // Hash the new password if provided.
    const hashedPassword = password
      ? await bcrypt.hash(password, 8)
      : undefined;
    const updateData = {
      username,
      email,
      ...(hashedPassword && { password: hashedPassword }), // Include hashed password in update if provided
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

/**
 * Delete the authenticated user's profile.
 *
 * This function allows an authenticated user to delete their own profile from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const deleteUserProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const deleted = await User.destroy({
      where: { id: userId },
    });

    if (deleted) {
      res.send({
        message: "User profile was deleted successfully!",
      });
    } else {
      res.status(404).send({
        message: `Cannot delete User with id=${userId}. Maybe User was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete User profile.",
    });
  }
};
