class AuthService {
    private token: string | null = null;

    public constructor() {}

    setToken(token: string | null): void {
        this.token = token;
    }

    getToken(): string | null {
        return this.token;
    }
}

export const authService = new AuthService();