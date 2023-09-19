<template>
    <div class="container">
        <div class="row">
            <form @submit.prevent="setSelectedPointOfSale">
                <div class="form-group">
                    <label for="pos">Sélectionnez un point de vente</label>
                    <select
                        class="form-select"
                        aria-label="Default select example"
                        id="pos"
                        v-model="pos"
                        @change="setSelectedPointOfSale($event)"
                    >
                        <option selected>Sélectionner un point de vente</option>
                        <option
                            v-for="pointOfSale in getPointsOfSale?.getPointsOfSale"
                            :value="pointOfSale.id"
                            v-text="pointOfSale.label"
                        ></option>
                    </select>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { GET_POINTS_OF_SALE } from '@/apollo/queries/getPointsOfSale';
    import { usePointOfSale } from '@/stores/pointOfSale';
    import { useQuery } from '@vue/apollo-composable';

    export default {
        name: 'ChoosePointOfSale',
        setup() {
            const posStore = usePointOfSale();
            const { result: getPointsOfSale } = useQuery(GET_POINTS_OF_SALE);
            return { posStore, getPointsOfSale };
        },

        methods: {
            setSelectedPointOfSale(e) {
                const pos = this.getPointsOfSale.getPointsOfSale.find(
                    pos => pos.id === Number(e.target.value),
                );

                this.posStore.setPos(pos);
            },
        },
    };
</script>
