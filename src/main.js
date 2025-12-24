import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import vuetify from './plugins/vuetify.js'

const pinia = createPinia()

const app = createApp(App);
app.use(pinia)
app.use(vuetify)
app.mount('#app')