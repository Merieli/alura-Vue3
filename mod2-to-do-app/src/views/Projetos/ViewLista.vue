<template>
    <section>
        <h1 class="title">Projetos</h1>
        <router-link to="/projetos/novo" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
        </router-link>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.nome }}</td>
                    <td>
                        <router-link :to="`/projetos/${projeto.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>                    
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { computed } from "@vue/runtime-core";
import { defineComponent } from "vue";
import { useStore } from "../../store";

export default defineComponent({
    name: 'ViewLista',
    setup () {
        const store = useStore() // permite o acesso a store dentro do componente
        return {
            projetos: computed(() => store.state.projetos)
        }
    }
})
</script>

<style scoped>

</style>