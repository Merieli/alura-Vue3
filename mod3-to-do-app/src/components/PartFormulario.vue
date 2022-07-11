<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para iniciar uma nova tarefa">
                <input
                class="input"
                type="text"
                placeholder="Qual tarefa você deseja iniciar?"
                v-model="descricao"
                />
            </div>
            <div class="column is-3">
                <div class="select">
                <select v-model="idProjeto">
                    <option value="">Selecione o projeto</option>
                    <option
                    :value="projeto.id"
                    v-for="projeto in projetos"
                    :key="projeto.id"
                    >
                    {{ projeto.nome }}
                    </option>
                </select>
                </div>
            </div>
            <div class="column">
                <FormTemporizador @aoTemporizadorFinalizado="salvarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import FormTemporizador from './FormTemporizador.vue';
import { useStore } from 'vuex';

import { key } from '../store';
import IProjeto from '../interfaces/IProjeto';

export default defineComponent ({
    name: 'PartFormulario',
    emits: ['aoSalvarTarefa'], //emite os eventos
    components: {
        FormTemporizador
    },
    // { emit } - extrai o emit do contexto do vue
    setup (props, { emit }) { //a primeira variavel recebida são as props e a segunda é o contexto que permite acesso a várias coisas disponiveis no setup (como o "emit" por exemplo)

        const store = useStore(key) //o gancho useStore permite o uso da Store
        const descricao = ref(""); // o TypeScript já entende ao fazer dessa forma que a variavel será do tipo string
        const idProjeto = ref("");

        const projetos= computed(() => store.state.projeto.projetos) //ao usar computed é falar que a variavel é um computed ref, por isso também precisa do ".value"


        const salvarTarefa = (tempoDecorrido: number) : void => {
            emit('aoSalvarTarefa', { //quando uma tarefa for salva o formulario emite um evento que o APP ouve e adiciona a lista de taregas
                duracaoEmSegundos: tempoDecorrido,
                descricao: descricao.value,
                projeto: projetos.value.find((proj: IProjeto) => proj.id == idProjeto.value) 
            })
            //o metodo find projeto o projeto de id que é o memo id do projeto selecionado no select para que ao criar a tarefa ela esteja relacionada ao proejto
            descricao.value = ''
        }

        return {
            descricao,
            idProjeto,
            projetos,
            salvarTarefa
        }
    }
})
</script>

<style>
.formulario{
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>