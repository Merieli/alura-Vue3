import http from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import { OBTER_PROJETOS, CADASTRAR_PROJETO, ALTERAR_PROJETO, REMOVER_PROJETO } from "@/store/tipo-acoes";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, DEFINIR_PROJETOS } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoProjeto {
    projetos: IProjeto[]
}

// entre "<>" deve ser definido o estado do módulo e após a virgula o estado global do projeto que se refere ao arquivo principal da store
export const projeto: Module<EstadoProjeto, Estado> = {
    mutations: {
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
    }
}