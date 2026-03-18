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
    id: string
    email: string
}

export interface AuthContextType {
    user: User | null
    token: string | null
    login: (token: string) => void
    logout: () => void
}