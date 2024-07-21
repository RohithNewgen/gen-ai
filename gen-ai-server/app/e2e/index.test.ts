import request from "supertest";
import { Express } from "express";

import { createApp } from "../create-app";

describe("api/users", () => {
    let app: Express;

    beforeAll(() => {
        app = createApp();
    });

    it("should return a list of users", async () => {
        const response = await request(app).get("/api/users");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            {
                name: "John Doe",
                email: "john@gmail.com",
                password: "123456",
            },
        ]);
    });
});
