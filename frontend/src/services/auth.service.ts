import axiosInstance from "../lib/axios";

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

interface LoginResponse {
    access_token?: string;
    token?: string;
    data?: {
        access_token?: string;
        token?: string;
    };
    [key: string]: unknown;
}

const authService = {
    register: async (data: RegisterPayload) => {
        const response = await axiosInstance.post("auth/register", data);
        return response.data;
    },

    login: async (data: LoginPayload) => {
        const response = await axiosInstance.post<LoginResponse>("auth/login", data);

        const token =
            response.data?.access_token ??
            response.data?.token ??
            response.data?.data?.access_token ??
            response.data?.data?.token;

        if (token) {
            localStorage.setItem("token", token);
        } else {
            console.warn("Login response এ token পাওয়া যায়নি:", response.data);
        }

        return response.data;
    },

    me: async () => {
        const response = await axiosInstance.get("auth/me");
        return response.data;
    },

    logout: async () => {
        try {
            const response = await axiosInstance.post("auth/logout");
            return response.data;
        } finally {
            localStorage.removeItem("token");
        }
    },
};

export default authService;