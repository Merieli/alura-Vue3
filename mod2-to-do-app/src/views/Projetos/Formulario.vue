<template>
    <section class="projetos">
        <h1 class="title">Projetos</h1>
        <form @submit.prevent="salvar" > <!--@submit.prevent - ouve o evento de submit ja prevenindo o comportamento padrão de recarregar-->
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "../../store";

export default defineComponent({
    name: 'ViewFormulario',
    data() {
        return {
            nomeDoProjeto: ''
        }
    },
    methods: {
        salvar (){
            this.store.commit('ADICIONA_PROJETO', this.nomeDoProjeto)
            this.nomeDoProjeto = '';
            this.$router.push('/projetos')
        }// Para alterar o estado, uma mutation deve ser implementada na store e chamada pelo componente.
    },
    setup () {
        const store = useStore() // permite o acesso a store dentro do componente
        return {
            store
        }
    }
})
</script>

<style scoped>
.projetos{
    padding: 1.25rem;
}
</style>