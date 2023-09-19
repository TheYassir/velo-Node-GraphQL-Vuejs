<template>
    <div class="container">
        <Filter @filter="filter" />
        <table
            class="table table-dark table-striped table-hover border-primary"
            v-if="!loading"
        >
            <thead>
                <tr>
                    <th>Numéro</th>
                    <th>Statut</th>
                    <th>Type de vélo</th>
                    <th>Emplacement</th>
                    <th>Prix en euros</th>
                    <th>Prix en dollars</th>
                    <th>Détails</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    class=""
                    v-for="bike in bikes?.getBikes"
                    v-if="bikes.getBikes.length > 0"
                >
                    <td class="table-info" v-text="bike.number"></td>
                    <td v-text="bike.status"></td>
                    <td v-text="bike.kind_of_bike.label"></td>
                    <td v-text="bike.point_of_sale.label"></td>
                    <td v-text="bike.kind_of_bike.price"></td>
                    <td v-text="bike.kind_of_bike.priceInOtherCurrency"></td>
                    <td>
                        <RouterLink
                            class="btn btn-sm btn-primary"
                            aria-current="page"
                            :to="{ path: '/bike/' + bike.id }"
                            >Détails</RouterLink
                        >
                    </td>
                </tr>
                <tr v-else>
                    <td class="td-empty" colspan="100%">
                        Aucune de données disponible
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else>Loading your data ...</div>
    </div>
</template>

<script>
    import { GET_ALL_BIKES } from '@/apollo/queries/getBikes';
    import { useQuery } from '@vue/apollo-composable';
    import Filter from '@/views/BikeList/Filter.vue';
    import { reactive } from 'vue';

    export default {
        components: { Filter },
        name: 'BikeList',
        setup() {
            const filters = reactive({});

            const { result: bikes, loading } = useQuery(GET_ALL_BIKES, {
                currency: 'USD',
                filter: filters,
            });

            return { bikes, filters, loading };
        },
        methods: {
            filter(data) {
                for (const key in data) {
                    if (
                        data[key] !== null &&
                        data[key] !== '' &&
                        data[key] !== 'ALL'
                    ) {
                        this.filters[key] = data[key];
                    } else {
                        delete this.filters[key];
                    }
                }
            },
        },
    };
</script>

<style scoped>
    .td-empty {
        text-align: center;
    }
</style>
