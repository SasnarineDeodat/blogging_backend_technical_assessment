import express from "express";
import {
  createUser,
  findAllUsers,
  findOneUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { validateUserCreation } from "../middlewares/validate.js";
import { updateUserByEmail } from "../controllers/user.controller.js";
import { deleteUserByEmail } from "../controllers/user.controller.js";
import passport from "passport";

const userRouter = (app) => {
  var router = express.Router();

  // Create a new User
  router.post("/", validateUserCreation, createUser);

  // Retrieve all Users
  router.get("/", findAllUsers);

  // Retrieve a single User with id
  router.get("/:id", findOneUser);

  // Update a User with id
  router.put("/:id", updateUser);

  // Delete a User with id
  router.delete("/:id", deleteUser);

  // Update a User by email
  router.put("/email/:email", updateUserByEmail);

  // Delete a User by email
  router.delete("/email/:email", deleteUserByEmail);

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
