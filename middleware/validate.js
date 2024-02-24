import { body } from "express-validator";

export const validateUserCreation = [
  body("username").not().isEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Must be a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
