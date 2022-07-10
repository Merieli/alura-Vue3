<template>
    <div>        
        <PartFormulario @aoSalvarTarefa="salvarTarefa" />
        <div class="lista">
            <PartBox v-if="listaEstaVazia" >
                Você não está muito produtivo hoje :(
            </PartBox>
            <PartTarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" /><!--No v-for primeiro é o item da lista, e o segundo é o índice do item na lista. -->            
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PartFormulario from '../components/PartFormulario.vue'
import PartTarefa from '../components/PartTarefa.vue'
import ITarefa from '../interfaces/ITarefa'
import PartBox from '../components/PartBox.vue'

export default defineComponent({
    name: 'ViewTarefas',
    components: {
        PartFormulario,
        PartTarefa,
        PartBox
    },
    data (){
        return {
            tarefas: [] as ITarefa[],
        }// lista que é um array de tarefas
    },    
    methods: {
        salvarTarefa (tarefa: ITarefa){
            this.tarefas.push(tarefa);
        }
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0
        }
    }
});
</script>