// pasta store deve armazenar os estados do vuex, servindo como um provedor, fonte de verdade, onde seus arquivos definem e configuram o estado
// Estado global para ser usado em diversos componentes

import IProjeto from "@/interfaces/IProjeto"; //o @ no caminho é um alias para a pasta src
import { createStore, Store, useStore as vuexUseStore } from "vuex"; //'useStore as vuexUseStore' define que nesse arquivo o 'useStore' recebe o apelido 'vuexUseStore' que sera usado para designá-lo
import { InjectionKey } from "vue";
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, ALTERA_TAREFA, DEFINIR_PROJETOS, DEFINIR_TAREFAS, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-mutacoes";
import { INotification } from "@/interfaces/INotification";
import http from "@/http";
import { ALTERAR_PROJETO, ALTERAR_TAREFA, CADASTRAR_PROJETO, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from "./tipo-acoes";
import ITarefa from "@/interfaces/ITarefa";

interface Estado {
    projetos: IProjeto[],
    tarefas: ITarefa[],
    notifications: INotification[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()
// a store precisa de uma key "chave de acesso", que é uma injectionKey para um Store que é do tipo Estado, e tem como valor um Symbol que configura a chave de acesso

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: [],
        notifications: []
    },
    mutations: { //define as mutações da aplicação, é um objeto que recebe funções que tem o poder de adicionar coisas ao estado. Por convenção o nome das mutações devem ser em caixa alta
        [ADICIONA_PROJETO](state, nomeDoProjeto: string){
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto 
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO] (state, projeto: IProjeto){
            // o método precisa encontrar o index do projeto de alguma forma 
            const index = state.projetos.findIndex(proj => projeto.id == proj.id)
            state.projetos[index] = projeto //substitui o projeto recebido na posição por esse novo alterado
        },
        [EXCLUIR_PROJETO] (state, id: string){
            state.projetos = state.projetos.filter(proj => proj.id != id)
            //filtra os projetos cujo id seja diferente do que for recebido na mutation
        },
        [DEFINIR_PROJETOS] (state, projetos: IProjeto[]){
            state.projetos = projetos
        },
        [NOTIFICAR] (state, novaNotificacao: INotification){
            novaNotificacao.id = new Date().getTime()
            state.notifications.push(novaNotificacao)

            setTimeout(() => {
                state.notifications = state.notifications.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
            // setTimeout que filtra e remove a notificação que foi adicionada apos 3 segundos            
        },
        [DEFINIR_TAREFAS] (state, tarefas: ITarefa[]){
            state.tarefas = tarefas
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa){
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFA] (state, tarefa: ITarefa){
            const index = state.tarefas.findIndex(t => t.id == tarefa.id)
            state.tarefas[index] = tarefa 
        },
    },
    actions: {
        [OBTER_PROJETOS] ({ commit }) { //action assincrona para trazer os projetos na lista
            http.get('projetos')
                .then(resposta => commit(DEFINIR_PROJETOS, resposta.data)) //Pega todos os projetos do banco de dados e adiciona eles na lista de projetos
        },
        [CADASTRAR_PROJETO] (contexto, nomeDoProjeto: string) {
            return http.post('/projetos', {
                nome: nomeDoProjeto
            }) //faz o post enviando o nome do projeto para a api
        },
        [ALTERAR_PROJETO] (contexto, projeto: IProjeto) {
            return http.put(`/projetos/${projeto.id}`, projeto) //faz o PUT atualizando o nome do projeto na api
        },
        [REMOVER_PROJETO] ({ commit }, id: string) {
            return http.delete(`/projetos/${id}`) //faz o DELETE removendo o projeto da api
                .then(() => commit(EXCLUIR_PROJETO, id)) //quando der tudo certo é feito o commit da mutation EXCLUIR_PROJETO para remover o projeto também da lista
        },
        [OBTER_TAREFAS] ({ commit }) {
            http.get('tarefas')
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
        },
        [CADASTRAR_TAREFA] ({ commit }, tarefa: ITarefa) {
            return http.post('/tarefas', tarefa) 
                .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
        },
        [ALTERAR_TAREFA] ({ commit }, tarefa: ITarefa) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERA_TAREFA, tarefa))
        },
    }
})

//Actions podem ser síncronas ou assíncronas e não alteram o estado diretamente, elas fazem commit das mutations. Mutations precisam, obrigatoriamente, serem síncronas.

//função personalizada para simplificar a criação da chave Store
export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}