<template>
    <div class="container-fluid">
        <div class="choose" v-if="!selectedPointOfSale?.pos?.id">
            <ChoosePointOfSale />
        </div>
        <div v-else>
            <Router-link class="btn btn-block bg-blue" to="/start-rent"
                >Démarrer une location</Router-link
            >
            <Router-link class="btn bg-orange" to="/end-rent"
                >Terminer une location</Router-link
            >
            <Router-link class="btn bg-green" to="/bike-list"
                >Liste de vélos</Router-link
            >
            <Router-link class="btn bg-purple" to="/choose-point-of-sale"
                >Changer de point de vente</Router-link
            >
        </div>
    </div>
</template>
<script>
    // ! Do a graph query
    import ChoosePointOfSale from '@/components/ChoosePointOfSale.vue';
    import { usePointOfSale } from '@/stores/pointOfSale';
    export default {
        setup() {
            const selectedPointOfSale = usePointOfSale();

            return { selectedPointOfSale };
        },
        components: { ChoosePointOfSale },
    };
</script>
<style scoped>
    a {
        color: white;
        margin: 0 auto 1em auto;
        display: block;
    }
    .bg-orange {
        background-color: orange;
    }
    .bg-purple {
        background-color: #8a2be2;
    }
    .bg-blue {
        background-color: #6495ed;
    }
    .bg-green {
        background-color: #2e8b57;
    }
    .choose {
        width: 80%;
        margin: 0 auto 2em auto;
    }
</style>
