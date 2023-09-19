<template>
    <div class="container">
        <form @submit.prevent="test" class="form">
            <div class="mb-3">
                <label for="firstname">Prénom du client</label>
                <input
                    class="form-control"
                    type="text"
                    name="firstname"
                    id="firstname"
                    v-model="$input.client_firstname"
                />
            </div>
            <div class="mb-3">
                <label for="lastname">Nom du client</label>
                <input
                    class="form-control"
                    type="text"
                    name="lastname"
                    id="lastname"
                    v-model="$input.client_lastname"
                />
            </div>
            <div class="mb-3">
                <label for="startrent">Début de la location</label>
                <input
                    class="form-control"
                    type="date"
                    name="startrent"
                    id="startrent"
                    v-model="$input.start_date"
                />
            </div>
            <div class="mb-3">
                <label for="endrent">Fin prévu de la location</label>
                <input
                    class="form-control"
                    type="date"
                    name="endrent"
                    id="endrent"
                    v-model="$input.return_date_planned"
                />
            </div>
            <div class="mb-3">
                <label for="bikenum">Numéro du vélo</label>
                <select
                    class="form-select"
                    name="bikenum"
                    id="bikenum"
                    v-model="$input.bike_number"
                >
                    <option selected="selected">Choisissez un vélo</option>
                    <option
                        v-for="bike in bikes?.getBikes"
                        :value="bike.number"
                        v-text="bike.number"
                    ></option>
                </select>
            </div>
            <div class="mb-3">
                <label for="pos">Point de Vente</label>
                <select
                    class="form-select"
                    name="pos"
                    id="pos"
                    v-model="$input.rent_point_of_sale_id"
                >
                    <option selected="selected">
                        Choisissez un point de vente
                    </option>
                    <option
                        v-for="pos in getPointsOfSale?.getPointsOfSale"
                        :value="pos.id"
                        v-text="pos.label"
                    ></option>
                </select>
            </div>
            <input
                class="btn btn-lg btn-primary form-control"
                type="submit"
                value="Enregistrer"
            />
        </form>
    </div>
</template>

<script>
    import { useQuery } from '@vue/apollo-composable';
    import { useMutation } from '@vue/apollo-composable';
    import { GET_ALL_BIKES } from '@/apollo/queries/getBikes';
    import { GET_POINTS_OF_SALE } from '@/apollo/queries/getPointsOfSale';
    import gql from 'graphql-tag';
    import { ref, watch } from 'vue';

    export default {
        setup() {
            const $input = ref({
                start_date: '',
                return_date_planned: '',
                bike_number: 'Choisir',
                client_firstname: '',
                client_lastname: '',
                rent_point_of_sale_id: 'Choisir',
            });

            // ! Supprimer le token auth du localStorage
            // ! Affichage des dates

            const { result: bikes } = useQuery(GET_ALL_BIKES, {
                currency: 'USD',
                filter: { status: 'AVAILABLE' },
            });

            const { result: getPointsOfSale } = useQuery(GET_POINTS_OF_SALE);

            const { mutate: startRent } = useMutation(
                gql`
                    mutation StartRent($input: RentInput!) {
                        addRent(input: $input) {
                            id
                        }
                    }
                `,
                () => ({
                    variables: {
                        input: $input.value,
                    },
                }),
            );

            return { bikes, getPointsOfSale, $input, startRent };
        },
        methods: {
            async test() {
                this.startRent();
                await this.$router.push('/');
            },
        },
        name: 'StartRent',
    };
</script>
