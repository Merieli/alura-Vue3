import { createApp } from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import roteador from './roteador'
import { key, store } from './store'

//ao usar o store é preciso importá-lo jintamente com a chave
createApp(App)
    .use(roteador)
    .use(store, key)
    .mount('#app')
