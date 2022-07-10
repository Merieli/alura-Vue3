export enum TypeNotification {
    SUCESSO,
    FALHA,
    ATENCAO
}

export interface INotification {
    id: number
    titulo: string
    texto: string
    tipo: TypeNotification
}