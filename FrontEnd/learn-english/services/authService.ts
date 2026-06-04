import { api } from "./api";
import { RegisterRequest } from "../src/types/RegisterRequest";
import { LoginRequest } from "../src/types/LoginRequest";

export async function register(request: RegisterRequest) {

    const response = await api.post(
        "/auth/register",
        request
    );

    return response.data;
}

export async function login(request: LoginRequest) {
    const response = await api.post(
        "/login",
        request
    );

    return response.data;
}