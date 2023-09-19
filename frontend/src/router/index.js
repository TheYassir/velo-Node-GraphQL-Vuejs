import { createRouter, createWebHistory } from 'vue-router';

import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import HomeView from '@/views/HomeView.vue';
import ChoosePointOfSale from '@/components/ChoosePointOfSale.vue';
import StartRent from '@/views/StartRent.vue';
import { useAuthStore } from '@/stores/auth.js';
import StopRent from '@/views/StopRent.vue';
import BikeDetail from '@/views/BikeDetail.vue';
import BikeList from '@/views/BikeList/index.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            props: true,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        {
            path: '/start-rent',
            name: 'startRent',
            component: StartRent,
        },
        {
            path: '/end-rent',
            name: 'endRent',
            component: StopRent,
        },
        {
            path: '/bike-list',
            name: 'bikeList',
            component: BikeList,
        },
        {
            path: '/bike/:id',
            name: 'bike',
            component: BikeDetail,
        },
        {
            path: '/choose-point-of-sale',
            name: 'choosePointOfSale',
            component: ChoosePointOfSale,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('../views/NotFound.vue'),
        },
    ],
});

router.beforeEach(async to => {
    //* redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const authStore = useAuthStore();

    if (authRequired && !authStore.user) {
        authStore.returnUrl = to.fullPath;
        return '/login';
    }
});

export default router;
