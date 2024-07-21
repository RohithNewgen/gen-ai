import express from "express";

import userRouter from "./routes/users/users";
import allRouters from "./routes";
import { createApp } from "./create-app";
import connectDB from "./db";

declare module "express-serve-static-core" {
    interface Request {
        user?: {
            uname: string;
            role: string;
            email: string;
        };
        confData?: {
            ORIGIN: string;
            MONGODB_URI: string;
        };
    }
}

const app = createApp();
const PORT = process.env.PORT || 5000;

// Your server setup and middleware here

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
