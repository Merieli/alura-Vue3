// Vue é um framework progressivo e não vem com uma biblioteca de roteamento instalada por padrão. 
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import ViewTarefas from '../views/Tarefas.vue'
import ViewProjetos from '../views/ViewProjetos.vue'
import ViewFormulario from '../views/Projetos/Formulario.vue'
import ViewLista from '../views/Projetos/ViewLista.vue'

//quando for a rota raiz "/" irá exibir a o componente de tarefas
const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: ViewTarefas
    }, 
    {
        path: '/projetos',
        component: ViewProjetos,
        children: [ //children define que esta rota terá rotas filhas, sendo assim toda rota definida nesse array herda o path  inicial "/projetos"
            {
                path: '',
                name: 'Projetos',
                component: ViewLista
            },
            {
                path: 'novo',
                name: 'Novo Projeto',
                component: ViewFormulario
            },
            {
                path: ':id',
                name: 'Editar Projeto',
                component: ViewFormulario,
                props: true //props: true- tem como finalidade dizer ao roteador que o segmento ":id" pega o nome definido e injeja na aplicação como se fosse uma propriedade do componente
            },
        ]
    }
]; 

const roteador = createRouter({
    // createWebHashHistory - modo padrão de roteamento que usa a URL "#/" antes da rota para facilitar o comportamento em que a pagina toda nao é recarregada
    history: createWebHashHistory(),
    routes: rotas
});

export default roteador;