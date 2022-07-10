<!--Prop diling: problema conhecido que ocorre com a necessidade de passar um propriedade de um componente para o outro simplemente porque o filho ou neto precisa, e a propriedade não é usada, com o passar do tempo isso pode se tornar um problema -->
<template>
    <main class="colunms is-gapless is-multiline" :class="{ 'modo-escuro':modoEscuroAtivo }"> 
    <!--Dentro da :class vai código javascript dentro de um objeto "{ }" sendo que primeiro vem entre aspas a classe que desejo adicionar  -->
        <div class="colunm is-one-quarter">
            <BarraLateral @aoTemaAlterado="trocarTema" />
        </div>
        <div class="colunm is-three-quarter conteudo">
            <PartNotifications />
            <router-view></router-view> <!--route-view indica para o roteador onde a visualização será renderizada -->
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue'
import PartNotifications from './components/PartNotifications.vue'

export default defineComponent({
    name: 'App',
    components: {
        BarraLateral,
        PartNotifications
    },
    data (){
        return {
            modoEscuroAtivo: false
        }// lista que é um array de tarefas
    },
    methods: {
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
