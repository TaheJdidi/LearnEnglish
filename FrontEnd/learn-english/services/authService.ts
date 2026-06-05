import { api } from "./api";
import { RegisterRequest } from "../src/types/RegisterRequest";
import { LoginRequest } from "../src/types/LoginRequest";
import { LogoutRequest } from "../src/types/LogoutRequest";

export async function register(request: RegisterRequest) {

    const response = await api.post(
        "/auth/register",
        request
    );

    return response.data;
}

export async function loginApi(request: LoginRequest) {
    const response = await api.post(
        "/auth/login",
        request
    );

    return response.data;
}
export async function logoutApi(request: LogoutRequest) {
    const response = await api.post("/auth/logout", request);
    return response.data;
}