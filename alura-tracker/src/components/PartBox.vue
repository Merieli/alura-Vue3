<template>
    <div class="box has-text-weight-bold"> <!--Wrapper/encapsulador de código -->
        <slot></slot> <!--Com o slot o que estiver dentro do componente será renderizado dentro dessa div-->
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PartBox'
})
</script>

<style scoped>
.box{
    background: #faf0fa;
}
</style>