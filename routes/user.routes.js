import express from "express";
import users from "../controllers/user.controller.js";

const userRouter = (app) => {
  var router = express.Router();

  // Create a new User
  router.post("/", users.create);

  // Retrieve all Users
  router.get("/", users.findAll);

  // Retrieve a single User with id
  router.get("/:id", users.findOne);

  // Update a User with id
  router.put("/:id", users.update);

  // Delete a User with id
  router.delete("/:id", users.delete);

  app.use("/api/users", router);
};

export default userRouter;
