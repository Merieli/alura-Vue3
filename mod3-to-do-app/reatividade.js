const projeto = {
    id: 1,
    descricao: 'Alura Tracker 3.0'
}

//Por baixo dos panos ao usar o "ref()" do vue o JS está usando o proxy para ter uma variável reativa
//sobre proxy: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Proxy
const proxy = new Proxy(projeto, {
    get(objetoOriginal, chave, receptor){ //código qu estará reagindo as alterações do set
        console.log(`Alguem pediu a chave ${chave} do projeto`)
        
        return Reflect.get(objetoOriginal, chave, receptor)
        //sobre reflect: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Reflect
    },
    set(objetoOriginal, chave, valor){
        console.log(`Alguem alterou a chave ${chave} do projeto para o valor ${valor}`)
        objetoOriginal[chave] = valor
    }
})

proxy.descricao = 'Reatividade é mega bacana'

console.log(proxy.descricao)