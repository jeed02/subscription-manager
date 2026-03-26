export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export interface User {
    id: string;
    email: string;
}

export interface UserPreferences {
    id: string;
    userId: string;
    currency: string;
    theme: string;
    notificationsEnabled: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateProfileRequest {
    email: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

export interface UpdatePreferencesRequest {
    currency: string;
    theme: string;
    notificationsEnabled: boolean;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    preferences: UserPreferences | null;
    login: (token: string) => void;
    logout: () => void;
    refreshUser: () => Promise<void>;
    refreshPreferences: () => Promise<void>;
}
