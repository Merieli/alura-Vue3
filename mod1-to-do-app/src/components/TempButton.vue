<template>
    <button class="button">
        <span class="icon">
            <i :class="classObject"></i>
        </span>
        <span>{{ typeButton }}</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TempButton',
    props: {
        typeButton: {
            type: String,
            default: 'play'
        }
    },
    computed: {
        classObject() {
            return {
                'fas fa-play': this.typeButton === 'play',
                'fas fa-stop': this.typeButton === 'stop'                
            }
        }
    }
})
</script>

<style>

</style>