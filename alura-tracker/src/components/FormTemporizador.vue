<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <FormCronometro :tempoEmSegundos="tempoEmSegundos" :disabled="cronometroRodando" />
        <button class="button" @click="iniciar">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>play</span>
        </button>
        <button class="button" @click="finalizar" :disabled="!cronometroRodando">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FormCronometro from './FormCronometro.vue'

export default defineComponent ({
    name: 'FormTemporizador',
    emits: ['aoTemporizadorFinalizado'], //lista de eventos que o componente é capaz de emitir
    components: {
        FormCronometro
    },
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        }
    },
    
    methods: {
        iniciar() {
            //começar a contagem
            this.cronometroRodando = true
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1
            }, 1000)
        },
        finalizar() {
            this.cronometroRodando = false
            clearInterval(this.cronometro)
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
            this.tempoEmSegundos = 0
        }
    }
})
</script>

<style>

</style>