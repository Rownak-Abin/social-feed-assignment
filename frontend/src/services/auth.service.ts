import axiosInstance from "@/lib/axios";

export interface RegisterPayload {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

const authService = {
    register: async (data: RegisterPayload) => {
        const response = await axiosInstance.post("auth/register", data);
        return response.data;
    },

    login: async (data: LoginPayload) => {
        const response = await axiosInstance.post("auth/login", data);
        return response.data;
    },

    me: async () => {
        const response = await axiosInstance.get("auth/me");
        return response.data;
    },

    logout: async () => {
        const response = await axiosInstance.post("auth/logout");
        return response.data;
    },
};

export default authService;