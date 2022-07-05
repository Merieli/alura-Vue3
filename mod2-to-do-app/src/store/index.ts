// pasta store deve armazenar os estados do vuex, servindo como um provedor, fonte de verdade, onde seus arquivos definem e configuram o estado
// Estado global para ser usado em diversos componentes

import IProjeto from "@/interfaces/IProjeto"; //o @ no caminho é um alias para a pasta src
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

interface Estado {
    projetos: IProjeto[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()
// a store precisa de uma key "chave de acesso", que é uma injectionKey para um Store que é do tipo Estado, e tem como valor um Symbol que configura a chave de acesso

export const store = createStore<Estado>({
    state: {
        projetos: [
            {
                id: new Date().toISOString(),
                nome: 'TypeScript'
            },
            {
                id: new Date().toISOString(),
                nome: 'Vue'
            },
            {
                id: new Date().toISOString(),
                nome: 'Vuex'
            },
        ]
    }
})