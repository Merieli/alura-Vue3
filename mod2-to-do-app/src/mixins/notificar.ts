 // a ideia do mixin no vue é reaproveitar código idependente da porção do componente. 
 
 // Fragilidades do mixin que podem ser prejudiciais:
 // possível colisão de nomes - corremos o risco de usar nomes que vão colidir com as propriedades dos componentes, portanto deve ser utilizado com cuidado para que em um componente o nome de suas propriedade ou métodos sejam diferente do nome do método do mixin. 
 //Dependência implícita - pode não ficar muito claro para as pessoas desenvolvedoras de onde vem as coisas.

import { TypeNotification } from "@/interfaces/INotification";
import { store } from "@/store";
import { NOTIFICAR } from "@/store/tipo-mutacoes";

 
export const notificacaoMixin = { //objeto literal que corresponde com as propriedades passadas para o metodo defineComponent
    methods: {
        notificar (tipo: TypeNotification, titulo: string, texto: string): void{
            store.commit(NOTIFICAR, {
                titulo,
                texto,
                tipo
            })
        }
       
    }

}