import db from "../models/index.js";
import passport from "passport";
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

    res.json(user);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User.",
    });
  }
};

// Retrieve all Users from the database
export const findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving users.",
    });
  }
};

// Find a single User with an id
export const findOneUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send({
        message: `Cannot find User with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving User with id=" + id,
    });
  }
};

// Update a User by the id in the request
export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const [updated] = await User.update(req.body, {
      where: { id: id },
    });

    if (updated) {
      const updatedUser = await User.findByPk(id);
      res.json(updatedUser);
    } else {
      res.status(404).send({
        message: `Cannot find User with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating User with id=" + id,
    });
  }
};

// Delete a User with the specified id in the request
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await User.destroy({
      where: { id: id },
    });

    if (deleted) {
      res.send({
        message: "User was deleted successfully!",
      });
    } else {
      res.status(404).send({
        message: `Cannot delete User with id=${id}. Maybe User was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete User with id=" + id,
    });
  }
};

// Update a User by email
export const updateUserByEmail = async (req, res) => {
  const email = req.params.email;

  try {
    const [updated] = await User.update(req.body, {
      where: { email: email },
    });

    if (updated) {
      const updatedUser = await User.findOne({ where: { email: email } });
      res.json(updatedUser);
    } else {
      res.status(404).send({
        message: `Cannot find User with email=${email}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating User with email=" + email,
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
