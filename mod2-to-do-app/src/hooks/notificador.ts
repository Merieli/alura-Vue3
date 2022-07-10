// Hook - outra forma de compartilha código. Uma alternativa ao uso do mixin. Hooks devem ser configurado nos componente no setup()

import { TypeNotification } from "@/interfaces/INotification"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/tipo-mutacoes"

type Notificador = {// o tipo notificador é um objeto que tem a função de notificar que não retorna nada e faz apenas a notificação
    notificar: (tipo: TypeNotification, titulo: string, texto: string) => void
}

export default () : Notificador => {
    const notificar = (tipo: TypeNotification, titulo: string, texto: string) : void => {
        store.commit(NOTIFICAR, {
            titulo,
            texto,
            tipo
        })
    }
    return{
        notificar
    }
}