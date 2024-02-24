import express from "express";
import {
  createUser,
  findAllUsers,
  findOneUser,
} from "../controllers/user.controller.js";

const userRouter = (app) => {
  var router = express.Router();

  // Create a new User
  router.post("/", createUser);

  // Retrieve all Users
  router.get("/", findAllUsers);

  // Retrieve a single User with id
  router.get("/:id", findOneUser);

  // Update a User with id
  // router.put("/:id", users.update);

  // Delete a User with id
  // router.delete("/:id", users.delete);

  app.use("/api/users", router);
};

export default userRouter;
