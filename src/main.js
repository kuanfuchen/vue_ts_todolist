import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass'

import App from './App.vue';
const app  = createApp(App)

app.use(createPinia()).use(Quasar,{plugin:{}}).mount('#app');
