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
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.nome }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { computed } from "@vue/runtime-core";
import { defineComponent } from "vue";
import { useStore } from "../store";

export default defineComponent({
    name: 'ViewProjetos',
    data() {
        return {
            nomeDoProjeto: ''
        }
    },
    methods: {
        salvar (){
            this.store.commit('ADICIONA_PROJETO', this.nomeDoProjeto)
            this.nomeDoProjeto = ''
        }// Para alterar o estado, uma mutation deve ser implementada na store e chamada pelo componente.
    },
    setup () {
        const store = useStore() // permite o acesso a store dentro do componente
        return {
            store,
            projetos: computed(() => store.state.projetos)
        }
    }
})
</script>

<style scoped>
.projetos{
    padding: 1.25rem;
}
</style>