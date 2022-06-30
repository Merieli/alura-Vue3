<template>
    <main class="colunms is-gapless is-multiline">
        <div class="colunm is-one-quarter">
            <BarraLateral />
        </div>
        <div class="colunm is-three-quarter">
            <PartFormulario @aoSalvarTarefa="salvarTarefa" />
            <div class="lista">
                <div class="box has-text-weight-bold">
                    
                </div>
                <PartTarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />'
                <!--No v-for primeiro é o item da lista, e o segundo é o índice do item na lista. -->
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue'
import PartFormulario from './components/PartFormulario.vue'
import PartTarefa from './components/PartTarefa.vue'
import ITarefa from './interfaces/ITarefa'

export default defineComponent({
    name: 'App',
    components: {
        BarraLateral,
        PartFormulario,
        PartTarefa
    },
    data (){
        return {
            tarefas: [] as ITarefa[]
        }// lista que é um array de tarefas
    },
    methods: {
        salvarTarefa (tarefa: ITarefa){
            this.tarefas.push(tarefa);
        }
    }
});
</script>

<style>
.lista{
    padding: 1.25rem;
}
</style>
