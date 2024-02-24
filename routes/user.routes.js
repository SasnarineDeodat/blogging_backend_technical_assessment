import express from "express";
import {
  createUser,
  findAllUsers,
  findOneUser,
  updateUserProfile,
  deleteUserProfile,
} from "../controllers/user.controller.js";
import { validateUserCreation } from "../middlewares/validate.js";
import passport from "passport";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const userRouter = (app) => {
  var router = express.Router();

  // Create a new User
  router.post("/", validateUserCreation, createUser);

  // Retrieve all Users
  router.get("/", findAllUsers);

  // Retrieve a single User with username
  router.get("/:username", findOneUser);

  // Update the User if they are authenticated and authorized to do it
  router.put("/profile", isAuthenticated, updateUserProfile);

  // Delete the User if they are authenticated and authorized to do it
  router.delete("/profile", isAuthenticated, deleteUserProfile);

  //Login a User
  router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(400).send({ message: info.message });

      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.send({
          message: "Login successful",
          user: { id: user.id, email: user.email, username: user.username },
        });
      });
    })(req, res, next);
  });

  app.use("/api/users", router);
};

export default userRouter;
