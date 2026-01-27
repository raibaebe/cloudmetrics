const Auth = {
    getAccessToken() {
        return localStorage.getItem('access_token');
    },

    getRefreshToken() {
        return localStorage.getItem('refresh_token');
    },

    setTokens(access, refresh) {
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
    },

    clearTokens() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
    },

    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    getToken() {
        return this.getAccessToken();
    },

    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    },

    isLoggedIn() {
        return !!this.getAccessToken();
    },

    isAdmin() {
        const user = this.getUser();
        return user && user.is_admin;
    },

    async login(username, password) {
        const response = await fetch('/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || 'Login failed');
        }

        const tokens = await response.json();
        this.setTokens(tokens.access, tokens.refresh);

        const userResponse = await fetch('/api/user/', {
            headers: {
                'Authorization': `Bearer ${tokens.access}`,
            },
        });

        if (userResponse.ok) {
            const user = await userResponse.json();
            this.setUser(user);
        }

        return tokens;
    },

    async refreshAccessToken() {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            throw new Error('No refresh token');
        }

        const response = await fetch('/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) {
            this.clearTokens();
            throw new Error('Token refresh failed');
        }

        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        return data.access;
    },

    logout() {
        this.clearTokens();
        window.location.href = '/';
    },

    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = '/';
            return false;
        }
        return true;
    },

    redirectBasedOnRole() {
        if (this.isAdmin()) {
            window.location.href = '/admin-panel/';
        } else {
            window.location.href = '/data/';
        }
    }
};

const API = {
    async fetch(url, options = {}) {
        const accessToken = Auth.getAccessToken();

        const defaultHeaders = {
            'Authorization': `Bearer ${accessToken}`,
        };

        if (!(options.body instanceof FormData)) {
            defaultHeaders['Content-Type'] = 'application/json';
        }

        const config = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
        };

        let response = await fetch(url, config);

        if (response.status === 401) {
            try {
                const newToken = await Auth.refreshAccessToken();
                config.headers['Authorization'] = `Bearer ${newToken}`;
                response = await fetch(url, config);
            } catch (error) {
                Auth.logout();
                throw new Error('Session expired');
            }
        }

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.detail || data.error || 'Request failed');
        }

        return response.json();
    },

    async get(url) {
        return this.fetch(url, { method: 'GET' });
    },

    async post(url, data) {
        return this.fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    async uploadFile(url, formData) {
        return this.fetch(url, {
            method: 'POST',
            body: formData,
        });
    },

    async delete(url) {
        return this.fetch(url, { method: 'DELETE' });
    }
};

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
