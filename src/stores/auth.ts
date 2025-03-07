import {defineStore} from 'pinia';
import api from "@/services/api";
import axios from "axios";

interface User {
  id: number;
  username: string;
  email: string;
}

interface LoginResponse {
  status: string;
  data: {
    user: User;
    token: string;
  };
}

interface LoginPayload {
  username: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false as boolean,
    user: null as User | null,
    token: null as string | null,
  }),

  actions: {
    async login({username, password}: LoginPayload): Promise<{ success: boolean; message?: string }> {
      try {
        const response = await api.post<LoginResponse>('/auth/login', {username, password});
        const responseData: LoginResponse = response.data;

        if (responseData.status === 'success') {
          this.token = responseData.data.token;
          this.user = responseData.data.user;
          this.isAuthenticated = true;

          localStorage.setItem('token', this.token);
          localStorage.setItem('user', JSON.stringify(this.user)); // Store user details

          return {success: true};
        } else {
          return {success: false, message: 'Invalid login response'};
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error('Login failed:', error.response?.data || error.message);
          return {success: false, message: error.response?.data?.message || 'Login failed'};
        } else {
          console.error('Unexpected error:', error);
          return {success: false, message: 'An unexpected error occurred'};
        }
      }
    },

    logout(): void {
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;

      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },

    checkAuth(): void {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
        this.isAuthenticated = true;
      }
    },
  },
});
