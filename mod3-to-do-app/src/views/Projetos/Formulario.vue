<template>
    <section>
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
import { TypeNotification } from "../../interfaces/INotification";
import { useStore } from "../../store";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '../../store/tipo-acoes';

//import { notificacaoMixin } from '../../mixins/notificar'

import useNotificador from '../../hooks/notificador' //quando é feiot export default dentro do hook não é necessario envovler o que esta sendo importado com "{ }"

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
    //mixins: [notificacaoMixin], //é necessário configurar o mixin para que seu metodo possa ser chamado no código
    methods: {
        salvar (){  
            if(this.id){ //se tiver o id fara o update do projeto
                this.store.dispatch(ALTERAR_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                }).then(() => this.lidarComSucesso());
            } else { // se não tiver id é um projeto novo entao o projeto é cadastrado
                this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
                    .then(() => this.lidarComSucesso());
            }
        },// Para alterar o estado, uma mutation deve ser implementada na store e chamada pelo componente.
        lidarComSucesso () {
            this.nomeDoProjeto = ''; //limpa o nome do projeto atual
            this.notificar(TypeNotification.SUCESSO, 'Novo Projeto foi salvo', 'Prontinho ;) seu projeto já está disponível.')
            this.$router.push('/projetos') //redireciona para pagina de projetos
        }
    },
    setup () {
        const store = useStore() // permite o acesso a store dentro do componente
        const { notificar } = useNotificador()
        return {
            store,
            notificar
        }
    }
})
</script>

<style scoped>
</style>