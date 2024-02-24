import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import db from "../models/index.js"; // Adjust the import path as necessary

const User = db.users;

/**
 * Configures Passport for user authentication using a local strategy.
 *
 * This function sets up Passport to authenticate users based on email and password.
 * It defines how Passport should verify credentials and how to serialize and
 * deserialize user information for session management.
 *
 * @param {Object} passport - The Passport instance to be configured.
 */
const configurePassport = (passport) => {
  // Use the local strategy for authentication by email and password.
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // Use 'email' instead of the default 'username'
        passwordField: "password", // Explicitly define the password field for clarity
      },
      async (email, password, done) => {
        try {
          // Attempt to find the user by their email.
          const user = await User.findOne({ where: { email } });
          if (!user) {
            // If no user is found, return a message indicating the issue.
            return done(null, false, {
              message: "No user found with that email.",
            });
          }

          // Compare the provided password with the stored hash.
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            // If the password doesn't match, return a message indicating the issue.
            return done(null, false, { message: "Password incorrect." });
          }

          // If everything is okay, return the user object.
          return done(null, user);
        } catch (err) {
          // Handle any errors that occur during the process.
          return done(err);
        }
      },
    ),
  );

  // Serialize the user ID to the session when authentication succeeds.
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize the user from the session based on the serialized ID.
  passport.deserializeUser(async (id, done) => {
    try {
      // Find the user by their ID.
      const user = await User.findByPk(id);
      done(null, user); // Return the user object for use in the application.
    } catch (err) {
      // Handle any errors that occur during deserialization.
      done(err, null);
    }
  });
};

export default configurePassport;
