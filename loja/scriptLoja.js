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
              valuePesquisa: ''
            },
            methods: {
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
                    this.carrinho.itens = []                   
                },
                sair(){
                    signOut(auth).then(() => {
                        alert('Desconectado')
                      }).catch((error) => {
                        alert(error)
                    });
                },
                toPontosConhecimento(number){
                    return `P$ ${number.toFixed(2)}`
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


