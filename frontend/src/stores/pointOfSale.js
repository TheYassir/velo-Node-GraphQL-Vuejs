import { defineStore } from 'pinia';
import { GET_POINTS_OF_SALE } from '@/apollo/queries/getPointsOfSale';
import {
    getItemFromLocalStorage,
    setItemInLocalStorage,
} from '@/mixins/localStorage';

export const usePointOfSale = defineStore('pos', {
    setup() {},
    state() {
        return {
            pos: getItemFromLocalStorage('pos'),
        };
    },
    actions: {
        setPos(pos) {
            setItemInLocalStorage('pos', pos);
            this.pos = getItemFromLocalStorage('pos');
        },
    },
    getters: {
        getAllPos() {
            return this.getPointsOfSale;
        },
        getPos() {
            this.pos = getItemFromLocalStorage('pos');
            return this.pos;
        },
    },
});
