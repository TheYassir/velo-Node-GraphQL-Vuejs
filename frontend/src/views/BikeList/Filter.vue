<template>
    <div class="container">
        <form class="form" @submit.prevent="filter">
            <label for="kob">Type de vélo</label>
            <select
                name="kind_of_bike"
                v-model="filters.kind_of_bike_id"
                id="kob"
            >
                <option value="">Tous</option>
                <option :value="info.id" v-for="info in infos?.getKindsOfBike">
                    {{ info.label }}
                </option>
            </select>

            <label for="pos">Point de vente</label>
            <select name="pos" v-model="filters.point_of_sale_id" id="pos">
                <option value="ALL">Tous</option>
                <option :value="info.id" v-for="info in infos?.getPointsOfSale">
                    {{ info.label }}
                </option>
            </select>
            <label for="status">Statut</label>
            <select name="status" v-model="filters.status" id="status">
                <option value="">Tous</option>
                <option
                    v-for="(status, stat) in statuses"
                    v-text="status"
                    :value="stat"
                ></option>
            </select>
            <button type="submit" class="btn btn-primary">Filtrer</button>
        </form>
    </div>
</template>

<script>
    import { useQuery } from '@vue/apollo-composable';
    import { GET_FILTER_INFO } from '@/apollo/queries/getFilterInfo';
    import { ref } from 'vue';
    export default {
        name: 'Filter',
        setup() {
            const { result: infos } = useQuery(GET_FILTER_INFO);

            const statuses = ref({
                ALL: 'Tous',
                AVAILABLE: 'Disponible',
                RENT: 'En location',
                REPAIR: 'En réparation',
                LOST: 'Perdu',
            });
            const filters = ref({
                status: null,
                kind_of_bike_id: null,
                point_of_sale_id: null,
            });

            return { infos, statuses, filters };
        },

        methods: {
            filter() {
                this.$emit('filter', this.filters);
            },
        },
    };
</script>

<style scoped>
    form {
        text-align: center;
        margin-bottom: 1em;
    }
    select {
        margin: 0 1em 1em 1em;
    }
    button,
    select {
        padding: 1em;
        border: none;
    }
</style>
