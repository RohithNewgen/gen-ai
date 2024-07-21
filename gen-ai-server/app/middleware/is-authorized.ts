import { Request, Response, NextFunction } from "express";

export default function isAuthorized(
    request: Request,
    response: Response,
    next: NextFunction
) {
    request.user = {
        uname: "shailesh_bist",
        role: "admin",
        email: "shailesh.bist@numbertheory.ai",
    };
    request.confData = {
        ORIGIN: "http://localhost:3000",
        MONGODB_URI: "mongodb://localhost:27017/gen-ai",
    };
    console.log(request.user);
    console.log(process.env);
    next();
}
