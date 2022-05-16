import Vue from "vue";
import VueMeta from "vue-meta";

import App from "./App.vue";
import {
  ReactiveBase,
  ReactiveList,
  SearchBox,
} from "@appbaseio/reactivesearch-vue";
Vue.use(VueMeta);
Vue.use(ReactiveBase);
Vue.use(ReactiveList);
Vue.use(SearchBox);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
