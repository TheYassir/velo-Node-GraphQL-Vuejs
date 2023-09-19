import { defineStore } from 'pinia';
import { axios, setAuthToken } from '@/mixins/axios.js';
import router from '@/router/index.js';
import { loginServerUrl } from '../../docker-env-conf';

export const useAuthStore = defineStore('auth', {
    state() {
        return {
            isAuthenticated: false,
            token: localStorage.getItem('token'),
            user: JSON.parse(localStorage.getItem('user')),
        };
    },

    actions: {
        async register(email, password) {
            axios
                .post(`${loginServerUrl}/users/register`, {
                    email,
                    password,
                })
                .then(res => {
                    this.login(email, password);
                })
                .catch(e => {
                    for (let prop in e) {
                        console.log(prop, e[prop]);
                    }
                });
        },

        async login(email, password) {
            try {
                const res = await axios.post(`${loginServerUrl}/login`, {
                    email,
                    password,
                });

                const { token, user } = await res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                this.user = user;
                this.token = token;
                setAuthToken();
                await router.push('/');
            } catch (e) {
                for (let prop in e) {
                    console.log(prop, e[prop]);
                }
                return e;
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            this.isAuthenticated = false;
            this.token = null;
            router.push('/login');
        },
    },

    getters: {
        isAuth() {
            this.token = localStorage.getItem('token');

            setAuthToken();
            if (this.token) {
                this.isAuthenticated = true;
                this.user = JSON.parse(localStorage.getItem('user'));
                return true;
            }
            return false;
        },
    },
});
