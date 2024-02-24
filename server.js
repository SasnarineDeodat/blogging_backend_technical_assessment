import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config"; // Automatically loads environment variables from a .env file
import db from "./models/index.js";
import userRouter from "./routes/user.routes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync(); // Sync database

app.get("/", (req, res) => {
  res.send("Welcome to our blogging app!");
});

userRouter(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
