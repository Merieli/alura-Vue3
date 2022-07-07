// pasta store deve armazenar os estados do vuex, servindo como um provedor, fonte de verdade, onde seus arquivos definem e configuram o estado
// Estado global para ser usado em diversos componentes

import IProjeto from "@/interfaces/IProjeto"; //o @ no caminho é um alias para a pasta src
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex"; //'useStore as vuexUseStore' define que nesse arquivo o 'useStore' recebe o apelido 'vuexUseStore' que sera usado para designá-lo

interface Estado {
    projetos: IProjeto[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()
// a store precisa de uma key "chave de acesso", que é uma injectionKey para um Store que é do tipo Estado, e tem como valor um Symbol que configura a chave de acesso

export const store = createStore<Estado>({
    state: {
        projetos: []
    },
    mutations: { //define as mutações da aplicação, é um objeto que recebe funções que tem o poder de adicionar coisas ao estado. Por convenção o nome das mutações devem ser em caixa alta
        'ADICIONA_PROJETO'(state, nomeDoProjeto: string){
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto 
            } as IProjeto
            state.projetos.push(projeto)
        },
        'ALTERA_PROJETO' (state, projeto: IProjeto){
            // o método precisa encontrar o index do projeto de alguma forma 
            const index = state.projetos.findIndex(proj => projeto.id == proj.id)
            state.projetos[index] = projeto //substitui o projeto recebido na posição por esse novo alterado
        }
    }
})

//função personalizada para simplificar a criação da chave Store
export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}