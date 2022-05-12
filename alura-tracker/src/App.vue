<template>
    <main class="colunms is-gapless is-multiline">
        <div class="colunm is-one-quarter">
            <BarraLateral />
        </div>
        <div class="colunm is-three-quarter">
            <PartFormulario />
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue'
import PartFormulario from './components/PartFormulario.vue'

export default defineComponent({
    name: 'App',
    components: {
        BarraLateral,
        PartFormulario
    }
});
</script>

<style>
</style>
