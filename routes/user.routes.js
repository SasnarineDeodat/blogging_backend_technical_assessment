import express from "express";
import {
  createUser,
  findAllUsers,
  findOneUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { validateUserCreation } from "../middlewares/validate.js";

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

  app.use("/api/users", router);
};

export default userRouter;
