import { Request, Response } from "express";
import { User } from "../types/users-types";

class UserController {
    async getUsers(request: Request, response: Response<User[]>) {
        response.status(200).send([
            {
                name: "John Doe",
                email: "john@gmail.com",
                password: "123456",
            },
        ]);
    }
}

export default UserController;
