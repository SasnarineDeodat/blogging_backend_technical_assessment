import "dotenv/config"; // Automatically loads environment variables from a .env file
import express from "express";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./models/index.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import commentRouter from "./routes/comments.routes.js";
import configurePassport from "./config/passport.config.js";

const app = express();

// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync(); // Sync database

// Configure session middleware for persistent sessions
app.use(
  session({
    secret: process.env.AUTH_SECRET, // Secret used to sign the session ID cookie
    resave: false, // Don't save session if unmodified
    saveUninitialized: true, // Don't create session until something stored
  }),
);

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport); // Apply the Passport configuration

// Define a simple route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to our blogging app!");
});

// Register routers for different parts of the application
userRouter(app); // Handles user-related API endpoints
postRouter(app); // Handles blog post-related API endpoints
commentRouter(app); // Handles comments-related API endpoints

const PORT = process.env.PORT || 8080;
// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
