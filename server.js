import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config"; // Automatically loads environment variables from a .env file
import db from "./models/index.js";
import userRouter from "./routes/user.routes.js";
import session from "express-session";
import passport from "passport";

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

db.sequelize.sync(); // Sync database

app.get("/", (req, res) => {
  res.send("Welcome to our blogging app!");
});

userRouter(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
