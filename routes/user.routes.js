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

  app.use("/api/users", router);
};

export default userRouter;
