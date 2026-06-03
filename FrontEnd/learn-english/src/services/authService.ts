import { apiClient } from "../api/apiClient";

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  email: string;
  password: string;
  name: string;
};

export const authService = {
  login: async (payload: LoginPayload) => {
    const response = await apiClient("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return response.json();
  },
  register: async (payload: RegisterPayload) => {
    const response = await apiClient("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return response.json();
  },
};
