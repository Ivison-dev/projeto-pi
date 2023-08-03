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
            },
            
            methods: {
                // Funções de interação
                sair(){
                    signOut(auth).then(() => {
                        alert('Desconectado')
                      }).catch((error) => {
                        alert(error)
                    });
                },

                hrefCards(){
                    window.location.href = "../cards/loja.html"
                },

                // Funções secundárias
                topontos_conhecimento(number){
                    return `P$ ${number.toFixed(2)}`
                },
            }

        })
    }
    else{
        window.location.href = '../../index/index.html'
    }
})


