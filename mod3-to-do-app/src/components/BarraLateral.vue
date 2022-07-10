<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="" class="">
        </h1>
        <button class="button" @click="alterarTema">
            {{textoBotao}}
        </button>
        <nav class="panel mt-5">
            <ul>
                <li>
                    <router-link to="/" class="link">
                        <i class="fas fa-tasks"></i>
                        Tarefas
                    </router-link>
                </li>
                <li>
                    <router-link to="/projetos" class="link">
                        <i class="fas fa-project-diagram"></i>
                        Projetos
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script lang="ts"> //devido ao uso do typescript é preciso definir o lang ts para a tag script
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'BarraLateral',
        // a emissão de eventos faz um componente filho se comunicar com o pai, nesse caso o evento alterarTema será startado na barraLateral e executado em App o metodo "aoTemaAlterado"
        emits: ['aoTemaAlterado'],
        data () {
            return {
                modoEscuroAtivo: false
            }
        },
        computed: {
            textoBotao () {
                if (this.modoEscuroAtivo) {
                    return 'Desativar modo escuro'
                }
                return 'Ativar modo escuro'
            }
        },
        methods: {
            alterarTema () {
                this.modoEscuroAtivo = !this.modoEscuroAtivo;
                this.$emit('aoTemaAlterado', this.modoEscuroAtivo); //emite o evento aoTemaAlterado passando o valor de modoEscuroAtivo
            }
        }
    })
</script>

<style scoped>
    header {
        padding: 1rem;
        background: #0d3b66;
        width: 100%;
        text-align: center;
    }
    @media only screen and (max-width: 768px) {
        header {
            padding: 2.5rem;
            height: auto;
        }
    }
    .panel li {
        margin: 8px 0;
    }
    .link {
        color: #fff;
    }
    .link:hover {
        color: #FAF0CA;
    }
    .link.router-link-active {
        color: #FAF0CA;
    }
</style>