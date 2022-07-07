<template>
    <section>
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
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "../../store";

export default defineComponent({
    name: 'ViewFormulario',
    props: {
        id: {
            type: String
        } //type define o tipo da propriedade
    },
    mounted () { // quando o componente for montado
        if(this.id) {
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
            this.nomeDoProjeto = projeto?.nome || '' //a "?" define que a propriedade pode existir ou não, e não gera erro no TS
        }
    },
    data() {
        return {
            nomeDoProjeto: ''
        }
    },
    methods: {
        salvar (){  
            if(this.id){
                this.store.commit('ALTERA_PROJETO', {
                    id: this.id,
                    nome: this.nomeDoProjeto
                })
            } else {
                this.store.commit('ADICIONA_PROJETO', this.nomeDoProjeto)
            }
            this.nomeDoProjeto = '';
            this.$router.push('/projetos')
        }// Para alterar o estado, uma mutation deve ser implementada na store e chamada pelo componente.
    },
    setup () {
        const store = useStore() // permite o acesso a store dentro do componente
        return {
            store
        }
    }
})
</script>

<style scoped>
</style>