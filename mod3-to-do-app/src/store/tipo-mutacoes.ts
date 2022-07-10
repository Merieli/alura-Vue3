// para evitar erros na escrita do nome das mutacoes no formato de string é criado constantes que armazenam o nome dessas mutations
// Mais sobre: https://vuex.vuejs.org/guide/mutations.html#using-constants-for-mutation-types
// Para usar essas constantes onde as mutacoes forem criadas é preciso importar as constantes e ao utilizá-la na store escrever o nome entre "[ ]", enquanto que onde a mutation for utilizada basta escrever o nome da constante normalmente e importá-las
export const ADICIONA_PROJETO = 'ADICIONA_PROJETO'
export const ALTERA_PROJETO = 'ALTERA_PROJETO'
export const EXCLUIR_PROJETO = 'EXCLUIR_PROJETO'

export const NOTIFICAR = 'NOTIFICAR'