/**
 * Middleware to check if the user is authenticated.
 *
 * This middleware utilizes Passport's req.isAuthenticated() method to determine if the user
 * has been authenticated. If the user is authenticated, it allows the request to proceed to the
 * next middleware or route handler. If not, it responds with a 401 Unauthorized status and a
 * message indicating that the user is not authenticated.
 *
 * @param {Object} req - The request object, which includes the isAuthenticated method from Passport.
 * @param {Object} res - The response object, used to send a response if the user is not authenticated.
 * @param {Function} next - The next middleware function in the stack.
 */
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the next middleware or route handler
  }
  // User is not authenticated, send an appropriate response
  res
    .status(401)
    .json({ message: "User is not authenticated. Access denied." });
};
