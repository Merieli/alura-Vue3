<template>
    <div>        
        <PartFormulario @aoSalvarTarefa="salvarTarefa" />
        <div class="lista">
            <PartBox v-if="listaEstaVazia" >
                Você não está muito produtivo hoje :(
            </PartBox>
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro">
                    <span class="icon is-small is-left">
                        <i class="fas fa-search"></i>
                    </span>
                </p>
            </div>
            <PartTarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" /><!--No v-for primeiro é o item da lista, e o segundo é o índice do item na lista. -->
            <PartModal :mostrar="tarefaSelecionada != null">
                <!-- Slots customizados que podem ser extraidos ou incluidos, dentro de um componente usando a tag template-->
                <template v-slot:cabecalho>
                    <p class="modal-card-title">Editando uma tarefa</p>
                    <button class="delete" aria-label="close" @click="fecharModal"></button>
                </template>
                <template v-slot:corpo>
                    <div class="field">
                        <label for="descricaoDaTarefa" class="label">
                            Descrição
                        </label>
                        <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa">
                    </div>
                </template>
                <template v-slot:rodape>
                    <button class="button is-success" @click="alterarTarefa">Salvar Alteração</button>
                    <button class="button" @click="fecharModal">Cancelar</button>
                </template>
            </PartModal>            
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import PartFormulario from '../components/PartFormulario.vue'
import PartTarefa from '../components/PartTarefa.vue'
import PartBox from '../components/PartBox.vue'
import PartModal from '../components/PartModal.vue'
import { useStore } from '../store';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '../store/tipo-acoes';
import ITarefa from '../interfaces/ITarefa';

export default defineComponent({
    name: 'ViewTarefas',
    components: {
        PartFormulario,
        PartTarefa,
        PartBox,
        PartModal
    },
    data () {
        return {
            tarefaSelecionada: null as ITarefa | null
        }
    },
    methods: {
        salvarTarefa (tarefa: ITarefa): void{
            this.store.dispatch(CADASTRAR_TAREFA, tarefa)
        },
        selecionarTarefa(tarefa: ITarefa) { //quando clicar na tarefa desejada, ela sera a tarefa selecionada e o modal será exibido
            this.tarefaSelecionada = tarefa
        },
        fecharModal (){
            this.tarefaSelecionada = null
        },
        alterarTarefa (){
            this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
                .then(() => this.fecharModal())
        }
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0
        }
    },
    setup () {
        const store = useStore() // permite o acesso a store dentro do componente
        store.dispatch(OBTER_TAREFAS)//dispatch é usado para invocar uma action 
        store.dispatch(OBTER_PROJETOS)

        const filtro = ref('')

        // const tarefas = computed(() => store.state.tarefa.tarefas.filter(t => !filtro.value || t.descricao.includes(filtro.value)))

        watchEffect(() => {
            store.dispatch(OBTER_TAREFAS, filtro.value)
        })

        return {
            tarefas: computed(() => store.state.tarefa.tarefas),
            store,
            filtro
        }
    }
});
</script>