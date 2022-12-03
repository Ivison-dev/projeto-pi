import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";

let produtos = [
    {'nomeProduto': 'Maça','imagem': 'images/maca.jpg','preco': 8.50},
    {'nomeProduto': 'Banana','imagem': 'images/banana.jpg','preco': 7.80},
    {'nomeProduto': 'Acerola','imagem':'images/acerola.jpg','preco': 5.60},
    {'nomeProduto': 'Laranga','imagem':'images/laranja.jpg','preco': 6.40},
    {'nomeProduto': 'Siriguela','imagem': 'images/sireguela.jpg','preco': 4.00},
]
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
              produtos: produtos,
              carrinho: {itens: [], valorCompra: 0}
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
                }
            }
        })
    }
    else{
        window.location.href = '../index/index.html'
    }
})


