import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/index.css'
import 'jose'
import {createPinia} from "pinia";

const app = createApp(App);
const pinia = createPinia()
app.use(ElementPlus);
app.use(router);
app.use(VueCookies);
app.use(pinia);
app.mount('#app');
