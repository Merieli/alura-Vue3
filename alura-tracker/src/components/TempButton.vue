<template>
    <button class="button" @click="finalizar" :disabled="!cronometroRodando">
        <span class="icon">
            <i class="fas fa-{{ typeButton }}"></i>
        </span>
        <span>{{ typeButton }}</span>
    </button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TempButton',
    data() {
        return {
            
        }
    },
    props: {
        typeButton: {
            type: String,
            default: 'play'
        }
    }
})
</script>

<style>

</style>