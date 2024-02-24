import db from "../models/index.js"; // Adjust the path as necessary
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
