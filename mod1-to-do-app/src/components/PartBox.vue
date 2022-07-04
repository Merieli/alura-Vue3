<template>
    <!--Tambem é possivel usar um binding de estilos para configurar os estilos do componenteS -->
    <div class="box has-text-weight-bold" :style="estilos"> <!--Wrapper/encapsulador de código -->
        <slot></slot> <!--Com o slot o que estiver dentro do componente será renderizado dentro dessa div-->
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PartBox',
    data () {
        return {
            estilos: {
                backgroundColor: '#faf0fa'
                //para passar propriedades css de nome composto como background-color dentro de um objeto que define estilizações para o componente é preciso colocar o nome da propriedade entre aspas 'background-color' ou em camelCase backgroundColor
            }
        }
    }
})
</script>
