<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">   
                <input type="text" class="input" 
                    placeholder="Qual tarefa você deseja iniciar?"
                    v-model="descricao"
                >
            </div>
            <div class="column">
                <FormTemporizador @aoTemporizadorFinalizado="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FormTemporizador from './FormTemporizador.vue'

export default defineComponent ({
    name: 'PartFormulario',
    emits: ['aoSalvarTarefa'], //emite os eventos
    components: {
        FormTemporizador
    },
    data () {
        return {
            descricao: ''
        }
    },
    methods: {
        finalizarTarefa (tempoDecorrido: number) : void {
            this.$emit('aoSalvarTarefa', { //quando uma tarefa for salva o formulario emite um evento que o APP ouve e adiciona a lista de taregas
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao
            })
            this.descricao = ''
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