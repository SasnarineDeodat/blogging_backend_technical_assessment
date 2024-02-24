import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config"; // Automatically loads environment variables from a .env file
import db from "./models/index.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import commentRouter from "./routes/comments.routes.js";
import session from "express-session";
import passport from "passport";
import configurePassport from "./config/passport.config.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.AUTH_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

db.sequelize.sync(); // Sync database

app.get("/", (req, res) => {
  res.send("Welcome to our blogging app!");
});

userRouter(app);
postRouter(app);
commentRouter(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
