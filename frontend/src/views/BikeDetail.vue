<template>
    <div class="container">
        <div v-if="bike?.getBike">
            <ul class="list-group">
                <li class="list-group-item list-group-item-dark">
                    Vélo : {{ bike?.getBike?.number }}
                </li>
                <li class="list-group-item list-group-item-dark">
                    Type : {{ bike?.getBike?.kind_of_bike?.label }}
                </li>
                <li class="list-group-item list-group-item-dark">
                    Statut : {{ bike?.getBike?.status }}
                </li>
                <li class="list-group-item list-group-item-dark">
                    Point de Vente :
                    {{ bike?.getBike?.rents[0]?.rent_point_of_sale.label }}
                </li>
            </ul>
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>Départ de</th>
                        <th>Date :</th>
                        <th>Retour :</th>
                        <th>Date :</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {{
                                bike?.getBike?.rents[0].rent_point_of_sale.label
                            }}
                        </td>
                        <td>
                            {{
                                new Date(
                                    Number(bike?.getBike?.rents[0].start_date),
                                ).toLocaleDateString()
                            }}
                        </td>
                        <td>
                            {{
                                bike?.getBike?.rents[0].return_point_of_sale
                                    .label
                            }}
                        </td>
                        <td>
                            {{
                                new Date(
                                    Number(
                                        bike?.getBike?.rents[0]
                                            .return_date_planned,
                                    ),
                                ).toLocaleDateString()
                            }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>Nous n'avons pas trouvé le vélo</div>
    </div>
</template>

<script>
    import { GET_BIKE } from '@/apollo/queries/getBike';
    import { useQuery } from '@vue/apollo-composable';
    import { useRoute } from 'vue-router';

    export default {
        setup() {
            const route = useRoute();
            const id = route.params.id;

            const { result: bike } = useQuery(GET_BIKE, {
                currency: 'USD',
                bikeId: Number(id),
            });

            return { bike };
        },
        name: 'BikeDetail',
    };
</script>

<style scoped>
    ul {
        margin-bottom: 1em;
        text-align: center;
    }
</style>
