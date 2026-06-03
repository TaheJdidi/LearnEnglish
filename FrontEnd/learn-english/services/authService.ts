import { api } from "./api";
import { RegisterRequest } from "../src/types/RegisterRequest";

export async function register(request: RegisterRequest) {

    const response = await api.post(
        "/auth/register",
        request
    );

    return response.data;
}