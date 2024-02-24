import { body } from "express-validator";

/**
 * Middleware array for validating user creation requests.
 *
 * This array of middleware functions uses express-validator to check the validity
 * of user input when creating a new user. It ensures that all necessary fields are
 * correctly formatted and meet the application's requirements for user creation.
 */
export const validateUserCreation = [
  // Validate that the username field is not empty.
  body("username").not().isEmpty().withMessage("Username is required"), // Provide a custom error message if the validation fails.

  // Validate that the email field contains a valid email address.
  body("email").isEmail().withMessage("Must be a valid email address"), // Provide a custom error message if the validation fails.

  // Validate that the password field is at least 6 characters long.
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"), // Provide a custom error message if the validation fails.
];
