import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import ViewTarefas from '../views/Tarefas.vue'
import ViewProjetos from '../views/Projetos.vue'

//quando for a rota raiz "/" irá exibir a o componente de tarefas
const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: ViewTarefas
    }, 
    {
        path: '/projetos',
        name: 'Projetos',
        component: ViewProjetos
    }
]; 

const roteador = createRouter({
    // createWebHashHistory - modo padrão de roteamento que usa a URL "#/" antes da rota para facilitar o comportamento em que a pagina toda nao é recarregada
    history: createWebHashHistory(),
    routes: rotas
});

export default roteador;