<template>
    <section>
        <form @submit.prevent="salvar" > <!--@submit.prevent - ouve o evento de submit ja prevenindo o comportamento padrão de recarregar-->
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto"> <!-- No template não é necessário para variáveis observaveis usar o ".value" porque automaticamente ele entende e olha para o valor -->
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
import { defineComponent, ref } from "vue";
import { TypeNotification } from "../../interfaces/INotification";
import { useStore } from "../../store";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '../../store/tipo-acoes';

import { useRouter } from "vue-router";

//import { notificacaoMixin } from '../../mixins/notificar'

import useNotificador from '../../hooks/notificador' //quando é feiot export default dentro do hook não é necessario envovler o que esta sendo importado com "{ }"

// A Options API do Vue, permite construir um componente através da função "defineComponent" que é passado um objeto cheio de propriedades "name, props, mounted(), methods, ..."
// A composition API permite mitigar problemas de distanciamento de codigo do componente que pode estar ficando muito grande. como uma alternativa a Options API. É uma forma nova de escrever componentes e por enquanto a Options API continua existindo no Vue podendo ser usada qualquer uma delas, dependendo do que fizer mais sentido para o componente
    // Porque usar a composition API? Para escrever componentes agrupando o código de acordo com as preocupações lógicas, facilitando a leitura das dependências do componente, e como ele funciona.

// Lifecycle Hooks - ciclo de vida do componente

// para trabalhar com variaveis reativas, que serão modificadas e precisa ser observada de alguma fomra é usado o método "ref"


export default defineComponent({
    name: 'ViewFormulario',
    props: {
        id: {
            type: String
        }
    },
    setup (props) { //dentro do setup não existe o componente ainda, por isso não é possível usar o "this"
        // Remoção de mounted e data() e inserção na composition API no setup()

        // para ter acesso ao router é necessário utilizá-lo via Hook para dar acesso ao roteador do vue
        const router = useRouter()

        const store = useStore(); // permite o acesso a store dentro do componente
        const { notificar } = useNotificador();
        
        const nomeDoProjeto= ref(""); //nomeDoProjeto será uma referencia para string. Dessa forma a variavel é observável. Para ter acesso ao valor desse tipo de variavél é preciso usar a propriedade ".value"

        if(props.id){//se a propriedade existir executa o codigo abaixo
            const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)
            nomeDoProjeto.value = projeto?.nome || '' //a "?" define que a propriedade pode existir ou não, e não gera erro no TS
        }

        const salvar = () => {  
            if(props.id){ //se tiver o id fara o update do projeto
                store.dispatch(ALTERAR_PROJETO, {
                    id: props.id,
                    nome: nomeDoProjeto.value
                }).then(() => lidarComSucesso());
            } else { // se não tiver id é um projeto novo entao o projeto é cadastrado
                store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
                    .then(() => lidarComSucesso());
            }
        }

        const lidarComSucesso = () => {
            nomeDoProjeto.value = ''; //limpa o nome do projeto atual
            notificar(TypeNotification.SUCESSO, 'Novo Projeto foi salvo', 'Prontinho ;) seu projeto já está disponível.')
            router.push('/projetos') //redireciona para pagina de projetos
        }

        return { // o que for necessário utilizar no componente em si ou for necessário fora do setup() deve ser retornado no final do setup
            nomeDoProjeto,
            salvar
        }
    }
})
</script>

<style scoped>
</style>