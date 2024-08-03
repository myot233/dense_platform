import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'jose'

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(VueCookies)

app.mount('#app');
