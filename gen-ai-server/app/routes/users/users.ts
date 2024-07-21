import { Router } from "express";

import UserController from "../../controllers/user-controller";
import isAuthorized from "../../middleware/is-authorized";

const userRouter = Router();
const userController = new UserController();

userRouter
    .get("/", isAuthorized, userController.getUsers)
    .get("/:id", (req, res) => {
        res.send({
            data: {
                id: req.params.id,
                name: "John Doe",
            },
        });
    });

export default userRouter;
