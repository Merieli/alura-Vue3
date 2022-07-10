<template>
    <PartBox>
        <div class="columns clicavel" @click="tarefaClicada">
            <div class="column is-4">
                {{ tarefa.descricao || 'Tarefa sem descrição' }} <!--Se a descricao nao existir será colocado o texto entre aspas -->
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome || 'N/D' }} <!--Se tiver o projeto na tarefa vai pegar o nome dele, e se não tiver exibe 'N/D' -->
            </div>
            <div class="column">
                <FormCronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" /> <!--Ao fazer um link da prop com uma variavel deve se usar os ":" -->
            </div>
        </div>
    </PartBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'; // o PropType deve ser utilizado para definir tipagem de props de componentes
import FormCronometro from './FormCronometro.vue';
import ITarefa from '../interfaces/ITarefa';
import PartBox from './PartBox.vue';

export default defineComponent({
    name: 'PartTarefa',
    emits: ['aoTarefaClicada'],
    components: {
        FormCronometro,
        PartBox
    },
    props: {
        tarefa:{
            type: Object as PropType<ITarefa>,
            required: true //propriedade obrigatória
        }
    },
    methods: {
        tarefaClicada (): void {
            this.$emit('aoTarefaClicada', this.tarefa)
        }
    }
})
</script>
<style scoped>
.clicavel{
    cursor: pointer;
}
</style>