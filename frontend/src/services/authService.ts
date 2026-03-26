import type {
    AuthResponse,
    ChangePasswordRequest,
    LoginRequest,
    RegisterRequest,
    UpdatePreferencesRequest,
    UpdateProfileRequest,
    User,
    UserPreferences,
} from "../types/auth.ts";
import { api } from "../utils/api";

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", data);
    return response.data;
};

export const register = async (
    data: RegisterRequest,
): Promise<AuthResponse> => {
    const response = await api.post("/auth/register", data);
    return response.data;
};

// Profile management
export const getProfile = async (): Promise<User> => {
    const response = await api.get("/auth/profile");
    return response.data;
};

export const updateProfile = async (
    data: UpdateProfileRequest,
): Promise<User> => {
    const response = await api.put("/auth/profile", data);
    return response.data;
};

export const changePassword = async (
    data: ChangePasswordRequest,
): Promise<void> => {
    await api.post("/auth/change-password", data);
};

export const deleteAccount = async (): Promise<void> => {
    await api.delete("/auth/account");
};

// Preferences
export const getPreferences = async (): Promise<UserPreferences> => {
    const response = await api.get("/auth/preferences");
    return response.data;
};

export const updatePreferences = async (
    data: UpdatePreferencesRequest,
): Promise<UserPreferences> => {
    const response = await api.put("/auth/preferences", data);
    return response.data;
};
