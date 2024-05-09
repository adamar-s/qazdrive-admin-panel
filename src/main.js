import { createApp } from 'vue';
import { createPinia } from "pinia";
import App from '@/App.vue';

import router from '@/router/router.ts';
import "@/assets/scss/main.scss";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(pinia);
app.component('VueDatePicker', VueDatePicker);

app.mount("#app");
