<template>
    <main class="colunms is-gapless is-multiline" :class="{ 'modo-escuro':modoEscuroAtivo }"> 
    <!--Dentro da :class vai código javascript dentro d eum objeto "{ }" sendo que primeiro vem entre aspas a classe que desejo adicionar  -->
        <div class="colunm is-one-quarter">
            <BarraLateral @aoTemaAlterado="trocarTema" />
        </div>
        <div class="colunm is-three-quarter conteudo">
            <PartFormulario @aoSalvarTarefa="salvarTarefa" />
            <div class="lista">
                <PartTarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
                <!--No v-for primeiro é o item da lista, e o segundo é o índice do item na lista. -->
                <PartBox v-if="listaEstaVazia" >
                    Você não está muito produtivo hoje :(
                </PartBox>
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
import PartBox from './components/PartBox.vue'

export default defineComponent({
    name: 'App',
    components: {
        BarraLateral,
        PartFormulario,
        PartTarefa,
        PartBox
    },
    data (){
        return {
            tarefas: [] as ITarefa[],
            modoEscuroAtivo: false
        }// lista que é um array de tarefas
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0
        }
    },
    methods: {
        salvarTarefa (tarefa: ITarefa){
            this.tarefas.push(tarefa);
        },
        trocarTema (modoEscuroAtivo: boolean){
            this.modoEscuroAtivo = modoEscuroAtivo;
        }
    }
});
</script>

<style>
.lista{
    padding: 1.25rem;
}

main{
    --bg-primario: #fff;
    --texto-primario: #000;
    height: 100vh;
}
main.modo-escuro{
    --bg-primario: #2b2d42;
    --texto-primario: #ddd;
}
.conteudo{
    background-color: var(--bg-primario);
    height: 100%;
}
</style>
