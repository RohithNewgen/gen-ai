import { Router } from "express";
import userRouter from "./users/users";

const allRouters = Router();

allRouters.use("/users", userRouter);

allRouters.use("/*", (req, res) => {
  res.status(404).send("API route not found");
});

export default allRouters;
