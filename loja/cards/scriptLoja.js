import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";




const auth = getAuth()



onAuthStateChanged(auth, (user) =>{
    if (user){
        var usuario = new Vue({
            el: '#app',
            data: {
              usuario: {
                'nome': user.displayName,
                'email': user.email,
                'pontos_conhecimento': 300
                },
              cards: [],
              carrinho: {itens: [], valorCompra: 0},
              baseURL: 'https://FastApi.ivisondev.repl.co',
              valuePesquisa: '',
              mensagens: [],
              visibilidadePopover: '',
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
                    if (this.usuario.pontos_conhecimento < this.carrinho.valorCompra){
                        alert('Saldo insuficiente')
                        return
                    }
                    this.usuario.pontos_conhecimento -= this.carrinho.valorCompra
                    this.atualizar_usuario('pontos_conhecimento', this.usuario.pontos_conhecimento)
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

                alterarVisibilidadePopover(index){                    
                    var popover = document.getElementById(index)
                    if (popover.className === "popover"){
                        popover.className = "popover active"
                    } 
                    else{
                        popover.className = "popover"
                    }
                },

                hrefBeneficios(){
                    window.location.href = '../beneficios/beneficios.html'
                },

                // Funções secundárias
                topontos_conhecimento(number){
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
                },

                conectarUsuario(){
                    axios.get(this.baseURL + `/user/${user.email}`).then(
                        response => {
                            this.usuario = response.data
                        }
                    ).catch(error => {
                        alert('Erro: ' + error)
                    })
                },

                atualizar_usuario(atributo, valor){
                    axios.post(this.baseURL + `/user/update/${user.email}`, {
                        atributo,
                        valor
                    }).catch(error => {
                        alert("Erro ao tentar atualizar no banco")
                        alert('Erro: ' + error)
                    })
                },
            },

            computed: {
                allItens(){
                    return this.carrinho.itens.map(item =>({
                        ...item,
                        preco: this.topontos_conhecimento(item.preco)
                    }))
                },
                allcards(){
                    this.cards.map(card => ({
                        ...card,
                        preco: this.topontos_conhecimento(card.preco)
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
                this.getCards(),
                this.conectarUsuario()
             }
        })
    }
    else{
        window.location.href = '../../index/index.html'
    }
})


