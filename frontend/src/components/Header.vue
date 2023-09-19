<template>
    <nav
        class="navbar navbar-expand-md navbar-dark bg-dark mb-4"
        v-if="authStore.isAuth"
    >
        <div class="container-fluid">
            <RouterLink class="navbar-brand" to="/">Vélo'</RouterLink>
            <div id="navbarCollapse" class="m-auto">
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <RouterLink
                            class="nav-link"
                            aria-current="page"
                            to="/start-rent"
                            >Démarrer une location</RouterLink
                        >
                    </li>
                    <li class="nav-item">
                        <RouterLink
                            class="nav-link"
                            aria-current="page"
                            to="/end-rent"
                            >Terminer une location</RouterLink
                        >
                    </li>
                    <li class="nav-item">
                        <RouterLink
                            class="nav-link"
                            aria-current="page"
                            to="/bike-list"
                            >Liste de Vélos</RouterLink
                        >
                    </li>
                    <li class="nav-item">
                        <RouterLink
                            class="nav-link"
                            aria-current="page"
                            to="/choose-point-of-sale"
                            >Changer de points de vente</RouterLink
                        >
                    </li>
                </ul>
            </div>
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item me-5">
                    <a
                        @click.prevent="authStore.logout"
                        class="nav-link"
                        href="/"
                        >Déconnexion</a
                    >
                </li>
                <li class="nav-item ms-5">
                    <RouterLink
                        class="nav-link"
                        aria-current="page"
                        to="/bike-list"
                        v-if="posStore.pos"
                        >Point de vente sélectionné :
                        {{ posStore?.getPos?.label }}
                    </RouterLink>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    import { usePointOfSale } from '@/stores/pointOfSale';
    import { useAuthStore } from '@/stores/auth.js';
    import { useQuery } from '@vue/apollo-composable';
    import { GET_POINTS_OF_SALE } from '@/apollo/queries/getPointsOfSale';

    export default {
        name: 'NavLinks',
        setup() {
            const { result: getPointsOfSale } = useQuery(GET_POINTS_OF_SALE);
            const posStore = usePointOfSale();
            const authStore = useAuthStore();

            return {
                posStore,
                authStore,
                getPointsOfSale,
            };
        },
    };
</script>
