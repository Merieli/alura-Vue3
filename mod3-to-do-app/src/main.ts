// Vuex - é um mix de padrão de gerencicamento de projeto e biblioteca para geração de estado, que cuida do estado da aplicação como uma fonte única de verdade. Mas Vuex necessita mais escrita de código, por isso nem sempre é a melhor opção a se escolher.
// Opções ao Vuex para evitar o prop drilling:
// - store pattern com variáveis reativas 
// - Provide/inject (é criado um provedor com o estado que queremos compartilhar que permite injetar em qualquer um dos filhos independente da geração) https://vuejs.org/guide/components/provide-inject.html
// - Pinia (biblioteca que implementa o padrão de gerenciamento de estados)

import { createApp } from 'vue';
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import roteador from './roteador'
import { store, key } from './store'

//ao usar o store é preciso importá-lo juntamente com a chave
createApp(App)
    .use(roteador)
    .use(store, key)
    .mount('#app')
