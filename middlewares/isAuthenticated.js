export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the next middleware or route handler
  }
  // User is not authenticated, send an appropriate response
  res
    .status(401)
    .json({ message: "User is not authenticated. Access denied." });
};
