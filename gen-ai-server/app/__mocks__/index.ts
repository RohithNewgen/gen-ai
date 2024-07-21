import { Request, Response } from "express";

export const mockRequest = {} as Request;

export const mockResponse = {
    send: jest.fn(),
    status: jest.fn(() => mockResponse),
} as unknown as Response;
