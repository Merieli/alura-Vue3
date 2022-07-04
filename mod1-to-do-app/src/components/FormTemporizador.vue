<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <FormCronometro :tempoEmSegundos="tempoEmSegundos" :disabled="cronometroRodando" />
        <TempButton :typeButton="'play'" @click="iniciar" :disabled="cronometroRodando" />
        <TempButton :typeButton="'stop'" @click="finalizar" :disabled="!cronometroRodando" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FormCronometro from './FormCronometro.vue'
import TempButton from './TempButton.vue'

export default defineComponent ({
    name: 'FormTemporizador',
    emits: ['aoTemporizadorFinalizado'], //lista de eventos que o componente é capaz de emitir
    components: {
        FormCronometro,
        TempButton
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