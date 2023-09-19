import { defineStore } from "pinia";
import { useQuery } from "@vue/apollo-composable";
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from "@/mixins/localStorage";
import { GET_ALL_BIKES } from "@/apollo/queries/getBikes";

export const useGetBikes = defineStore("bikes", {
  state() {
    return {
      bikes: getItemFromLocalStorage("bikes"),
    };
  },
  actions: {
    setBikes(bikes) {
      console.log(bikes);
      setItemInLocalStorage("bikes", bikes);
      this.bikes = getItemFromLocalStorage("bikes");
    },
  },

  getters: {
    getAllBikes() {
      this.bikes = getItemFromLocalStorage("bikes");
      const { result: bikes } = useQuery(GET_ALL_BIKES, {
        currency: "USD",
        filter: { status: "AVAILABLE" },
      });

      this.bikes = bikes;
      return this.bikes;
    },
  },
});
