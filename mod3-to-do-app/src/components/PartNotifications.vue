<template>
    <div class="notifications">
        <!-- :class="contexto[notificacao.tipo] - Para cada tipo é acessado o contexto que retorna a classe necessária-->
        <article class="message" 
            :class="contexto[notificacao.tipo]" 
            v-for="notification in notifications"
            :key="notification.id"
        >
            <div class="message-header">{{ notification.titulo }}</div>
            <div class="message-body">
                {{ notification.texto }}.
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '../store';
import { TypeNotification } from '../interfaces/INotification';

export default defineComponent ({
    name: 'PartNotifications',
    data () {
        return {
            //define o contexto da classe de acordo com o tipo de notificacao usada
            contexto: {
                [TypeNotification.SUCESSO]: 'is-sucess',
                [TypeNotification.ATENCAO]: 'is-warning',
                [TypeNotification.FALHA]: 'is-danger',
            }
        }
    },
    setup (){
        const store = useStore();
        return {
            notifications: computed(() => store.state.notifications)
        }
    }
})
</script>

<style scoped>
.notifications{
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 105;
}
</style>