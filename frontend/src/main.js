import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { createPinia } from "pinia";
import { apolloClient } from "./apollo";
import router from "./router";
import "./assets/main.css";
import App from "./App.vue";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
})
  .use(createPinia())
  .use(router)
  .mount("#app");
