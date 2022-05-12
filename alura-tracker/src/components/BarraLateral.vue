<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="" class="">
        </h1>
    </header>
</template>

<script lang="ts"> //devido ao uso do typescript é preciso definir o lang ts para a tag script
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'BarraLateral'
    })
</script>

<style scoped>
    header {
        padding: 1rem;
        background: #0d3b66;
        width: 100%;
        height: 100vh;
    }
    @media only screen and (max-width: 768px) {
        header {
            padding: 2.5rem;
            height: auto;
        }
    }
</style>