<template>
    <PartBox>
        <div class="columns">
            <div class="column is-7">
                {{ tarefa.descricao || 'Tarefa sem descrição' }} <!--Se a descricao nao existir será colocado o texto entre aspas -->
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
    components: {
        FormCronometro,
        PartBox
    },
    props: {
        tarefa:{
            type: Object as PropType<ITarefa>,
            required: true //propriedade obrigatória
        }
    }

})
</script>
