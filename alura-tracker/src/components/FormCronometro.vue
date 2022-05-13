<template>
    <section>
        <strong>
            {{ tempoDecorrido }}
        </strong>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent ({
        name: 'FormCronometro',
        props: {
            tempoEmSegundos: {
                type: Number,
                default: 0 //valor padrão da propriedade definido como 0
            }
        },
        computed: {
            tempoDecorrido () : string {
                return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11,8)
            }
        },
    })
</script>

<style>

</style>