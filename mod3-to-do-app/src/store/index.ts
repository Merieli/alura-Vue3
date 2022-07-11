// pasta store deve armazenar os estados do vuex, servindo como um provedor, fonte de verdade, onde seus arquivos definem e configuram o estado
// Estado global para ser usado em diversos componentes
import { createStore, Store, useStore as vuexUseStore } from "vuex"; //'useStore as vuexUseStore' define que nesse arquivo o 'useStore' recebe o apelido 'vuexUseStore' que sera usado para designá-lo
import { InjectionKey } from "vue";
import { NOTIFICAR } from "./tipo-mutacoes";
import { INotification } from "@/interfaces/INotification";
import { EstadoProjeto, projeto } from "./modulos/projeto";
import { EstadoTarefa, tarefa } from "./modulos/tarefa";

export interface Estado {
    notifications: INotification[],
    projeto: EstadoProjeto,
    tarefa: EstadoTarefa
}

export const key: InjectionKey<Store<Estado>> = Symbol()
// a store precisa de uma key "chave de acesso", que é uma injectionKey para um Store que é do tipo Estado, e tem como valor um Symbol que configura a chave de acesso

export const store = createStore<Estado>({
    state: {
        projeto: { //nome do modulo com o estado local dentro dele incializado
            projetos: []
        },
        tarefa: {
            tarefas: []
        },
        notifications: []
    },
    mutations: { //define as mutações da aplicação, é um objeto que recebe funções que tem o poder de adicionar coisas ao estado. Por convenção o nome das mutações devem ser em caixa alta        
        [NOTIFICAR] (state, novaNotificacao: INotification){
            novaNotificacao.id = new Date().getTime()
            state.notifications.push(novaNotificacao)

            setTimeout(() => {
                state.notifications = state.notifications.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
            // setTimeout que filtra e remove a notificação que foi adicionada apos 3 segundos            
        },
        
    },
    modules: { //ao usar modulos para a store é necessário definir o modules no arquivo principal com o nome do módulo
        projeto,
        tarefa
    }
})

//Actions podem ser síncronas ou assíncronas e não alteram o estado diretamente, elas fazem commit das mutations. Mutations precisam, obrigatoriamente, serem síncronas.

//função personalizada para simplificar a criação da chave Store
export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}