import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";



// var buttonSair = document.getElementById('sair')
const auth = getAuth()

// buttonSair.addEventListener('click', ()=>{
//     alert('oi')
//     signOut(auth).then(() => {
//         alert('Desconectado')
//       }).catch((error) => {
//         alert(error)
//       });
// })

onAuthStateChanged(auth, (user) =>{
    if (user){
        var usuario = new Vue({
            el: '#app',
            data: {
              usuario: {
                'nome': user.displayName,
                'email': user.email,
                'pontosConhecimento': 300
                },
              cards: [],
              carrinho: {itens: [], valorCompra: 0},
              baseURL: 'https://FastApi.ivisondev.repl.co',
              valuePesquisa: '',
              mensagens: []
            },
            methods: {
                // Funções de interação
                addItem(nome, preco){
                    this.carrinho.itens.push({
                        nome,
                        preco
                    })
                    this.calcularPrecoCompra()
                },
                removeItem(index){
                    this.carrinho.itens.splice(index, 1);
                    this.calcularPrecoCompra()
                },

                calcularPrecoCompra(){
                    this.carrinho.valorCompra = 0
                    this.carrinho.itens.forEach(item => {
                        this.carrinho.valorCompra += item.preco
                    });
                },

                efetuarCompra(){
                    if (this.carrinho.valorCompra == 0){
                        alert('Insira um item no carrinho')
                        return
                    }
                    if (this.usuario.pontosConhecimento < this.carrinho.valorCompra){
                        alert('Saldo insuficiente')
                        return
                    }
                    this.usuario.pontosConhecimento -= this.carrinho.valorCompra
                    this.carrinho.valorCompra = 0
                    this.carrinho.itens = [],
                    this.addMensagem('sucesso', 'Compra realizada')                   
                },
                sair(){
                    signOut(auth).then(() => {
                        alert('Desconectado')
                      }).catch((error) => {
                        alert(error)
                    });
                },

                // Funções secundárias
                toPontosConhecimento(number){
                    return `P$ ${number.toFixed(2)}`
                },

                addMensagem(tipo, texto){
                    var tipos = {
                        'sucesso': ['alert-success', '#check-circle-fill'],
                        'informacao': ['alert-primary', '#info-fill'],
                        'erro': ['alert-danger', '#exclamation-triangle-fill'],
                        'perigo': ['alert-warning', '#exclamation-triangle-fill'],
                    }
                    this.mensagens.push({
                        'tipo': tipos[tipo][0],
                        'icone': tipos[tipo][1],
                        'status': 'show',
                        'texto': texto})
                },

                // Request
                getCards(){
                    axios.get(this.baseURL).then((response) =>{
                        this.cards = response.data                        
                    }).catch(error => {
                        alert('error: '+ error)
                    })
                },

                pesquisarCards(){
                    if (this.valuePesquisa.trim() == ''){
                        this.getCards()
                        return
                    }
                    axios.get(this.baseURL + `/card/pesquisa/${this.valuePesquisa.trim()}`).then(response => {
                        this.cards = response.data
                    }).catch(error => {
                        alert("Erro: " + error)
                    })
                }
            },

            computed: {
                allItens(){
                    return this.carrinho.itens.map(item =>({
                        ...item,
                        preco: this.toPontosConhecimento(item.preco)
                    }))
                },
                allcards(){
                    this.cards.map(card => ({
                        ...card,
                        preco: this.toPontosConhecimento(card.preco)
                    }))
                }
            },

            watch: {
                valuePesquisa: {
                    handler: 'pesquisarCards'
                },
                mensagens: {
                    handler(){
                        setTimeout(function(){
                            this.mensagens = []                          
                            
                        }, 4000)
                    }
                }
            },

            mounted(){
                this.getCards()
             }
        })
    }
    else{
        window.location.href = '../index/index.html'
    }
})


