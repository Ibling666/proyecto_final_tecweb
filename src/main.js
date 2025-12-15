import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importar estilos en orden correcto
import './style.css'



createApp(App).use(router).mount('#app')