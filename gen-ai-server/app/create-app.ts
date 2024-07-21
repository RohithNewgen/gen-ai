import express, { NextFunction, Request, Response } from "express";
import cookie_parser from "cookie-parser";
import path from "path";

import userRouter from "./routes/users/users";
import allRouters from "./routes";

export function createApp() {
    const app = express();

    app.use(async (req: Request, res: Response, next: NextFunction) => {
        req.confData = {
            ORIGIN: process.env.ORIGIN || "http://localhost:8000",
            MONGODB_URI:
                process.env.MONGODB_URI || "mongodb://localhost:27017/gen-ai",
        };
        next();
    });

    app.use(function (req: Request, res: Response, next: NextFunction) {
        res.set("Access-Control-Allow-Origin", req.confData?.ORIGIN);
        res.set(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.set("Access-Control-Allow-Credentials", "true");
        res.set("X-Frame-Options", "DENY");
        res.setHeader(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains; preload"
        );
        next();
    });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json({ limit: "50mb" }));
    app.use(express.raw({ type: "application/octet-stream", limit: "100mb" }));

    app.use(cookie_parser());

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.setHeader(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains; preload"
        );
        res.status(500).send({ statusCode: 500, message: "Internal Error" });
    });

    app.use("/api", allRouters);

    if (process.env.NODE_ENV === "prod") {
        console.log("Production mode==================>>>>>>>>>>>>>>");
        app.use(
            express.static(path.join(__dirname, "../../gen-ai-client/dist"))
        );
        app.get("/*", function (req, res) {
            res.setHeader(
                "Strict-Transport-Security",
                "max-age=31536000; includeSubDomains; preload"
            );
            res.sendFile(
                path.resolve(__dirname, "../../gen-ai-client/dist/index.html")
            );
        });
    }

    return app;
}
