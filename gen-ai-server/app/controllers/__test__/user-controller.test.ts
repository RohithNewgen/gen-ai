import { mockRequest, mockResponse } from "../../__mocks__";
import UserController from "../user-controller";

const userController = new UserController();

describe("getUsers", () => {
  it("should return an array of users", async () => {
    await userController.getUsers(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledWith([
      {
        name: "John Doe",
        email: "john@gmail.com",
        password: "123456",
      },
    ]);
  });
});
