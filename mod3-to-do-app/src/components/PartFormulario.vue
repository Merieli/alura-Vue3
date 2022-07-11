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
import { computed, defineComponent } from 'vue';
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
    data () {
        return {
            descricao: '',
            idProjeto: '',
        }
    },
    methods: {
        salvarTarefa (tempoDecorrido: number) : void {
            this.$emit('aoSalvarTarefa', { //quando uma tarefa for salva o formulario emite um evento que o APP ouve e adiciona a lista de taregas
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao,
                projeto: this.projetos.find((proj: IProjeto) => proj.id == this.idProjeto) 
            })
            //o metodo find projeto o projeto de id que é o memo id do projeto selecionado no select para que ao criar a tarefa ela esteja relacionada ao proejto
            this.descricao = ''
        },
        
    },
    setup () { //metodo que prepara a montagem do componente
        const store = useStore(key) //o gancho useStore permite o uso da Store
        return {
            projetos: computed(() => store.state.projeto.projetos) //retorna a lista de projetos que vem do 'store.state.projetos', mas por ser uma lista dinamica que pode ter projetos adicionados é necessário encapsular dentro da função computed que representa as propriedades computadas
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